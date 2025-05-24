"use client";
import { useState } from "react";
import {
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Webhook,
  Loader,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-indigo-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTryNow = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/webhook/generate"
      );
      const id = response.data.url.split("/").pop(); // Extract the ID from the generated URL
      router.push(`/${id}`);
    } catch (error) {
      console.error("Failed to generate webhook URL", error);
      alert("Error generating webhook URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Webhook className="text-white w-8 h-8" />
              <span className="text-white text-xl font-bold">
                Hook Inspector
              </span>
            </div>
            <div className="flex space-x-4 flex-row">
              <a
                href="https://github.com/MeerUzairWasHere/HookInspector"
                target="_blank"
                className="text-indigo-100 hover:text-white transition"
              >
                <Button>
                  <Github className="w-6 h-6" /> Give a Star
                </Button>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-6xl">
              Debug HTTP Requests with Ease
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
              Inspect HTTP requests in real-time, debug webhooks, and analyze
              HTTP traffic effortlessly with a free alternative.
            </p>
            <div className="mt-10">
              <button
                onClick={handleTryNow}
                disabled={loading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Try Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need for HTTP debugging
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <Feature
              icon={Globe}
              title="Real-time Monitoring"
              description="Watch HTTP requests as they arrive in real-time. No refreshing needed."
            />
            <Feature
              icon={Shield}
              title="Secure by Default"
              description="All traffic is encrypted and automatically expires after 24 hours."
            />
            <Feature
              icon={Zap}
              title="Lightning Fast"
              description="Built for performance with instant updates and minimal latency."
            />
          </div>
        </div>
      </section>

      {/* Try Now Section */}
      <section id="try-now" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">
                  Revisit Your Webhook URL
                </h3>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  onClick={() => {
                    const inputElement = document.getElementById(
                      "webhook-input"
                    ) as HTMLInputElement | null;
                    const inputValue = inputElement?.value;

                    if (
                      (inputValue &&
                        /^https:\/\/hookinspector\.onrender\.com\/webhook\/[a-f0-9\-]{36}$/.test(
                          inputValue
                        )) ||
                      /^http:\/\/localhost:3000\/webhook\/[a-f0-9\-]{36}$/.test(
                        inputValue
                      )
                    ) {
                      const id = inputValue.split("/").pop(); // Extract the ID
                      router.push(`/${id}`);
                    } else {
                      toast({
                        title: "Error",
                        description: "Please enter a valid webhook URL.",
                      });
                    }
                  }}
                >
                  Inspect
                </button>
              </div>
              <div className="mt-4 bg-gray-800 rounded-md p-4">
                <input
                  id="webhook-input"
                  type="text"
                  placeholder="https://hookinspector.onrender.com/webhook/your-unique-id"
                  className="w-full bg-gray-700 text-white p-2 rounded-md"
                  pattern="https://hookinspector\.onrender\.com/webhook/[a-f0-9\-]{36}"
                  title="Please enter a valid URL in the format https://hookinspector.onrender.com/webhook/your-unique-id"
                />
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Already have a generated URL? Enter it here to revisit and
                inspect your HTTP calls or webhooks. Simply paste your webhook
                URL to return to the inspection page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center justify-center space-x-2 w-full">
              <span className="text-gray-400 text-sm text-center">
                Made out of necessity, because I needed it, and it was paid — so
                I made it free for you! ❤️
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
