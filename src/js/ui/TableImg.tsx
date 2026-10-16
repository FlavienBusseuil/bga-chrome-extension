import { useState } from "preact/hooks";
import { getI18nLocale } from "../utils/browser/i18n";
import { cn } from "./utils/cn";

type Props = {
	tableImg: string,
	tableBoxImg: string,
};

// Same box image as BGA (user language, then english), the square game icon as last resort
export function TableImg({ tableImg, tableBoxImg }: Props) {
	const locale = getI18nLocale();
	const langs = locale && locale !== "en" ? [locale, "en"] : ["en"];
	const sources = [...langs.map((lang) => `${tableBoxImg}${lang}_75.png`), tableImg];
	const [index, setIndex] = useState(0);
	const isIcon = index === sources.length - 1;

	return (
		<img
			src={sources[index]}
			className={cn(["table-img", isIcon && "table-img--icon"])}
			alt=""
			onError={() => !isIcon && setIndex(index + 1)}
		/>
	);
}
