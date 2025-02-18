// @flow

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
			<p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage(message) }}></p>
		</div>
	);
}
