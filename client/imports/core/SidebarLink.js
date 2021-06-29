import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

export const SidebarLink = ({to, title, icon}) => {
	return (
		<NavLink exact to={to}>
			<Icon name={icon}/> {title}
		</NavLink>
	);
};