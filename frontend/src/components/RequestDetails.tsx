import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Button } from "./ui/button";
import Link from "next/link";
import { WebhookRequest } from "./RequestList";
import clsx from "clsx";
import { GlobalBackButton } from "./GlobalBackButton";

const RequestDetails = async ({
  webhookId,
  id,
}: {
  webhookId: string;
  id: string;
}) => {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/webhook/${webhookId}`;

  let request: WebhookRequest | null = null;
  let error = false;

  try {
    const response = await axios.get(`${webhookUrl}/requests/${id}`);
    request = response.data;
  } catch (err) {
    error = true;
    console.error("Error fetching requests:", err);
  }

  if (error) {
    return (
      <div className="flex items-center flex-col justify-center h-screen text-red-500">
        <div className="mb-5 ">Error fetching requests</div>
        <Button asChild variant="destructive">
          <Link href="/">Go back</Link>
        </Button>
      </div>
    );
  }

  return (
    <section
      id="requestDetailView"
      className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8"
    >
      <GlobalBackButton />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-4">
            Request Detail View
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Examine the details of your HTTP requests with our powerful
            inspection tools.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* <!-- Request Summary Bar --> */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={clsx(
                  "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                  request.method === "GET"
                    ? "bg-green-100 text-green-800"
                    : request.method === "POST"
                    ? "bg-yellow-100 text-yellow-800"
                    : request.method === "PUT"
                    ? "bg-blue-100 text-blue-800"
                    : request.method === "DELETE"
                    ? "bg-red-100 text-red-800"
                    : request.method === "PATCH"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {request.method}
              </span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {process.env.NEXT_PUBLIC_BASE_URL}/webhook/{webhookId}
              </span>
              <span
                className={
                  (clsx("text-sm font-mono"),
                  request.status === 200 ? "text-green-600" : "text-red-600")
                }
              >
                {request.status === 200
                  ? "200 OK"
                  : request.status === 201
                  ? "201 Created"
                  : request.status === 404
                  ? "404 Not Found"
                  : request.status === 500
                  ? "500 Internal Server Error"
                  : "Unknown"}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(request.timestamp).toLocaleDateString()}{" "}
                {new Date(request.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-xs text-gray-500">{request.size} KB</span>
              <span className="text-xs text-gray-500">
                {request.duration} ms
              </span>
            </div>
          </div>
          <Tabs defaultValue="headers" className="w-full">
            {/* Tab List */}
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="headers">
              <div className="overflow-y-auto max-h-96 mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Header
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(request.headers || {}).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {key}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="body">
              <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96 mt-4">
                <pre className="text-sm text-gray-800 font-mono whitespace-pre">
                  <code>{JSON.stringify(request.body, null, 2)}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="raw">
              <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96 mt-4">
                <pre className="text-sm text-gray-800 font-mono whitespace-pre">
                  <code>
                    {JSON.stringify(
                      {
                        request,
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
export default RequestDetails;
