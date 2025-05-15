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
    <div className="p-2 text-red-600 font-bold">
      <p>{`${errorMessage} (${errorDetails})`}</p>
      <p dangerouslySetInnerHTML={{ __html: i18n(message) }}></p>
    </div>
  );
};
