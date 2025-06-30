import { useState, useEffect } from "preact/hooks";
import { isMobile } from "is-mobile";

import { i18n } from "../../../utils/browser/i18n";

import SideMenuItem from "./SideMenuItem";
import PlayerIcon from "./PlayerIcon";
import CloseIcon from "./icons/CloseIcon";
import TopArrowIcon from "./icons/TopArrowIcon";
import SandwichIcon from "./icons/SandwichIcon";
import Avatar from "./Avatar";
import { type Player, getPlayerPanelId } from "./player";

import type Configuration from "../../../config/configuration";
import type { Game } from "../../../config/models";

import "../../../../css/leftMenu.css";

interface SideMenuProps {
	players: Player[];
	panel: string;
	gameConfig: Game;
	config: Configuration;
}

const SideMenu = (props: SideMenuProps) => {
	const { players, gameConfig, config } = props;
	const [darkMode, setDarkMode] = useState(config.isDarkMode());
	const [visible, setVisible] = useState(true);
	const [position, setPosition] = useState(gameConfig.position === "bottom" ? "bottom" : "top");
	const [zoomVisible, setZoomVisible] = useState(false);
	const [buttonsOrder, setButtonsOrder] = useState("");
	const [boardButtonText, setBoardButtonText] = useState<string>();

	const getBoardName = () => {
		if (gameConfig.boardPanelText && !boardButtonText) {
			setBoardButtonText(document.querySelector(gameConfig.boardPanelText)?.innerHTML);
		}
	};

	const setMenuPosition = () => {
		if (gameConfig.position === "auto") {
			setPosition(isMobile() ? "bottom" : "top");
		}

		const isZoomVisible = document.getElementById("globalaction_zoom_wrap")?.style.display === "inline-block";
		setZoomVisible(isZoomVisible);
	};

	useEffect(() => {
		setMenuPosition();
		window.addEventListener("resize", setMenuPosition);
		const timer = setInterval(getButtonsOrder, 1000);
		getButtonsOrder();
		return () => {
			window.removeEventListener("resize", setMenuPosition);
			clearInterval(timer);
		};
	});

	useEffect(() => {
		const barContainer = document.getElementById("bga_extension_sidebar");

		if (barContainer) {
			if (position === "top") {
				barContainer.style.top = gameConfig.top || "150px";
				barContainer.style.bottom = "";
			} else if (gameConfig.bottom === "auto") {
				barContainer.style.top = "";
				barContainer.style.bottom = zoomVisible ? "70px" : "10px";
			} else {
				barContainer.style.top = "";
				barContainer.style.bottom = gameConfig.bottom || "70px";
			}
		}
	}, [position, zoomVisible, gameConfig.top, gameConfig.bottom]);

	const scrollToTop = () => {
		const topBar = document.getElementById("topbar");

		topBar &&
			window.scrollTo({
				behavior: "smooth",
				top: topBar.getBoundingClientRect().height + 2,
			});
	};

	const toggleMenu = () => setVisible(!visible);
	const containerStyle = {
		display: "flex",
		flexFlow: "column",
		gap: "0.8em",
	};

	const checkPlayerName = (elt: Element, name: string) => {
		if (elt.innerHTML.indexOf(name) >= 0) {
			return true;
		}
		if (elt.getAttribute('data-title') === name) {
			return true;
		}
		return false;
	};

	const checkPlayerPanels = () => {
		if (gameConfig.playerPanel.indexOf("{{") < 0) {
			const panels = Array.from(document.querySelectorAll(gameConfig.playerPanel));

			players.forEach((p, index) => {
				let playerPanel = panels.find(panel => checkPlayerName(panel, p.name));

				if (!playerPanel && gameConfig.myPanel) {
					playerPanel = document.querySelector(gameConfig.myPanel) || undefined;
				}
				if (playerPanel) {
					if (!playerPanel.id) {
						playerPanel.id = `bgaext_panel_${index}`;
					}
					p.panelId = playerPanel.id;
				}
			});
		}
	};

	const getButtonsOrder = () => {
		checkPlayerPanels();
		getBoardName();

		if (config.isDarkMode() !== darkMode) {
			setDarkMode(!darkMode);
		}

		const toSort = players.map((p, index) => {
			const id = getPlayerPanelId(gameConfig, p, index);
			const element = document.getElementById(id);
			const pos = element && getComputedStyle(element).display !== "none"
				? element.getBoundingClientRect().top
				: undefined;

			return { id, index, pos };
		}).filter(a => a.pos !== undefined);

		if (gameConfig.boardPanel) {
			const boardPos = document.getElementById(gameConfig.boardPanel)?.getBoundingClientRect().top;

			if (window.scrollY + (boardPos || 0) > 200) {
				boardPos !== undefined && toSort.push({
					id: gameConfig.boardPanel,
					index: -1,
					pos: boardPos
				});
			}
		}

		if (gameConfig.bottomPanel) {
			const bottomPos = document.getElementById(gameConfig.bottomPanel)?.getBoundingClientRect().top;

			bottomPos !== undefined && toSort.push({
				id: gameConfig.bottomPanel,
				index: 100,
				pos: bottomPos
			});
		}

		toSort.sort((a, b) => a.pos === b.pos ? a.index < b.index ? -1 : 1 : (a.pos || 0) < (b.pos || 0) ? -1 : 1);

		setButtonsOrder(toSort.map(a => a.id).join("|"));
	};

	const getButtons = () => {
		const elements: Record<string, any> = {};

		players.forEach((p, index) => {
			const id = getPlayerPanelId(gameConfig, p, index);

			elements[id] = (
				<PlayerIcon
					key={`item_${p.id}`}
					player={p}
					index={index}
					gameConfig={gameConfig}
					darkMode={darkMode}
				/>
			);
		});

		if (gameConfig.boardPanel) {
			const fakePlayer = {
				fake: true,
				id: gameConfig.boardPanel,
				name: boardButtonText || i18n("sideMenuMainBoard"),
				avatar: "board",
				color: "#ffffff",
				darkColor: "#272a2f"
			};

			elements[gameConfig.boardPanel] = (
				<PlayerIcon
					key={gameConfig.boardPanel}
					player={fakePlayer}
					index={-1}
					gameConfig={gameConfig}
					darkMode={darkMode}
				/>
			);
		}

		if (gameConfig.bottomPanel) {
			const fakePlayer = {
				fake: true,
				id: gameConfig.bottomPanel,
				name: "",
				avatar: "bottom",
				color: "#ffffff",
				darkColor: "#272a2f"
			};

			elements[gameConfig.bottomPanel] = (
				<PlayerIcon
					key={gameConfig.bottomPanel}
					player={fakePlayer}
					index={-1}
					gameConfig={gameConfig}
					darkMode={darkMode}
				/>
			);
		}

		return buttonsOrder.split("|").map((id) => elements[id]);
	};

	const iconBackground = darkMode ? gameConfig.iconBackgroundDark : gameConfig.iconBackground;
	const iconBorder = darkMode ? gameConfig.iconBorderDark : gameConfig.iconBorder;
	const iconShadow = darkMode ? gameConfig.iconShadowDark : gameConfig.iconShadow;
	const iconColor = darkMode ? gameConfig.iconColorDark : gameConfig.iconColor;

	return (
		<div style={containerStyle}>
			{position === "top" && (
				<SideMenuItem onClick={toggleMenu}>
					<Avatar
						backColor={iconBackground}
						borderColor={iconBorder}
						shadowColor={iconShadow}
						iconColor={iconColor}
					>
						{visible && <CloseIcon />}
						{!visible && <SandwichIcon />}
					</Avatar>
				</SideMenuItem>
			)}
			{visible && (
				<SideMenuItem onClick={scrollToTop}>
					<Avatar
						backColor={iconBackground}
						borderColor={iconBorder}
						shadowColor={iconShadow}
						iconColor={iconColor}
					>
						<TopArrowIcon />
					</Avatar>
				</SideMenuItem>
			)}
			{visible && getButtons()}
			{position === "bottom" && (
				<SideMenuItem onClick={toggleMenu}>
					<Avatar
						backColor={iconBackground}
						borderColor={iconBorder}
						shadowColor={iconShadow}
						iconColor={iconColor}
					>
						{visible && <CloseIcon />}
						{!visible && <SandwichIcon />}
					</Avatar>
				</SideMenuItem>
			)}
		</div>
	);
};

export default SideMenu;
