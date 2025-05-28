import { ComponentChildren } from "preact";
import { cn } from "../utils/cn";

interface CardListProps {
  className?: string;
  children: ComponentChildren;
}

export function CardList({ className, children }: CardListProps) {
  return (
    <ul className={cn(["container flex flex-col space-y-2", className ?? null])}>
      {children}
    </ul>
  );
}
