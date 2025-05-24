import { WebhookInspector } from "@/components/WebhookInspector";

export default async function Page({
  params,
}: {
  params: Promise<{ webhookId: string }>;
}) {
  const { webhookId } = await params; // Await params before accessing id
  if (!webhookId) {
    throw new Error("ID is missing from the route parameters");
  }
  return <WebhookInspector uuid={webhookId} />;
}
