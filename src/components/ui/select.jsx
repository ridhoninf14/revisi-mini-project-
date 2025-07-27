import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import { cn } from "./utils"; 

function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className,
  size = "default",
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        data-slot="select-trigger"
        data-size={size}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap outline-none transition-[color,box-shadow]",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "default" ? "h-9" : "h-8"
        )}
      >
        <span>{value || <span className="text-muted-foreground">{placeholder}</span>}</span>
        {isOpen ? (
          <ChevronUpIcon className="size-4 opacity-50" />
        ) : (
          <ChevronDownIcon className="size-4 opacity-50" />
        )}
      </button>

      {isOpen && (
        <ul
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-60 overflow-y-auto text-sm",
          )}
          data-slot="select-content"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground",
                value === opt.value ? "bg-accent text-accent-foreground" : ""
              )}
              data-slot="select-item"
            >
              {value === opt.value && <CheckIcon className="size-4" />}
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Select };
