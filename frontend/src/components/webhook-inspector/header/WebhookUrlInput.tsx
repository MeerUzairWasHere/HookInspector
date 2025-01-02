"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useWebhookUrl } from "@/hooks/use-webhook-url";

export function WebhookUrlInput() {
  const { webhookUrl, copyUrl } = useWebhookUrl();

  return (
    <div className="flex gap-2">
      <Input value={webhookUrl || ""} readOnly className="font-mono" />
      <Button onClick={copyUrl}>
        <Copy className="w-4 h-4 mr-2" />
        Copy URL
      </Button>
    </div>
  );
}
