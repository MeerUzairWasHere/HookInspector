"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link } from "lucide-react";
import { Request, RequestList } from "./RequestList";
import { RequestDetails } from "./RequestDetails";
import { useWebhookUrl } from "@/lib/hooks/useWebhookUrl";
import axios from "axios";

export function WebhookInspector({ uuid }: { uuid: string }) {
  const { webhookUrl, copyUrl } = useWebhookUrl(uuid);
  const [requests, setRequests] = useState<Request[] | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  useEffect(() => {
    const getRequests = async () => {
      const response = await axios.get(webhookUrl + "/requests");
      setRequests(response.data);
    };
    getRequests();
  }, [uuid]);
  console.log(requests);
  
  if (!requests) {
    return null;
  }
  const selectedRequest = requests.find((r) => r.id === selectedRequestId);

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Link className="w-8 h-8" />
          Hook Inspector
        </h1>
        <div className="flex gap-2">
          <Input value={webhookUrl} readOnly className="font-mono" />
          <Button onClick={copyUrl}>
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Requests</h2>
          <RequestList
            requests={requests || []}
            selectedRequestId={selectedRequestId}
            onSelectRequest={setSelectedRequestId}
          />
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          {/* <RequestDetails request={selectedRequest} /> */}
        </div>
      </div>
    </div>
  );
}
