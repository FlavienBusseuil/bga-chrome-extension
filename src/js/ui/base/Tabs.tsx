import { cn } from "../utils/cn";
import type { Tab } from "./Tab";

interface TabsProps {
  className?: string;
  children: typeof Tab;
}

export function Tabs({ children, className }: TabsProps) {
  return (
    <div className={cn(["flex gap-1 w-full", className ?? null])}>{children}</div>
  );
}
