import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export interface Request {
  id: string;
  method: string;
  url: string;
  timestamp: Date;
  headers: Record<string, string>;
  body: string;
}

interface RequestListProps {
  requests: Request[];
  selectedRequestId: string | null;
  onSelectRequest: (id: string) => void;
}

export function RequestList({ requests, selectedRequestId, onSelectRequest }: RequestListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-2rem)]">
      {requests.map((request) => (
        <Card
          key={request.id}
          className={cn(
            'p-4 mb-2 cursor-pointer hover:bg-accent transition-colors',
            selectedRequestId === request.id && 'border-primary'
          )}
          onClick={() => onSelectRequest(request.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant={
                request.method === 'GET'
                  ? 'default'
                  : request.method === 'POST'
                  ? 'destructive'
                  : 'secondary'
              }
            >
              {request.method}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(request.timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm truncate">{request.url}</p>
        </Card>
      ))}
    </ScrollArea>
  );
}