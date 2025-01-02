import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface Request {
  id: number; // Matches Prisma schema for autoincrement ID
  webhookId: string;
  method: string;
  headers: Record<string, string>; // Assuming headers are key-value pairs
  body: Record<string, unknown>; // Body stored as JSON
  timestamp: Date;
}

interface RequestListProps {
  requests: Request[];
  selectedRequestId: number | null;
  onSelectRequest: (id: number) => void;
}

export function RequestList({
  requests,
  selectedRequestId,
  onSelectRequest,
}: RequestListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-2rem)]">
      {requests.map((request) => (
        <Card
          key={request.id}
          className={cn(
            "p-4 mb-2 cursor-pointer hover:bg-accent transition-colors",
            selectedRequestId === request.id && "border-primary"
          )}
          onClick={() => onSelectRequest(request.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant={
                request.method === "GET"
                  ? "default"
                  : request.method === "POST"
                  ? "destructive"
                  : "secondary"
              }
            >
              {request.method}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(request.timestamp), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-sm truncate">{request.webhookId}</p>
        </Card>
      ))}
    </ScrollArea>
  );
}
