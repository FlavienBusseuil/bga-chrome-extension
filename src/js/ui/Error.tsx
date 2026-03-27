import Markup from "preact-markup";
import { isFirefox } from "../utils/browser";
import { i18n } from "../utils/browser/i18n";

interface ErrorProps {
  errorMessage: string;
  errorDetails: string;
}

export function Error({ errorMessage, errorDetails }: ErrorProps) {
  const message = isFirefox
    ? "report_error_ff"
    : "report_error";

  return (
    <div className="p-2 text-red-600 font-bold flex flex-col gap-2">
      <div>{`${errorMessage} (${errorDetails})`}</div>
      <Markup markup={i18n(message)} type='html' trim={false} />
    </div>
  );
};
