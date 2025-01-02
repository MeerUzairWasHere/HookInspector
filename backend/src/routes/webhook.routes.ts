import { Router, Request, Response, NextFunction } from "express";
import {
  generateWebhookUrl,
  handleWebhookRequest,
  getStoredRequests,
} from "../controllers/webhook.controller";

const router = Router();

// Route to generate a unique webhook URL
router
  .route("/generate")
  .get((req: Request, res: Response, next: NextFunction) => {
    generateWebhookUrl(req, res);
  });

// Handle incoming webhook requests at unique URLs
router.route("/:id").all((req: Request, res: Response, next: NextFunction) => {
  handleWebhookRequest(req, res);
});

// Get stored requests for a specific URL
router
  .route("/:id/requests")
  .get((req: Request, res: Response, next: NextFunction) => {
    getStoredRequests(req, res);
  });

export default router;
