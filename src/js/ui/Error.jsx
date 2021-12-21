// @flow

export function Error({
	errorMessage,
	errorDetails,
}: {
	errorMessage: string,
	errorDetails: string,
}): React$Element<"div"> {
	console.error(errorDetails);
	return (
		<div className="p-2 text-red-600 font-bold">
			<p>{`${errorMessage} (${errorDetails})`}</p>
			<p
				dangerouslySetInnerHTML={{
					__html: chrome.i18n.getMessage("report_error", [
						"bga.extension@gmail.com",
						`mailto:bga.extension@gmail.com?subject=Error Report&body=${errorDetails}`,
					]),
				}}
			></p>
		</div>
	);
}
