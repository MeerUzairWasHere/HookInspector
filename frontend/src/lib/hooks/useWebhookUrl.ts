import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { WEBHOOK_URL } from "../constants";

export function useWebhookUrl(uuid: string) {
  const { toast } = useToast();
  const webhookUrl = WEBHOOK_URL + "/" + uuid;

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Copied to clipboard",
      description: "Webhook URL has been copied to your clipboard.",
    });
  }, [webhookUrl, toast]);

  return { webhookUrl, copyUrl };
}
