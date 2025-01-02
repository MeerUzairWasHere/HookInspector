import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimiter from "express-rate-limit";

import webhookRoutes from "./routes/webhook.routes";

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
