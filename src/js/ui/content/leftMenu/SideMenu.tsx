import React from "preact";
import { useState, useEffect } from "preact/hooks";

import { Game } from "../../../config/configuration";
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
}

const SideMenu = (props: SideMenuProps) => {
	const { players, gameConfig } = props;
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

	const checkPlayerPanels = () => {
		if (gameConfig.playerPanel.indexOf("{{") < 0) {
			const panels = Array.from(
				document.querySelectorAll(gameConfig.playerPanel),
			);
			players.forEach((p, index) => {
				const playerPanel = panels.find(
					(panel) => panel.innerHTML.indexOf(p.name) >= 0,
				);
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

		const toSort = players.map((p, index) => {
			const id = getPlayerPanelId(gameConfig, p, index);
			const element = document.getElementById(id);
			return {
				id,
				index,
				pos: element?.getBoundingClientRect().top || 0,
			};
		});

		if (gameConfig.boardPanel) {
			const boardPos = document.getElementById(gameConfig.boardPanel)?.getBoundingClientRect().top || 0;

			if (window.scrollY + boardPos > 200) {
				toSort.push({
					id: gameConfig.boardPanel,
					index: -1,
					pos:
						document
							.getElementById(gameConfig.boardPanel)
							?.getBoundingClientRect().top || 0,
				});
			}
		}

		if (gameConfig.bottomPanel) {
			toSort.push({
				id: gameConfig.bottomPanel,
				index: 100,
				pos:
					document
						.getElementById(gameConfig.bottomPanel)
						?.getBoundingClientRect().top || 0,
			});
		}

		toSort.sort((a, b) =>
			a.pos === b.pos
				? a.index < b.index
					? -1
					: 1
				: a.pos < b.pos
					? -1
					: 1,
		);
		setButtonsOrder(toSort.map((a) => a.id).join("|"));
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
			};

			elements[gameConfig.boardPanel] = (
				<PlayerIcon
					key={gameConfig.boardPanel}
					player={fakePlayer}
					index={-1}
					gameConfig={gameConfig}
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
			};

			elements[gameConfig.bottomPanel] = (
				<PlayerIcon
					key={gameConfig.bottomPanel}
					player={fakePlayer}
					index={-1}
					gameConfig={gameConfig}
				/>
			);
		}

		return buttonsOrder.split("|").map((id) => elements[id]);
	};

	return (
		<div style={containerStyle}>
			{position === "top" && (
				<SideMenuItem onClick={toggleMenu}>
					<Avatar
						backColor={gameConfig.iconBackground}
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
						backColor={gameConfig.iconBackground}
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
						backColor={gameConfig.iconBackground}
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
