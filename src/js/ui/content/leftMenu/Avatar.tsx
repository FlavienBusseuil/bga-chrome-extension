import React from "preact";

interface AvatarProps {
	backColor: string;
	borderColor: string;
	shadowColor: string;
	onMouseOver?: () => void;
	onMouseOut?: () => void;
	children: React.ComponentChildren;
}

const Avatar = (props: AvatarProps) => {
	const style = {
		border: `3px solid ${props.borderColor}`,
		boxShadow: `0px 0px 10px 0px ${props.shadowColor}`,
		backgroundColor: props.backColor,
	};

	return (
		<div
			className="bgext_avatar"
			style={style}
			onMouseOver={props.onMouseOver}
			onMouseOut={props.onMouseOut}
		>
			{props.children}
		</div>
	);
};

export default Avatar;
