import clsx from "clsx";
import Link from "next/link";

export type WebhookRequest = {
  id: number;
  webhookId: string;
  method: string; // or more specific: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | etc.
  headers: {
    host?: string;
    accept?: string;
    cookie?: string;
    connection?: string;
    "user-agent"?: string;
    "content-type"?: string;
    "cache-control"?: string;
    "postman-token"?: string;
    "content-length"?: string;
    "accept-encoding"?: string;
    [key: string]: string | undefined; // for any additional headers
  };
  body: Record<string, any> | null; // or more specific if you know the body structure
  timestamp: string; // or Date if you parse it
  status: number;
  size: number;
  duration: number;
  createdAt: string;
};

const RequestList = ({ request }: { request: WebhookRequest }) => {
  return (
    <tr className="">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <span className="text-xs">
          {new Date(request.timestamp).toLocaleDateString()}{" "}
          {new Date(request.timestamp).toLocaleTimeString()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
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
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={clsx(
            "text-sm  font-medium",
            request.status === 200 ? "text-green-600" : "text-red-600"
          )}
        >
          {request.status || 200} {request.status === 200 ? "OK" : "Error"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {request.size} KB
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {request.duration} ms
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/${request.webhookId}/detail/${request.id}`}
          className="text-[#2563eb] hover:text-blue-700 focus:outline-none"
          data-request-id="req1"
        >
          View Details
        </Link>
      </td>
    </tr>
  );
};
export default RequestList;
