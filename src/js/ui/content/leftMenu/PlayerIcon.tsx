import React from "preact";
import { useState } from "preact/hooks";
import fontColorContrast from "font-color-contrast";
import rgbHex from "rgb-hex";

import { Game } from "../../../config/configuration";
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
}

const PlayerIcon = (props: PlayerIconProps) => {
	const [over, setOver] = useState(false);
	const { player, gameConfig, index } = props;
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
		const pageContent = document.getElementById("page-content");
		let zoom = pageContent ? (getComputedStyle(pageContent) as any).zoom || 1 : 1;
		let customZoom = 1;

		if (!Number(zoom)) {
			zoom = 1;
		}

		try {
			if (gameConfig.customZoomContainer) {
				const customZoomDiv = document.getElementById(gameConfig.customZoomContainer);

				if (customZoomDiv) {
					customZoom = (getComputedStyle(customZoomDiv) as any).zoom || 1;
				}
			}
		} catch (error) {
			console.error("[bga extension] Error getting custom zoom", error);
		}

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
			top:
				((element.getBoundingClientRect().top - decTitleBar) *
					customZoom -
					getOffset() / customZoom) *
				zoom -
				document.body.getBoundingClientRect().top,
		});

		if (isTouchEnabled()) {
			setTimeout(() => setOver(false), 2000);
		}
	};

	const getTextColor = (playerColor: string | undefined) => {
		if (playerColor) {
			try {
				return fontColorContrast(rgbHex(playerColor));
			} catch (error) { }
		}

		return "#000000";
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

	return (
		<SideMenuItem onClick={scrollToPlayer}>
			<Avatar
				backColor={gameConfig.iconBackground}
				borderColor={gameConfig.iconBorder}
				shadowColor={gameConfig.iconShadow}
				onMouseOver={() => setOver(true)}
				onMouseOut={() => setOver(false)}
			>
				{getIcon()}
			</Avatar>
			<PlayerName
				backColor={player.color}
				borderColor={gameConfig.iconBorder}
				shadowColor={gameConfig.iconShadow}
				textColor={getTextColor(player.color)}
				hover={!!player.name && over}
			>
				{player.name}
			</PlayerName>
		</SideMenuItem>
	);
};

export default PlayerIcon;
