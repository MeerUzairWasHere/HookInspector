import { WebhookInspector } from "@/components/WebhookInspector";

export default async function Page({ params }: { params: { id: string } }) {
  const id = await params?.id; // Ensure params and id are accessible
  if (!id) {
    throw new Error("ID is missing from the route parameters");
  }
  return <WebhookInspector uuid={id} />;
}
