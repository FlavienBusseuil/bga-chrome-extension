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
        fullWidth ? "w-full whitespace-nowrap" : "whitespace-nowrap",
        !isActive && "!bg-bgaBlue-lighter",
        !isActive && "hover:!bg-bgaBlue-light",
        "!border-0",
      ])}
      type="primary"
      text={children as JSX.Element}
      onClick={() => onClick(k)}
      size={1}
    />
  );
}
