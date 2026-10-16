import { ComponentChildren } from "preact";
import { cn } from "../utils/cn";

interface CardListProps {
  className?: string;
  children: ComponentChildren;
}

export function CardList({ className, children }: CardListProps) {
  return (
    <ul className={cn(["card-list", className ?? null])}>
      {children}
    </ul>
  );
}
