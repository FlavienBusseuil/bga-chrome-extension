import { cn } from "../utils/cn";
import { Card } from "./Card";

interface CardListProps {
  className?: string;
  children: typeof Card;
}

export function CardList({ className, children }: CardListProps) {
  return (
    <ul className={cn(["container flex flex-col space-y-2", className ?? null])}>
      {children}
    </ul>
  );
}
