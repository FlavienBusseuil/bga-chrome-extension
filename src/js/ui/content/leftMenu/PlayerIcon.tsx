import { useState } from "preact/hooks";

import type { Game } from "../../../config/models";
import { hexToRgb } from "../../../utils/misc/colors";
import Avatar from "./Avatar";
import SideMenuItem from "./SideMenuItem";
import PlayerName from "./PlayerName";
import { Player, getPlayerPanelId } from "./player";
import BoardIcon from "./icons/BoardIcon";
import BottomArrowIcon from "./icons/BottomArrowIcon";

interface PlayerIconProps {
	player: Player;
	gameConfig: Game;
	index: number;
	darkMode: boolean;
}

const PlayerIcon = (props: PlayerIconProps) => {
	const [over, setOver] = useState(false);
	const { player, gameConfig, index, darkMode } = props;
	const eltId = getPlayerPanelId(gameConfig, player, index);

	const getOffset = () => {
		if (!player.fake) {
			return gameConfig.playerPanelOffset || 0;
		}
		if (player.avatar === "board") {
			return gameConfig.boardPanelOffset || 0;
		}
		return gameConfig.bottomPanelOffset || 0;
	};

	const isTouchEnabled = () => {
		return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || ((navigator as any).msMaxTouchPoints > 0);
	}

	const scrollToPlayer = () => {
		const element = document.getElementById(eltId);
		const titleBar = document.getElementById("page-title");
		const topBar = document.getElementById("topbar");

		if (!element || !topBar || !titleBar) {
			return;
		}

		const currentPos = window.scrollY;
		const minTop = topBar.getBoundingClientRect().height + 20;

		if (currentPos < minTop) {
			window.scrollTo({ top: minTop + 10 });
			setTimeout(scrollToPlayer, 50);
			return;
		}

		const decTitleBar =
			getComputedStyle(titleBar).position === "fixed"
				? titleBar.getBoundingClientRect().height
				: 0;

		window.scrollTo({
			behavior: "smooth",
			top: (element.getBoundingClientRect().top - decTitleBar) - getOffset() - document.body.getBoundingClientRect().top,
		});

		if (isTouchEnabled()) {
			setTimeout(() => setOver(false), 2000);
		}
	};

	const getTextColor = (playerColor: string | undefined) => {
		if (playerColor) {
			try {
				const color = hexToRgb(playerColor);
				if (color) {
					// convert to linear sRGB
					const [R, G, B] = [color.r, color.g, color.b].map(v => {
						const c = v / 255;
						return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
					});
					const luminance = 0.2126 * R! + 0.7152 * G! + 0.0722 * B!;
					return luminance > 0.179 ? "#000" : "#fff";
				}
			} catch (error) { }
		}

		return "#000";
	};

	const getIcon = () => {
		if (!player.fake) {
			return <img src={`${player.avatar}`} alt={player.name} />;
		}
		if (player.avatar === "board") {
			return <BoardIcon />;
		}
		return <BottomArrowIcon />;
	};

	const iconBackground = darkMode ? gameConfig.iconBackgroundDark : gameConfig.iconBackground;
	const playerColor = darkMode ? player.darkColor || player.color : player.color;
	const iconBorder = darkMode ? gameConfig.iconBorderDark : gameConfig.iconBorder;
	const iconShadow = darkMode ? gameConfig.iconShadowDark : gameConfig.iconShadow;
	const iconColor = darkMode ? gameConfig.iconColorDark : gameConfig.iconColor;

	return (
		<SideMenuItem onClick={scrollToPlayer}>
			<Avatar
				backColor={iconBackground}
				borderColor={iconBorder}
				shadowColor={iconShadow}
				iconColor={iconColor}
				onMouseOver={() => setOver(true)}
				onMouseOut={() => setOver(false)}
			>
				{getIcon()}
			</Avatar>
			<PlayerName
				backColor={playerColor}
				borderColor={iconBorder}
				shadowColor={iconShadow}
				textColor={getTextColor(playerColor)}
				hover={!!player.name && over}
			>
				{player.name}
			</PlayerName>
		</SideMenuItem>
	);
};

export default PlayerIcon;
