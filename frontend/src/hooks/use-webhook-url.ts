"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function useWebhookUrl() {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);

  // Fetch webhook URL asynchronously
  useEffect(() => {
    const fetchWebhookUrl = async () => {
      try {
        const res = await axios.get(
          "https://hookinspector.onrender.com/webhook/generate"
        );
        const url = res.data.url;
        setWebhookUrl(url);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch webhook URL.",
        });
      }
    };

    fetchWebhookUrl();
  }, [toast]);

  // Copy URL to clipboard
  const copyUrl = () => {
    if (webhookUrl) {
      navigator.clipboard.writeText(webhookUrl);
      toast({
        title: "Copied to clipboard",
        description: "Webhook URL has been copied to your clipboard.",
      });
    } else {
      toast({
        title: "Error",
        description: "No URL available to copy.",
      });
    }
  };

  return { webhookUrl, copyUrl };
}
