import { Button } from "@/components/ui/button";
import axios from "axios";
import NavLink from "next/link";
import RequestList from "./RequestList";
import Empty from "./Empty";
import CopyUrl from "./CopyUrl";
import { GlobalBackButton } from "./GlobalBackButton";

export async function WebhookInspector({ uuid }: { uuid: string }) {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/webhook/${uuid}`;

  let requests = [];
  let error = false;

  try {
    const response = await axios.get(`${webhookUrl}/requests`);
    requests = response.data;
  } catch (err) {
    error = true;
    console.error("Error fetching requests:", err);
  }

  if (error) {
    return (
      <div className="flex items-center flex-col justify-center h-screen text-red-500">
        <div className="mb-5 ">Error fetching requests</div>
        <Button asChild variant="destructive">
          <NavLink href="/">Go back</NavLink>
        </Button>
      </div>
    );
  }
  return (
    <section
      id="requestInspectionPanel"
      className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8"
    >
      <GlobalBackButton />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-4">
            Request Inspection Panel
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Monitor incoming HTTP requests in real-time. Filter, search, and
            analyze your webhook traffic.
          </p>
        </div>

        {/* <!-- Filter Controls --> */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                All Requests
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                GET
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                POST
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                PUT
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                DELETE
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-[#2563eb] focus:border-[#2563eb] text-sm">
                  <option>Status: All</option>
                  <option>Status: 2xx</option>
                  <option>Status: 3xx</option>
                  <option>Status: 4xx</option>
                  <option>Status: 5xx</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-[#2563eb] focus:border-[#2563eb] text-sm">
                  <option>Time: All</option>
                  <option>Last 15 minutes</option>
                  <option>Last hour</option>
                  <option>Last 6 hours</option>
                  <option>Last 24 hours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-[#2563eb] focus:border-[#2563eb] text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <CopyUrl uuid={uuid} />

        {/* <!-- Real-time Feed --> */}
        <div className="bg-white mt-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-[#1e293b]">
              Incoming Requests
            </h3>
            <div className="flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {requests.length === 0 ? (
              <Empty />
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Method
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-gray-200"
                    id="request-list"
                  >
                    {requests.map((request, index) => (
                      <RequestList request={request} key={request.id} />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
