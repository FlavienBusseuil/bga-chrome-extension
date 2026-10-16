import type { ComponentChildren, JSX } from "preact";
import { cn } from "../utils/cn";
import { Button } from "./Button";

interface TabProps {
  k: string;
  children: ComponentChildren;
  fullWidth: boolean;
  isActive?: boolean;
  onClick: (k: string) => void;
}

export function Tab({
  k,
  fullWidth,
  children,
  isActive = false,
  onClick,
}: TabProps) {
  return (
    <Button
      className={cn([
        "tab",
        fullWidth && "tab--full",
        !isActive && "tab--inactive",
      ])}
      type="primary"
      text={children as JSX.Element}
      onClick={() => onClick(k)}
      size={1}
    />
  );
}
