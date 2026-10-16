// Icons used by the table cards. Arena and tournament mimic BGA's own icons.
// Parts with the "cut" class are drawn with the tile background color (--tb) to carve the shape.

// Clock with a circular arrow, like BGA's turn based icon ("history" path from Lucide icons, ISC license)
export function ClockIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
			<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<path d="M3 3v5h5" />
			<path d="M12 7v5l4 2" />
		</svg>
	);
}

export function LightningIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" stroke-width={1.2} stroke-linejoin="round">
			<path d="M9.5 0.8 3 9h4.2L6.3 15.2 13 6.8H8.8z" />
		</svg>
	);
}

export function TrophyIcon() {
	return (
		<svg className="ic" viewBox="0 0 16 16">
			<path className="s" d="M4.6 3.2H2.4v.9a2.6 2.6 0 0 0 2.7 2.6M11.4 3.2h2.2v.9a2.6 2.6 0 0 1-2.7 2.6" />
			<path d="M4.2 1.4h7.6v4.4a3.8 3.8 0 0 1-7.6 0z" />
			<rect x="7.1" y="9" width="1.8" height="3" />
			<rect x="4.4" y="12" width="7.2" height="2.4" rx="0.6" />
		</svg>
	);
}

export function ArenaIcon() {
	return (
		<svg className="ic" viewBox="0 0 16 16">
			<path className="s" stroke-width={1.4} d="M3 3l10.6 10.6M13 3 2.4 13.6M3.3 6.4l3-3M9.7 3.4l3 3" />
			<circle cx="2.3" cy="2.3" r="1.1" />
			<circle cx="13.7" cy="2.3" r="1.1" />
			<circle cx="8" cy="8.4" r="4.4" />
			<circle className="cut" stroke-width={1.1} cx="8" cy="8.4" r="1.5" />
		</svg>
	);
}

// Handshake path from Lucide icons (ISC license)
export function HandshakeIcon() {
	return (
		<svg className="ic" viewBox="0 0 24 24">
			<g className="s" stroke-width={2}>
				<path d="m11 17 2 2a1 1 0 1 0 3-3" />
				<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
				<path d="m21 3 1 11h-2" />
				<path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
				<path d="M3 4h8" />
			</g>
		</svg>
	);
}
