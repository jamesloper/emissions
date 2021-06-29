import React from 'react';
import { CameraView } from '../core/CameraView';
import { useTracker } from 'meteor/react-meteor-data';
import { SmartDevices } from '../../../imports/db';
import Spinner from '../core/Spinner';

export const DesktopsPage = () => {
	const {ready, smartDevices} = useTracker(() => {
		return {
			'ready': Meteor.subscribe('SmartDevices').ready(),
			'smartDevices': SmartDevices.find({'type': 'desktop'}).fetch(),
		};
	}, []);

	if (!ready) return <Spinner/>;

	const renderDevice = (device) => {
		return <CameraView key={device._id} title={device.title || device.streamUrl} url={device.streamUrl}/>;
	};

	return (
		<div className="page-container">
			<div className="card-grid">
				{smartDevices.map(renderDevice)}
			</div>
		</div>
	);
};