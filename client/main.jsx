import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import { LoggedInView } from '/client/imports/pages/LoggedInView';
import LoggedOutView from './imports/pages/LoggedOutView';
import Toast from './imports/core/Toast';
import Modal from './imports/core/Modal';

const App = () => {
	const {user} = useTracker(() => {
		return {'user': Meteor.user()};
	});

	const renderBody = () => {
		if (user && user.emails) return <LoggedInView user={user}/>;
		return <LoggedOutView/>;
	};

	return (
		<Fragment>
			{renderBody()}
			<Toast/>
			<Modal/>
		</Fragment>
	);
};

Meteor.startup(() => {
	render(<App/>, document.getElementById('react-target'));
});
