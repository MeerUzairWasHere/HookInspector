"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

const CopyUrl = ({ uuid }: { uuid: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/webhook/${uuid}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-scroll shadow-lg border border-gray-200 ">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#1e293b] mb-4">
          Your Inspection URL
        </h3>

        <div className="relative mb-6">
          <div className="flex">
            <div className="flex-grow">
              <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg p-3 block w-full focus:outline-none focus:ring-[#2563eb] focus:border-[#2563eb] overflow-x-auto whitespace-nowrap">
                {webhookUrl}
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className={`bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors duration-200 flex items-center justify-center ${
                isCopied ? "bg-green-100 hover:bg-green-100" : ""
              }`}
              aria-label="Copy URL to clipboard"
              disabled={isCopied}
            >
              {isCopied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Success notification that appears at the top of the component */}
          {isCopied && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-2 px-4 rounded-md shadow-lg animate-fade-in-out">
              URL copied to clipboard!
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500">
          Share this URL with services that need to send you webhook data.
        </p>
      </div>
    </div>
  );
};

export default CopyUrl;
