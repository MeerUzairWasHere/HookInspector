"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link, Webhook } from "lucide-react";
import { Request, RequestList } from "./RequestList";
import { useWebhookUrl } from "@/lib/hooks/useWebhookUrl";
import axios from "axios";
import { RequestDetails } from "./RequestDetails";

export function WebhookInspector({ uuid }: { uuid: string }) {
  const { webhookUrl, copyUrl } = useWebhookUrl(uuid);
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(`${webhookUrl}/requests`);
        setRequests(response.data);
        setSelectedRequestId(response.data[0]?.id ?? null);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    getRequests();
  }, [webhookUrl]);

  const selectedRequest = requests.find((r) => r.id === selectedRequestId);
  return (
    <div className="h-screen flex flex-col p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Webhook className="text-black w-8 h-8" />

          <a href="/">Hook Inspector</a>
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input value={webhookUrl} readOnly className="font-mono flex-1" />
          <Button onClick={copyUrl} className="sm:w-auto">
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        <div className="md:w-1/3 w-full h-full md:h-auto border-r border-gray-300 bg-white overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-4">Requests</h2>
          <RequestList
            requests={requests}
            selectedRequestId={selectedRequestId}
            onSelectRequest={(id) => setSelectedRequestId(id)}
          />
        </div>

        <div className="md:w-2/3 w-full h-full md:h-auto bg-white overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          {selectedRequest ? (
            <RequestDetails request={selectedRequest} />
          ) : (
            <p className="text-muted-foreground">
              Waiting for requests to be sent...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
