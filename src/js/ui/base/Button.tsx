import { cn } from "../utils/cn";
import { JSX } from "preact";

type BaseButtonProps = {
  text: JSX.Element | string;
  className?: string;
  size?: 1 | 2;
  type?: "primary" | "secondary" | "accept";
}

type UrlButtonProps = BaseButtonProps & {
  url: string;
  onClick?: never;
}

type ClickButtonProps = BaseButtonProps & {
  url?: never;
  onClick: () => void;
}

type ButtonProps = UrlButtonProps | ClickButtonProps;

export function Button({
  text,
  className,
  size = 2,
  type = "primary",
  ...rest
}: ButtonProps) {
  const styleFromSize = {
    "1": "font-normal px-2 py-0.5",
    "2": "font-normal px-4 py-2",
  }[String(size) as "1" | "2"];

  const styleFromType = {
    primary: "bg-bgaBlue hover:bg-bgaBlue-light border-bgaBlue-light",
    accept: "bg-bgaGreen hover:bg-bgaGreen-light border-bgaGreen",
    secondary: "bg-gray-400 hover:bg-gray-350 border-gray-400",
  }[type];

  const handleClick = (() => {
    if ('url' in rest && rest.url) {
      return () => window.open(rest.url, "_blank");
    }

    return (event: MouseEvent) => {
      event.stopPropagation();
      if (!rest.onClick) return;
      rest.onClick();
    };
  })();

  return (
    <div
      role="button"
      className={cn([
        "text-white",
        "text-center",
        "shadow",
        "border",
        styleFromSize,
        styleFromType,
        "cursor-pointer",
        "rounded",
        className ?? null,
      ])}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
