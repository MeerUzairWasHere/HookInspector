import Link from "next/link";

const Empty = () => {
  return (
    <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No requests yet
      </h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        Send a request to your webhook URL to see it appear here. All incoming
        requests will be displayed in real-time.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-[#2563eb] hover:bg-blue-700 text-white"
        >
          Go to URL Generator
        </Link>
      </div>
    </div>
  );
};
export default Empty;
