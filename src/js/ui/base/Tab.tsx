import type { ComponentChildren, JSX } from "preact";
import { cn } from "../utils/cn";
import { Button } from "./Button";

interface TabProps {
  k: string;
  children: ComponentChildren;
  fullWidth: boolean;
  isActive?: boolean;
  className?: string;
  onClick: (k: string) => void;
}

export function Tab({
  k,
  fullWidth,
  children,
  isActive = false,
  className,
  onClick,
}: TabProps) {
  return (
    <Button
      className={cn([
        "tab",
        fullWidth && "tab--full",
        !isActive && "tab--inactive",
        className ?? null,
      ])}
      type="primary"
      text={children as JSX.Element}
      onClick={() => onClick(k)}
      size={1}
    />
  );
}
