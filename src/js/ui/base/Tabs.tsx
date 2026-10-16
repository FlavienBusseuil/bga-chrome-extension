import { ComponentChildren } from "preact";
import { cn } from "../utils/cn";

interface TabsProps {
  className?: string;
  children: ComponentChildren;
}

export function Tabs({ children, className }: TabsProps) {
  return (
    <div className={cn(["tabs", className ?? null])}>{children}</div>
  );
}
