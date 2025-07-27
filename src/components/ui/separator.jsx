function Separator({
  className = "",
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  const baseClass =
    "bg-gray-300 shrink-0 " +
    (orientation === "horizontal"
      ? "h-px w-full"
      : "h-full w-px");

  return (
    <div
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      className={`${baseClass} ${className}`}
      {...props}
    />
  );
}

export { Separator };

