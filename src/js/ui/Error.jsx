// @flow
import { i18n } from "../utils/browser";

export function Error({
	errorMessage,
	errorDetails,
}: {
	errorMessage: string,
	errorDetails: string,
}): React$Element<"div"> {
	const message = window.navigator.userAgent.toLowerCase().includes('firefox') ? "report_error_ff" : "report_error";

	return (
		<div className="p-2 text-red-600 font-bold">
			<p>{`${errorMessage} (${errorDetails})`}</p>
			<p dangerouslySetInnerHTML={{ __html: i18n(message) }}></p>
		</div>
	);
}
