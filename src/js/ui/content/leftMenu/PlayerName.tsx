import React from "preact";

interface PlayerNameProps {
	backColor: string;
	borderColor: string;
	shadowColor: string;
	textColor: string;
	hover: boolean;
	children: React.ComponentChildren;
}

const PlayerName = (props: PlayerNameProps) => {
	const style = {
		backgroundColor: props.backColor,
		border: `3px solid ${props.borderColor}`,
		color: props.textColor,
		boxShadow: `0px 0px 10px 0px ${props.shadowColor}`,
		paddingLeft: props.hover ? "40px" : "0px",
		paddingRight: props.hover ? "16px" : "0px",
		width: props.hover ? "auto" : "0px",
		visibility: props.hover ? "visible" : "hidden",
	};

	return (
		<div className="bgext_player_name" style={style}>
			{props.children}
		</div>
	);
};

export default PlayerName;
