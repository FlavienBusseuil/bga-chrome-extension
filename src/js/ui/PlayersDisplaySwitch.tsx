import { i18n } from "../utils/browser/i18n";

type Props = {
	compact: boolean;
	onChange: (compact: boolean) => void;
};

// Display of the players of the tables: avatars only (compact) or avatars and names
export function PlayersDisplaySwitch({ compact, onChange }: Props) {
	const options = [
		{
			value: true,
			title: i18n("players_avatars"),
			icon: <><circle cx="5" cy="8" r="4.2" /><circle cx="12" cy="8" r="4.2" /><circle cx="19" cy="8" r="4.2" /></>,
		},
		{
			value: false,
			title: i18n("players_names"),
			icon: <>
				<rect x="0.8" y="3" width="22.4" height="10" rx="5" fill="none" stroke-width="1.6" />
				<circle cx="5.8" cy="8" r="3" />
				<path d="M11 8h8" fill="none" stroke-width="1.8" stroke-linecap="round" />
			</>,
		},
	];

	return (
		<div className="display-switch" role="radiogroup" aria-label={i18n("players_display")}>
			{options.map(({ value, title, icon }) => (
				<button
					key={String(value)}
					type="button"
					role="radio"
					aria-checked={compact === value}
					title={title}
					onClick={() => onChange(value)}
				>
					<svg viewBox="0 0 24 16" aria-hidden="true">{icon}</svg>
				</button>
			))}
		</div>
	);
}
