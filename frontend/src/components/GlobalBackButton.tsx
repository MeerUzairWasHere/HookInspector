"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GlobalBackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="fixed z-50 flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800
        top-6 left-6 p-2 rounded-full shadow-sm
        md:p-2 md:rounded-full
        sm:px-4
        max-sm:top-auto max-sm:bottom-6 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:px-4 max-sm:py-3 max-sm:rounded-lg max-sm:shadow-md"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="hidden sm:inline">Back</span>
    </Button>
  );
}
