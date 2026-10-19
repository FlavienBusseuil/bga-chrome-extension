import { cn } from "../utils/cn";
import { JSX } from "preact";

type BaseButtonProps = {
  text: JSX.Element | string;
  className?: string;
  size?: 1 | 2;
  type?: "primary";
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
  const styleFromSize = size === 1 ? "btn--small" : "btn--normal";
  const styleFromType = `btn--${type}`;

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
        "btn",
        styleFromSize,
        styleFromType,
        className ?? null,
      ])}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
