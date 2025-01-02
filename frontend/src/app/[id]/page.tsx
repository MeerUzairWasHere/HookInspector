import { WebhookInspector } from "@/components/WebhookInspector";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await params before accessing id
  if (!id) {
    throw new Error("ID is missing from the route parameters");
  }
  return <WebhookInspector uuid={id} />;
}
