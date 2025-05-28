import { ComponentChildren } from "preact";
import { cn } from "../utils/cn";

interface TabsProps {
  className?: string;
  children: ComponentChildren;
}

export function Tabs({ children, className }: TabsProps) {
  return (
    <div className={cn(["flex gap-1 w-full", className ?? null])}>{children}</div>
  );
}
