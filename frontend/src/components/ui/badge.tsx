import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        get: "border-transparent bg-green-600 text-green-50 hover:bg-green-500", // Green for GET
        post: "border-transparent bg-blue-600 text-blue-50 hover:bg-blue-500", // Blue for POST
        put: "border-transparent bg-purple-600 text-purple-50 hover:bg-purple-500", // Purple for PUT
        patch:
          "border-transparent bg-yellow-500 text-yellow-900 hover:bg-yellow-400", // Yellow for PATCH
        delete: "border-transparent bg-red-600 text-red-50 hover:bg-red-500", // Red for DELETE
        other: "border-transparent bg-gray-500 text-gray-50 hover:bg-gray-400", // Gray for other methods
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80", // Default variant
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
