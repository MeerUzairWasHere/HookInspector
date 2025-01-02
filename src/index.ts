import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
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

// Routes
app.use("/webhook", webhookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
