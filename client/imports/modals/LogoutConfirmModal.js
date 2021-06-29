import React from 'react';
import { Window } from '../core/Window';
import { Button } from '../core/Input';

export const LogoutConfirmModal = () => {
	return (
		<Window
			title="Logout"
			bottomComponent={<Button title="Yes" onClick={Meteor.logout}/>}
		>
			Are you sure?
		</Window>
	);
};