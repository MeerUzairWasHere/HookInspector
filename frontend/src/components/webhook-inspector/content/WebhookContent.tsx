"use client";

import { useState } from "react";
import { useRequests } from "@/hooks/use-requests";
import { RequestList } from "@/components/RequestList";
import { RequestDetails } from "@/components/RequestDetails";

export function WebhookContent() {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const { requests } = useRequests();
  console.log(requests);
  // const selectedRequest = requests.find((r) => r.id === selectedRequestId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Requests</h2>
        {/* <RequestList
          requests={requests}
          selectedRequestId={selectedRequestId}
          onSelectRequest={setSelectedRequestId}
        /> */}
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Details</h2>
        {/* <RequestDetails request={selectedRequest} /> */}
      </div>
    </div>
  );
}
