import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../index";
import { IncomingRequest, Webhook } from "@prisma/client";

// Generate a unique URL
export const generateWebhookUrl = async (req: Request, res: Response) => {
  const uniqueId = uuidv4();
  const url = `https://hookinspector.onrender.com/webhook/${uniqueId}`;

  // Create a new webhook entry in the database
  await prisma.webhook.create({
    data: {
      id: uniqueId,
      url: url,
    },
  });

  res.json({ url });
};

// Handle incoming requests to the unique URL
export const handleWebhookRequest = async (
  req: Request<any, {}, IncomingRequest>,
  res: Response
) => {
  const startTime = process.hrtime(); // Capture start time immediately
  const { id } = req.params;

  try {
    // Check if the URL exists in the database
    const webhook = await prisma.webhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      return res.status(404).json({ error: "Webhook URL not found" });
    }

    // Calculate request size (headers + body)
    const headersSize = JSON.stringify(req.headers).length;
    const bodySize = req.body ? JSON.stringify(req.body).length : 0;
    const totalSize = headersSize + bodySize;

    // Calculate duration in milliseconds
    const durationInNs = process.hrtime(startTime)[1];
    const durationInMs = Math.round(durationInNs / 1_000_000); // Convert nanoseconds to milliseconds

    // Store the incoming request data in the database
    await prisma.incomingRequest.create({
      data: {
        webhookId: webhook.id,
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date(),
        status: res.statusCode || 200, // Use response status code
        size: totalSize,
        duration: durationInMs,
      },
    });

    res.status(200).json({ message: "Request captured" });
  } catch (error) {
    // Calculate duration even if there's an error
    const durationInNs = process.hrtime(startTime)[1];
    const durationInMs = Math.round(durationInNs / 1_000_000);

    // Log failed request
    await prisma.incomingRequest.create({
      data: {
        webhookId: id, // Might not exist, but we still want to record
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date(),
        status: 500,
        size: req.headers["content-length"]
          ? parseInt(req.headers["content-length"])
          : 0,
        duration: durationInMs,
      },
    });

    res.status(500).json({ error: "Internal server error" });
  }
};

// Get stored requests for a specific URL
export const getStoredRequests = async (
  req: Request<any, {}, Webhook>,
  res: Response
) => {
  const { id } = req.params;

  // Check if the URL exists in the database
  const webhook = await prisma.webhook.findUnique({
    where: { id },
    include: {
      requests: {
        orderBy: { timestamp: "desc" },
      },
    }, // Include associated requests
  });

  if (!webhook) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }

  res.json(webhook.requests);
};

export const getSigleStoredRequest = async (
  req: Request<any, {}, Webhook>,
  res: Response
) => {
  const { webhookId, id } = req.params;

  // Check if the URL exists in the database
  const webhook = await prisma.incomingRequest.findUnique({
    where: { webhookId, id: parseInt(id) },
  });

  if (!webhook) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }

  res.json(webhook);
};
