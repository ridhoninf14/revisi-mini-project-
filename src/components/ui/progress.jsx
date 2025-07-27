"use client";

import { Root as ProgressRoot, Indicator as ProgressIndicator } from "@radix-ui/react-progress";
import { cn } from "./utils";

function Progress(props) {
  const { className, value, ...rest } = props;

  return (
    <ProgressRoot
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...rest}
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressRoot>
  );
}

export { Progress };
