import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SmartAccounts, SmartDevices } from '../../../imports/db';
import Spinner from '../core/Spinner';
import { showModal } from '../core/Modal';
import { AddSmartAccountModal } from '../modals/AddSmartAccountModal';
import { FormGroup } from '../core/FormGroup';
import { AddVideoCaptureDeviceModal } from '../modals/AddVideoCaptureDeviceModal';
import { Card } from '../core/Card';
import { Icon } from '../core/Icon';
import { EditSmartDeviceModal } from '../modals/EditSmartDeviceModal';
import { callMethod } from '../util/call';

export const IntegrationsPage = () => {
	const {ready, smartAccounts, smartDevices} = useTracker(() => {
		return {
			'ready': Meteor.subscribe('SmartDevices').ready(),
			'smartAccounts': SmartAccounts.find().fetch(),
			'smartDevices': SmartDevices.find().fetch(),
		};
	}, []);

	if (!ready) return <Spinner/>;

	const renderAccount = (account) => {
		const devices = smartDevices.filter(r => r.accountId === account._id);

		const removeAccount = () => callMethod('RemoveAccount', {
			'confirm': 'Are you sure you want to remove the account?',
			'data': account._id,
		});

		return (
			<Card
				title={account.type}
				key={account._id}
				help={account.auth.username}
				RightComponent={<Icon name="close" onClick={removeAccount}/>}
			>
				<div className="smart-account-devices" children={devices.map(renderDevice)}/>
			</Card>
		);
	};

	const renderDevice = (device) => {
		return (
			<div className="smart-account-device" key={device._id} title={device.deviceId || "Unnamed Device"}>
				<Icon
					name="stop_circle"
					color={device.online ? 'green' : 'red'}
				/>
				<span>{device.title}</span>
			</div>
		);
	};

	const renderOther = (device) => {
		return (
			<Card
				key={device._id}
				title={device.title || device.streamUrl}
				RightComponent={<Icon name="edit" onClick={() => showModal(<EditSmartDeviceModal device={device}/>)}/>}
			>
				<div>Type: {device.type}</div>
				<div>Url: <a target="_blank" href={device.streamUrl}>{device.streamUrl}</a></div>
			</Card>
		);
	};

	const otherDevices = smartDevices.filter(r => !r.accountId);
	return (
		<div className="page-container integrations-page">
			<FormGroup
				title="Accounts"
				buttonText={<Icon name="add"/>}
				onClickButton={() => showModal(<AddSmartAccountModal/>)}
			>
				{smartAccounts.length ? (
					<div className="card-grid" children={smartAccounts.map(renderAccount)}/>
				) : (
					<div className="placeholder">No accounts</div>
				)}
			</FormGroup>
			<FormGroup
				title="Video Devices"
				buttonText={<Icon name="add"/>}
				onClickButton={() => showModal(<AddVideoCaptureDeviceModal/>)}
			>
				{otherDevices.length ? (
					<div className="card-grid" children={otherDevices.map(renderOther)}/>
				) : (
					<div className="placeholder">No other devices</div>
				)}
			</FormGroup>
		</div>
	);
};