"use client";

import React, { createContext, useContext } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = useContext(ToggleGroupContext);

  const effectiveVariant = context.variant || variant;
  const effectiveSize = context.size || size;

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={effectiveVariant}
      data-size={effectiveSize}
      className={cn(
        toggleVariants({
          variant: effectiveVariant,
          size: effectiveSize,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
