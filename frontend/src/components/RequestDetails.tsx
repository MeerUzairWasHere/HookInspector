import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import type { Request } from "./RequestList";

interface RequestDetailsProps {
  request: Request | null;
}

export function RequestDetails({ request }: RequestDetailsProps) {
  if (!request) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a request to view details
      </div>
    );
  }

  return (
    <Tabs defaultValue="headers" className="h-full">
      <TabsList>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <TabsContent value="headers">
          <Card className="p-4">
            {Object.entries(request.headers).map(([key, value]) => (
              <div key={key} className="mb-2">
                <span className="font-medium">{key}:</span>{" "}
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </Card>
        </TabsContent>
        <TabsContent value="body">
          <Card className="p-4">
            <pre className="whitespace-pre-wrap break-words">
              {typeof request.body === "string"
                ? request.body
                : JSON.stringify(request.body, null, 2)}
            </pre>
          </Card>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
