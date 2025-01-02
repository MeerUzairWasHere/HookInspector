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
  const { id } = req.params;

  // Check if the URL exists in the database
  const webhook = await prisma.webhook.findUnique({
    where: { id },
  });

  if (!webhook) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }

  // Capture the request data
  const payload = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    timestamp: new Date(),
  };

  // Store the incoming request data in the database
  await prisma.incomingRequest.create({
    data: {
      webhookId: webhook.id,
      method: req.method,
      headers: req.headers,
      body: req.body,
      timestamp: new Date(),
    },
  });

  res.status(200).json({ message: "Request captured", payload });
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
    include: { requests: true }, // Include associated requests
  });

  if (!webhook) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }

  res.json(webhook.requests);
};
