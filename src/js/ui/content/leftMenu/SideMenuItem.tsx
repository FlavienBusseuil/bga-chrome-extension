
import React from "preact";

interface SideMenuItemProps {
	onClick: () => void;
	children: React.ComponentChildren;
}

const SideMenuItem = (props: SideMenuItemProps) => {
	return (
		<div className="bgext_side_menu_item" onClick={props.onClick}>
			{props.children}
		</div>
	);
};

export default SideMenuItem;
