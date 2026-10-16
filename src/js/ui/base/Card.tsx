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
        "card",
        className ?? null,
      ])}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
