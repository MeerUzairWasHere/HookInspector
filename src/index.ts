import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimiter from "express-rate-limit";

import webhookRoutes from "./routes/webhook.routes";

const app = express();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();
// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/webhook", webhookRoutes);

// Start the server
const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
