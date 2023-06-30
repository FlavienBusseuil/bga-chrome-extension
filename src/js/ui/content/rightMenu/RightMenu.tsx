import React from "preact";
import { useEffect, useState } from "preact/hooks";
import "../../../../css/rightMenu.css";

const RightMenu = () => {
	const [logVisible, setLogVisible] = useState(true);
	const [scoreVisible, setScoreVisible] = useState(true);

	const scoreContent = document.getElementById("right-side-first-part");
	const logContent = document.getElementById("right-side-second-part");

	const setMenuPosition = () => {
		const menuHeader = document.getElementById("cde-floating-menu-score");
		const height = window.innerHeight;

		if (menuHeader && scoreContent && logContent) {
			const rect = menuHeader.getBoundingClientRect();
			const maxHeight = height - rect.top - 40;
			logContent.style.top = `${rect.top + 35}px`;
			logContent.style.maxHeight = `${maxHeight}px`;
			scoreContent.style.top = logContent.style.top;
			scoreContent.style.maxHeight = logContent.style.maxHeight;
			scoreContent.style.width =
				scoreContent.scrollHeight > maxHeight ? "260px" : "240px";
		} else {
			setTimeout(setMenuPosition, 100);
		}
	};

	const onClick = (evt: any) => {
		try {
			const eltId = evt.target.id || evt.target.parentNode.id;
			if (eltId === "cde-floating-menu-log") {
				toggleLogVisible();
			} else if (eltId === "cde-floating-menu-score") {
				toggleScoreVisible();
			}
		} catch (error) { }
	};

	useEffect(() => {
		if (scoreContent) {
			scoreContent.style.right = scoreVisible ? "5px" : "-500px";
		}
	}, [scoreContent, scoreVisible]);

	useEffect(() => {
		if (logContent) {
			logContent.style.right = logVisible ? "5px" : "-500px";
		}
	}, [logContent, logVisible]);

	useEffect(() => {
		setLogVisible(false);
		setScoreVisible(false);
	}, []);

	useEffect(() => {
		setMenuPosition();
		window.addEventListener("resize", setMenuPosition);
		window.addEventListener("scroll", setMenuPosition);
		document.addEventListener("click", onClick);
		return () => {
			window.removeEventListener("resize", setMenuPosition);
			window.removeEventListener("scroll", setMenuPosition);
			document.removeEventListener("click", onClick);
		};
	});

	const toggleLogVisible = () => {
		if (logVisible) {
			setLogVisible(false);
		} else {
			setLogVisible(true);
			setScoreVisible(false);
			setMenuPosition();
		}
	};

	const toggleScoreVisible = () => {
		if (scoreVisible) {
			setScoreVisible(false);
		} else {
			setScoreVisible(true);
			setLogVisible(false);
			setMenuPosition();
		}
	};

	return (
		<>
			<div
				id="cde-floating-menu-log"
				className="bgext_right_menu bgabutton bgabutton_gray"
				active={logVisible}
			>
				<i className="fa fa-book" style={{ color: "#000000" }}></i>
				{logVisible && (
					<i
						className="fa fa-caret-up"
						style={{ color: "#000000" }}
					></i>
				)}
				{!logVisible && (
					<i
						className="fa fa-caret-down"
						style={{ color: "#000000" }}
					></i>
				)}
			</div>
			<div
				id="cde-floating-menu-score"
				className="bgext_right_menu bgabutton bgabutton_gray"
				active={scoreVisible}
			>
				<i
					className="fa fa-star"
					style={{ width: "14px", height: "14px" }}
				></i>
				{scoreVisible && (
					<i
						className="fa fa-caret-up"
						style={{ color: "#000000" }}
					></i>
				)}
				{!scoreVisible && (
					<i
						className="fa fa-caret-down"
						style={{ color: "#000000" }}
					></i>
				)}
			</div>
		</>
	);
};

export default RightMenu;
