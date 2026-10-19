import { useState } from "preact/hooks";
import { getI18nLocale } from "../utils/browser/i18n";
import { cn } from "./utils/cn";

type Props = {
	tableImg: string,
	tableBoxImg: string,
};

// Box images missing on BGA (404 responses are not cached by the browser): remembered so that they are not requested
// again on each popup opening. Retried after a few days, in case BGA has added them since.
const FAILED_IMAGES_KEY = "bgaext_failed_images";
const FAILED_IMAGES_DELAY = 7 * 24 * 3600 * 1000;

const loadFailedImages = (): Record<string, number> => {
	try {
		const now = Date.now();
		const stored = JSON.parse(localStorage.getItem(FAILED_IMAGES_KEY) || "{}") as Record<string, number>;
		return Object.fromEntries(Object.entries(stored).filter(([, time]) => now - time < FAILED_IMAGES_DELAY));
	} catch (error) {
		return {};
	}
};

const failedImages = loadFailedImages();

// An image error can also be a network failure: only an image that BGA reports as missing (404) is remembered
const rememberFailedImage = async (url: string) => {
	if (!navigator.onLine) {
		return;
	}

	try {
		const response = await fetch(url, { method: "HEAD" });
		if (response.status !== 404) {
			return;
		}
	} catch (error) {
		return;
	}

	failedImages[url] = Date.now();
	try {
		localStorage.setItem(FAILED_IMAGES_KEY, JSON.stringify(failedImages));
	} catch (error) {
		// not remembered: the image will be requested again next time
	}
};

// Same box image as BGA (user language, then english), the square game icon as last resort
export function TableImg({ tableImg, tableBoxImg }: Props) {
	const locale = getI18nLocale();
	const langs = locale && locale !== "en" ? [locale, "en"] : ["en"];
	const boxes = langs.map((lang) => `${tableBoxImg}${lang}_75.png`).filter((url) => !failedImages[url]);
	const sources = [...boxes, tableImg];
	const [index, setIndex] = useState(0);
	const isIcon = index >= sources.length - 1;

	const onError = () => {
		if (!isIcon) {
			rememberFailedImage(sources[index] as string);
			setIndex(index + 1);
		}
	};

	return (
		<img
			src={sources[Math.min(index, sources.length - 1)]}
			className={cn(["table-img", isIcon && "table-img--icon"])}
			alt=""
			// The tournaments and friends views are rendered off screen: their images are loaded when displayed
			loading="lazy"
			onError={onError}
		/>
	);
}
