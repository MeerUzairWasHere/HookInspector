"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
// Route to generate a unique webhook URL
router
    .route("/generate")
    .get((req, res, next) => {
    (0, webhook_controller_1.generateWebhookUrl)(req, res);
});
// Handle incoming webhook requests at unique URLs
router.route("/:id").all((req, res, next) => {
    (0, webhook_controller_1.handleWebhookRequest)(req, res);
});
// Get stored requests for a specific URL
router
    .route("/:id/requests")
    .get((req, res, next) => {
    (0, webhook_controller_1.getStoredRequests)(req, res);
});
exports.default = router;
