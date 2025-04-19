import { useEffect, useState } from "preact/hooks";
import { getFile } from "easy-file-picker";

import Configuration, { Game } from "../../config/configuration";
import { i18n } from "../../utils/browser";
import { OptionsView } from "../views/OptionsView";
import { useSyncedState } from "../hooks/useSyncedState";

const Options = (props: { config: Configuration }) => {
	const { config } = props;
	const [list, setList] = useState(config.getGamesList());
	const [selected, setSelected] = useState(list[0] as Game);
	const [changed, setChanged] = useState(false);
	const [text, setText] = useState("");
	const [css, setCss] = useState(config.getCustomCss());
	const [tabSelected, setTabSelected] = useState("general");
	const [troubleshootingMessage, setTroubleshootingMessage] = useState('');
	const [hasConfigChange, setConfigChange] = useSyncedState("configChange", false);

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
				"boardPanelText",
				"myPanel",
				"playerPanel",
				"playerPanelOffset",
				"bottomPanel",
				"bottomPanelOffset",
				"iconBackground",
				"iconBackgroundDark",
				"iconBorder",
				"iconBorderDark",
				"iconColor",
				"iconColorDark",
				"iconShadow",
				"iconShadowDark",
				"css",
			],
			2,
		);
	};

	useEffect(() => setText(serialize(selected)), [selected]);
	useEffect(() => setChanged(serialize(selected) !== text), [selected, text]);
	useEffect(() => {
		const newSelected = list.find((g) => g.name === selected.name);
		if (newSelected) {
			setSelected({ ...newSelected });
		} else {
			setSelected(list[0] as Game);
		}
	}, [list, selected.name]);

	const reset = () => {
		setList(config.resetGame(selected.name));
	};

	const save = () => {
		try {
			const game = JSON.parse(text);
			setList(config.saveGame(selected.name, game));
			setSelected(game);
		}
		catch (error) {
			window.location.reload();
		}
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

	const exportFile = (filename: string, json: string) => {
		const blob = new Blob([json], { type: "text/json" });
		const link = document.createElement("a");

		link.download = filename;
		link.href = window.URL.createObjectURL(blob);
		link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

		const evt = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});

		link.dispatchEvent(evt);
		link.remove()
	}

	const getTroubleshootingSection = () => {
		const setMessage = (msg: string) => {
			setTroubleshootingMessage(i18n(msg));
			setTimeout(() => setTroubleshootingMessage(''), 2000);
		};

		const exportClick = () => {
			exportFile('config.json', config.exportConfig());
			setMessage('configurationExported');
		};

		const importClick = () => {
			getFile({ acceptedExtensions: ['application/json'] }).then((file) => {
				if (file) {
					const reader = new FileReader();

					reader.onload = (event: any) => {
						const fileData = event.target.result as string;
						config.importConfig(fileData);
						setMessage('configurationImported');
					};

					reader.readAsText(file);
				}
			});
		};

		const resetClick = () => {
			config.resetConfig();
			setMessage('configurationRestored');
		};

		return (
			<>
				<div className="bgext_options_title">{i18n('troubleshooting')}</div>
				<div className="bgext_about_container">
					<div className="bgext_buttons_container">
						<button class={"appearance-auto"} onClick={exportClick}>{i18n('ConfigurationExport')}</button>
						<button class={"appearance-auto"} onClick={importClick}>{i18n('ConfigurationImport')}</button>
						<button class={"appearance-auto"} onClick={resetClick}>{i18n('ConfigurationReset')}</button>
					</div>
					<div className="bgext_buttons_container">{troubleshootingMessage}</div>
				</div>
			</>
		);
	};

	const getNavigationConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{i18n("optionNavigationTitle")}
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
								class={"appearance-auto w-100px"}
								onClick={duplicate}
							>
								{i18n("optionDuplicate")}
							</button>
							<button
								class={"appearance-auto w-100px"}
								disabled={!couldReset}
								onClick={reset}
							>
								{i18n("optionReset")}
							</button>
							<button
								class={"appearance-auto w-100px"}
								disabled={!couldDelete}
								onClick={reset}
							>
								{i18n("optionDelete")}
							</button>
							<button
								class={"appearance-auto w-100px"}
								disabled={!changed}
								onClick={save}
							>
								{i18n("optionSave")}
							</button>
						</div>
					</div>
				</div>
				<div className="bgext_options_warning">
					{i18n("optionNavigationWarning")}
				</div>
			</>
		);
	};

	const getCssConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{i18n("optionCssTitle")}
				</div>
				<div className="bgext_css_container">
					<textarea
						id="css_config"
						className="bgext_options_input"
						value={css}
						onChange={(evt) => setCss((evt.target as any).value)}
						onKeyUp={() => setCss((document.getElementById("css_config") as any).value)}
					/>
				</div>
				<div className="bgext_css_buttons">
					<button
						class={"appearance-auto w-100px"}
						onClick={() => config.setCustomCss(css).catch(_ => window.location.reload())}
					>
						{i18n("optionSave")}
					</button>
				</div>
			</>
		);
	};

	const getGeneralSection = () => {
		return <OptionsView config={config} onChange={() => setConfigChange(true)} />;
	};

	const getTab = (tabId: string, tabText: string) => {
		return (
			<div
				id={`bgext_options_tab_${tabId}`}
				className={
					tabSelected === tabId
						? "bgext_link_selected"
						: "bgext_link"
				}
				href="#"
				selected={tabSelected === tabId}
				onClick={() => setTabSelected(tabId)}
			>
				{tabText}
			</div>
		);
	};

	try {
		return (
			<div className="bgext_options_main">
				<div className="bgext_options_config_area">
					<div className="bgext_links_area">
						{getTab("general", i18n("optionGeneralTab"))}
						{getTab("navigation", i18n("optionNavigationTab"))}
						{getTab("css", i18n("optionCssTab"))}
						{getTab("troubleshooting", i18n("troubleshooting"))}
					</div>
					{tabSelected === "general" && getGeneralSection()}
					{tabSelected === "navigation" && getNavigationConfiguration()}
					{tabSelected === "css" && getCssConfiguration()}
					{tabSelected === "troubleshooting" && getTroubleshootingSection()}
				</div>
			</div>
		);
	}
	catch (error) {
		window.location.reload();
		return <></>;
	}
};

export default Options;
