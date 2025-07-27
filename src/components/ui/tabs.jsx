"use client";

import React, { useState } from "react";
import { cn } from "./utils";

function Tabs({ className, defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { activeTab, setActiveTab });
  });

  return <div className={cn("flex flex-col gap-2", className)}>{childrenWithProps}</div>;
}

function TabsList({ className, children }) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ className, value, activeTab, setActiveTab, children }) {
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      data-slot="tabs-trigger"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        isActive &&
          "bg-card text-foreground dark:text-foreground dark:border-input dark:bg-input/30",
        !isActive && "dark:text-muted-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, activeTab, children }) {
  if (activeTab !== value) return null;

  return (
    <div data-slot="tabs-content" className={cn("flex-1 outline-none", className)}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
