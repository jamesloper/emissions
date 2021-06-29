import React from 'react';
import { DateTime } from 'luxon';
import { PhoneLog } from '../../../imports/db';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Spinner from '../core/Spinner';

export const PhoneLogPage = () => {
	const {ready, events} = useTracker(() => {
		return {
			'ready': Meteor.subscribe('PhoneLog').ready(),
			'events': PhoneLog.find().fetch(),
		};
	});

	if (!ready) return <Spinner/>;

	const renderCall = () => {
		return (
			<tr key={123}>
				<td>{DateTime.local().toLocaleString(DateTime.DATETIME_MED)}</td>
				<td>404-949-2999</td>
				<td>Yes</td>
				<td>32s</td>
			</tr>
		);
	};

	return (
		<div className="page-container">
			<div className="phone-log">
				{events.length ? (
					<table className="table">
						<thead>
						<tr>
							<th>Time</th>
							<th>From</th>
							<th>Answered</th>
							<th>Duration</th>
						</tr>
						</thead>
						<tbody children={events.map(renderCall)}/>
					</table>
				) : (
					<div className="placeholder">No phone log events</div>
				)}
			</div>
		</div>
	);
};