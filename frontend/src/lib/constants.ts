export const MOCK_REQUESTS = [
  {
    id: "1",
    method: "POST",
    url: "https://webhook.example.com/endpoint",
    timestamp: new Date(),
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({ message: "Hello World" }, null, 2),
  },
  {
    id: "2",
    method: "GET",
    url: "https://webhook.example.com/status",
    timestamp: new Date(Date.now() - 5000),
    headers: {
      Accept: "*/*",
      "User-Agent": "curl/7.64.1",
    },
    body: "",
  },
];

export const WEBHOOK_URL = "https://hookinspector.onrender.com/webhook";
