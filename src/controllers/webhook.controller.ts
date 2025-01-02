import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// In-memory data store
const webhookStore: Record<string, any[]> = {};

// Generate a unique URL
export const generateWebhookUrl = (req: Request, res: Response) => {
  const uniqueId = uuidv4();
  // Initialize an empty array for storing requests
  webhookStore[uniqueId] = [];
  res.json({ url: `/webhook/${uniqueId}` });
};

// Handle incoming requests to the unique URL
export const handleWebhookRequest = (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if the URL exists
  if (!webhookStore[id]) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }

  // Capture the request data
  const payload = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    timestamp: new Date(),
  };

  // Store the request data
  webhookStore[id].push(payload);

  res.status(200).json({ message: "Request captured and verified", payload });
};

// Get stored requests for a specific URL
export const getStoredRequests = (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if the URL exists
  if (!webhookStore[id]) {
    return res.status(404).json({ error: "Webhook URL not found" });
  }
  res.json(webhookStore[id]);
};
