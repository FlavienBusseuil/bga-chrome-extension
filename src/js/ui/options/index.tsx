import { useState } from "preact/hooks";
import { getFile } from "easy-file-picker";

import { i18n } from "../../utils/browser/i18n";
import { OptionsView } from "../views/OptionsView";
import { Tabs } from "../base/Tabs";
import { Tab } from "../base/Tab";
import { useSyncedState } from "../hooks/useSyncedState";
import { useLocale } from "../hooks/useLocale";
import type ConfigurationWithGames from "../../config/configurationWithGames";

const Options = (props: { config: ConfigurationWithGames }) => {
	const { config } = props;
	const [css, setCss] = useState(config.getCustomCss());
	const [tabSelected, setTabSelected] = useState("general");
	const [troubleshootingMessage, setTroubleshootingMessage] = useState('');
	const [, setConfigChange] = useSyncedState("configChange", false);
	const locale = useLocale(config.getLocale());

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
		link.remove();
		// the download has started: the file content can be released
		setTimeout(() => window.URL.revokeObjectURL(link.href), 1000);
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
						config.importConfig(fileData)
							.then(() => setMessage('configurationImported'))
							.catch((error) => {
								console.error("[bga extension] Configuration import failed", error);
								setMessage('configurationImportFailed');
							});
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
						<button class="native-button" onClick={exportClick}>{i18n('configurationExport')}</button>
						<button class="native-button" onClick={importClick}>{i18n('configurationImport')}</button>
						<button class="native-button" onClick={resetClick}>{i18n('configurationReset')}</button>
					</div>
					<div className="bgext_buttons_container">{troubleshootingMessage}</div>
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
						onInput={(evt) => setCss((evt.target as HTMLTextAreaElement).value)}
					/>
				</div>
				<div className="bgext_css_buttons">
					<button
						class="native-button"
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

	// Same tabs as the popup
	const getTab = (tabId: string, tabText: string) => {
		return (
			<Tab k={tabId} fullWidth={true} isActive={tabSelected === tabId} onClick={setTabSelected}>
				{tabText}
			</Tab>
		);
	};

	return (
		<div className="bgext_options_main">
			<div className="bgext_options_config_area">
				<div key={`options_${locale}`} className="bgext_links_area">
					<Tabs>
						{getTab("general", i18n("optionGeneralTab"))}
						{getTab("css", i18n("optionCssTab"))}
						{getTab("troubleshooting", i18n("troubleshooting"))}
					</Tabs>
				</div>
				{tabSelected === "general" && getGeneralSection()}
				{tabSelected === "css" && getCssConfiguration()}
				{tabSelected === "troubleshooting" && getTroubleshootingSection()}
			</div>
		</div>
	);
};

export default Options;
