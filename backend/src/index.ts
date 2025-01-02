import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

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

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

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

// Schedule health check
cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get(
      `https://hookinspector.onrender.com/health`
    );
    console.log(`Health check successful: ${response.data.msg}`);
  } catch (error) {
    if (error instanceof Error)
      console.error(`Health check failed: ${error.message}`);
  }
});
