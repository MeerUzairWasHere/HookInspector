import { WebhookInspector } from "@/components/WebhookInspector";

export default function Page({ params }: any) {
  const id = params?.id; // No need to await
  if (!id) {
    throw new Error("ID is missing from the route parameters");
  }
  return <WebhookInspector uuid={id} />;
}
