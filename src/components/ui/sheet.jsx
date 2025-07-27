import React, { useState } from "react";
import { XIcon } from "lucide-react";

function Sheet({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, setOpen })
      )}
    </>
  );
}

function SheetTrigger({ setOpen, children }) {
  return (
    <button onClick={() => setOpen(true)} data-slot="sheet-trigger">
      {children}
    </button>
  );
}

function SheetClose({ setOpen, children, className = "" }) {
  return (
    <button
      onClick={() => setOpen(false)}
      className={`absolute top-4 right-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 rounded-xs focus:outline-none ${className}`}
      data-slot="sheet-close"
    >
      {children ?? (
        <>
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </>
      )}
    </button>
  );
}

function SheetOverlay({ open }) {
  return open ? (
    <div
      className="fixed inset-0 z-50 bg-black/50 animate-fade-in"
      data-slot="sheet-overlay"
    />
  ) : null;
}

function SheetContent({
  open,
  setOpen,
  children,
  side = "right",
  className = "",
}) {
  if (!open) return null;

  const sideClasses = {
    right:
      "right-0 inset-y-0 w-3/4 border-l sm:max-w-sm slide-in-from-right",
    left:
      "left-0 inset-y-0 w-3/4 border-r sm:max-w-sm slide-in-from-left",
    top: "top-0 inset-x-0 h-auto border-b slide-in-from-top",
    bottom: "bottom-0 inset-x-0 h-auto border-t slide-in-from-bottom",
  };

  return (
    <>
      <SheetOverlay open={open} />
      <div
        className={`fixed z-50 bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col gap-4 p-4 ${sideClasses[side]} ${className}`}
        data-slot="sheet-content"
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { setOpen })
        )}
      </div>
    </>
  );
}

function SheetHeader({ className = "", ...props }) {
  return (
    <div
      className={`flex flex-col gap-1.5 ${className}`}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function SheetFooter({ className = "", ...props }) {
  return (
    <div
      className={`mt-auto flex flex-col gap-2 ${className}`}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-lg font-semibold text-foreground ${className}`}
      data-slot="sheet-title"
    >
      {children}
    </h2>
  );
}

function SheetDescription({ children, className = "" }) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      data-slot="sheet-description"
    >
      {children}
    </p>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
