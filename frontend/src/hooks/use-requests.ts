import { useState, useEffect } from "react";
import type { Request } from "@/types/webhook";
import axios from "axios";
import { useWebhookUrl } from "./use-webhook-url";
import { toast } from "./use-toast";

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]); // Initialize as an empty array
  const { webhookUrl } = useWebhookUrl();

  useEffect(() => {
    if (!webhookUrl) return; // Prevent fetch if webhookUrl is not available

    const fetchUrlRequests = async () => {
      try {
        const res = await axios.get(`${webhookUrl}/requests`);
        setRequests(res.data.requests);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: "Failed to fetch webhook requests.",
          });
        }
      }
    };

    fetchUrlRequests();
  }, [webhookUrl]); // Add webhookUrl to dependency array

  return { requests };
}
