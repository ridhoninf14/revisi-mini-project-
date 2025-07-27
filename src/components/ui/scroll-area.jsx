import { cn } from "./utils"; 

function ScrollArea({ className, children, ...props }) {
  return (
    <div
      className={cn("relative overflow-auto", className)}
      {...props}
    >
      <div
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </div>
      <ScrollBar />
    </div>
  );
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex touch-none p-px transition-colors select-none absolute",
        isVertical
          ? "right-0 top-0 h-full w-2.5 border-l border-l-transparent"
          : "bottom-0 left-0 w-full h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <div className="bg-border relative flex-1 rounded-full" />
    </div>
  );
}

export { ScrollArea, ScrollBar };
