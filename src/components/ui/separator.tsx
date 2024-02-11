"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { useStore } from "@/store/storage";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    componentOrder?: number;
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      componentOrder,
      ...props
    },
    ref
  ) => {
    const { lastComponentOrder } = useStore();
    return (
      <SeparatorPrimitive.Root
        style={{
          order: componentOrder,
          display:
            (componentOrder === 9999 ? "none" : "") ||
            (componentOrder === lastComponentOrder ? "none" : ""),
        }}
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          "dark:bg-slate-600/50 bg-slate-300/70 rounded-full my-2",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
