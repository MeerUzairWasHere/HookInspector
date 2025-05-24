import RequestDetails from "@/components/RequestDetails";

const RequestDetailPage = async ({
  params,
}: {
  params: Promise<{ webhookId: string; id: string }>;
}) => {
  const { webhookId, id } = await params;

  if (!webhookId || !id) {
    throw new Error("ID is missing from the route parameters");
  }
  return <RequestDetails webhookId={webhookId} id={id} />;
};
export default RequestDetailPage;
