import React from "preact";
import { useState, useEffect } from "preact/hooks";

import Configuration, { Game } from "../../../config/configuration";
import SideMenuItem from "./SideMenuItem";
import PlayerIcon from "./PlayerIcon";
import CloseIcon from "./icons/CloseIcon";
import TopArrowIcon from "./icons/TopArrowIcon";
import SandwichIcon from "./icons/SandwichIcon";
import Avatar from "./Avatar";
import { Player, getPlayerPanelId } from "./player";

import "../../../../css/leftMenu.css";

interface SideMenuProps {
	players: [Player];
	panel: string;
	gameConfig: Game;
	config: Configuration;
}

const SideMenu = (props: SideMenuProps) => {
	const { players, gameConfig, config } = props;
	const [darkMode, setDarkMode] = useState(config.isDarkMode());
	const [visible, setVisible] = useState(true);
	const [position, setPosition] = useState(
		gameConfig.position === "bottom" ? "bottom" : "top",
	);
	const [zoomVisible, setZoomVisible] = useState(false);
	const [buttonsOrder, setButtonsOrder] = useState("");

	const setMenuPosition = () => {
		if (gameConfig.position === "auto") {
			const isMobile = document.body.classList.contains("mobile_version");
			setPosition(isMobile ? "bottom" : "top");
		}

		const isZoomVisible =
			document.getElementById("globalaction_zoom_wrap")?.style.display ===
			"inline-block";
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
		if (elt.attributes && elt.attributes['data-title'] && elt.attributes['data-title'].value === name) {
			return true;
		}
		return false;
	};

	const checkPlayerPanels = () => {
		if (gameConfig.playerPanel.indexOf("{{") < 0) {
			const panels = Array.from(
				document.querySelectorAll(gameConfig.playerPanel),
			);
			players.forEach((p, index) => {
				let playerPanel = panels.find(
					(panel) => checkPlayerName(panel, p.name),
				);
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
			const boardPos = document.getElementById(gameConfig.boardPanel)?.getBoundingClientRect().top || 0;

			if (window.scrollY + boardPos > 200) {
				const pos = document.getElementById(gameConfig.boardPanel)?.getBoundingClientRect().top;
				pos !== undefined && toSort.push({
					id: gameConfig.boardPanel,
					index: -1,
					pos
				});
			}
		}

		if (gameConfig.bottomPanel) {
			const pos = document.getElementById(gameConfig.bottomPanel)?.getBoundingClientRect().top;
			pos !== undefined && toSort.push({
				id: gameConfig.bottomPanel,
				index: 100,
				pos
			});
		}

		toSort.sort((a, b) =>
			a.pos === b.pos
				? a.index < b.index
					? -1
					: 1
				: (a.pos || 0) < (b.pos || 0)
					? -1
					: 1,
		);

		setButtonsOrder(toSort.map(a => a.id).join("|"));
	};

	const getButtons = () => {
		const elements = {};

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
			const boardName = gameConfig.boardPanelText
				? document.querySelector(gameConfig.boardPanelText)?.innerHTML
				: undefined;
			const fakePlayer = {
				fake: true,
				id: gameConfig.boardPanel,
				name: boardName || chrome.i18n.getMessage("sideMenuMainBoard"),
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

	return (
		<div style={containerStyle}>
			{position === "top" && (
				<SideMenuItem onClick={toggleMenu}>
					<Avatar
						backColor={iconBackground}
						borderColor={gameConfig.iconBorder}
						shadowColor={gameConfig.iconShadow}
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
						borderColor={gameConfig.iconBorder}
						shadowColor={gameConfig.iconShadow}
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
						borderColor={gameConfig.iconBorder}
						shadowColor={gameConfig.iconShadow}
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
