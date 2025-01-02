"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoredRequests = exports.handleWebhookRequest = exports.generateWebhookUrl = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../index");
// Generate a unique URL
const generateWebhookUrl = async (req, res) => {
    const uniqueId = (0, uuid_1.v4)();
    const url = `https://hookinspector.onrender.com/webhook/${uniqueId}`;
    // Create a new webhook entry in the database
    await index_1.prisma.webhook.create({
        data: {
            id: uniqueId,
            url: url,
        },
    });
    res.json({ url });
};
exports.generateWebhookUrl = generateWebhookUrl;
// Handle incoming requests to the unique URL
const handleWebhookRequest = async (req, res) => {
    const { id } = req.params;
    // Check if the URL exists in the database
    const webhook = await index_1.prisma.webhook.findUnique({
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
    await index_1.prisma.incomingRequest.create({
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
exports.handleWebhookRequest = handleWebhookRequest;
// Get stored requests for a specific URL
const getStoredRequests = async (req, res) => {
    const { id } = req.params;
    // Check if the URL exists in the database
    const webhook = await index_1.prisma.webhook.findUnique({
        where: { id },
        include: { requests: true }, // Include associated requests
    });
    if (!webhook) {
        return res.status(404).json({ error: "Webhook URL not found" });
    }
    res.json(webhook.requests);
};
exports.getStoredRequests = getStoredRequests;
