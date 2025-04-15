import { ComponentChildren } from "preact";
import { cn } from "../utils/cn";

interface CardProps {
  className?: string;
  children: ComponentChildren;
  onClick: () => void;
}

export function Card({ className, children, onClick }: CardProps) {
  return (
    <li
      className={cn([
        "flex",
        "flex-col",
        "gap-2",
        "pl-2",
        "relative",
        "bg-white",
        "rounded",
        "shadow-md",
        "cursor-pointer",
        "border-transparent",
        "border",
        "border-gray-300",
        "hover:border-gray-600",
        "overflow-hidden",
        className ?? null,
      ])}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
