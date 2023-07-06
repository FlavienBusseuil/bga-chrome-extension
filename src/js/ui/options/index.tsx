import React from "preact";
import { useEffect, useState } from "preact/hooks";

import Configuration, { Game } from "../../config/configuration";
import "../../../css/options.css";

const Options = (props: { config: Configuration }) => {
	const { config } = props;
	const [list, setList] = useState<Game[]>(config.getGamesList());
	const [selected, setSelected] = useState(list[0]);
	const [changed, setChanged] = useState(false);
	const [text, setText] = useState("");
	const [tabSelected, setTabSelected] = useState("hidden");
	const [hiddenGames, setHiddenGames] = useState<string[]>(
		config.getHiddenGames(),
	);

	const serialize = (game: Game) => {
		return JSON.stringify(
			game,
			[
				"name",
				"position",
				"top",
				"bottom",
				"left",
				"boardPanel",
				"boardPanelOffset",
				"playerPanel",
				"playerPanelOffset",
				"bottomPanel",
				"bottomPanelOffset",
				"iconBackground",
				"iconBorder",
				"iconColor",
				"iconShadow",
				"customZoomContainer",
				"css",
				"menuCss",
			],
			2,
		);
	};

	useEffect(() => setText(serialize(selected)), [selected]);
	useEffect(() => {
		debugger;
		setChanged(serialize(selected) !== text);
	}, [selected, text]);
	useEffect(() => {
		const newSelected = list.find((g) => g.name === selected.name);
		if (newSelected) {
			setSelected({ ...newSelected });
		} else {
			setSelected(list[0]);
		}
	}, [list, selected.name]);

	const reset = () => {
		setList(config.resetGame(selected.name));
	};

	const save = () => {
		const game = JSON.parse(text);
		setList(config.saveGame(selected.name, game));
		setSelected(game);
	};

	const duplicate = () => {
		const newGame = { ...selected, name: `${selected.name}_copy` };
		setList(config.saveGame(newGame.name, newGame));
		setSelected(newGame);
	};

	const isCustomized = config.isCustomized(selected.name);
	const isDefault = config.isDefault(selected.name);
	const couldReset = changed || (isCustomized && isDefault);
	const couldDelete = isCustomized && !isDefault;

	const getHiddenConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionHiddenTitle")}
				</div>
				<div className="bgext_hidden_games_container">
					{!hiddenGames.length && (
						<span>
							{chrome.i18n.getMessage("optionNoHiddenGames")}
						</span>
					)}
					{hiddenGames.length > 0 &&
						hiddenGames.map((game, index) => (
							<div
								className="bgext_hidden_game"
								key={`game_${index}`}
							>
								{game}
								<div
									className="bgext_hidden_game_close"
									onClick={() =>
										setHiddenGames(config.displayGame(game))
									}
								>
									🗙
								</div>
							</div>
						))}
				</div>
				<div className="bgext_options_warning">
					{chrome.i18n.getMessage("optionHiddenGamesWarning")}
				</div>
			</>
		);
	};

	const getNavigationConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionNavigationTitle")}
				</div>
				<div className="bgext_options_container">
					<div className="bgext_options_gamelist_container">
						<div className="bgext_options_gamelist">
							{list.map((g, i) => {
								const className =
									selected.name === g.name
										? "bgext_options_gameitem_selected"
										: "bgext_options_gameitem";
								return (
									<div
										className={className}
										key={`game_${i}`}
										onClick={() => setSelected(g)}
									>
										{g.name}
									</div>
								);
							})}
						</div>
					</div>
					<div className="bgext_options_col_container">
						<div className="bgext_options_gameconfig_container">
							<textarea
								id="game_config"
								className="bgext_options_input"
								value={text}
								onChange={(evt) => setText((evt.target as any).value)}
								onKeyUp={() => setText((document.getElementById("game_config") as any).value)}
							/>
						</div>
						<div className="bgext_options_row_container">
							<button
								style={{ width: "100px" }}
								onClick={duplicate}
							>
								{chrome.i18n.getMessage("optionDuplicate")}
							</button>
							<button
								disabled={!couldReset}
								style={{ width: "100px" }}
								onClick={reset}
							>
								{chrome.i18n.getMessage("optionReset")}
							</button>
							<button
								disabled={!couldDelete}
								style={{ width: "100px" }}
								onClick={reset}
							>
								{chrome.i18n.getMessage("optionDelete")}
							</button>
							<button
								disabled={!changed}
								style={{ width: "100px" }}
								onClick={save}
							>
								{chrome.i18n.getMessage("optionSave")}
							</button>
						</div>
					</div>
				</div>
				<div className="bgext_options_warning">
					{chrome.i18n.getMessage("optionNavigationWarning")}
				</div>
			</>
		);
	};

	return (
		<div className="bgext_options_main">
			<div className="bgext_options_config_area">
				<div className="bgext_links_area">
					<div
						className={
							tabSelected === "hidden"
								? "bgext_link_selected"
								: "bgext_link"
						}
						href="#"
						selected={tabSelected === "hidden"}
						onClick={() => setTabSelected("hidden")}
					>
						{chrome.i18n.getMessage("optionHiddenTab")}
					</div>
					<div
						className={
							tabSelected === "navigation"
								? "bgext_link_selected"
								: "bgext_link"
						}
						href="#"
						selected={tabSelected === "navigation"}
						onClick={() => setTabSelected("navigation")}
					>
						{chrome.i18n.getMessage("optionNavigationTab")}
					</div>
				</div>
				{tabSelected === "hidden"
					? getHiddenConfiguration()
					: getNavigationConfiguration()}
			</div>
		</div>
	);
};

export default Options;
