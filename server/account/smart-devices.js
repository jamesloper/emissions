import { SmartAccounts, SmartDevices } from '../../imports/db';
import { ChamberlainAccount } from '../imports/myq';

Meteor.methods({
	'AddCaptureDevice': function({url, type, title}) {
		if (!this.userId) throw new Meteor.Error('login', 'You have to be logged in to add a capture device');

		SmartDevices.insert({
			'title': title,
			'type': type,
			'streamUrl': url,
			'userId': this.userId,
		});
	},
	'EditDevice': function({deviceId, title, streamUrl}) {
		SmartDevices.update(deviceId, {$set: {title, streamUrl}});
	},
	'DeleteDevice': function(deviceId) {
		SmartDevices.remove({'_id': deviceId});
	},
	'AddMyQAccount': function({username, password}) {
		const account = SmartAccounts.findOne({'auth.username': username, 'type': 'myq'});
		if (account) throw new Meteor.Error('account', 'Account already exists');
		const date = new Date();

		// Attempt login
		const myq = new ChamberlainAccount(username, password);

		// Insert to db if successful
		const accountId = SmartAccounts.insert({
			'type': 'myq',
			'userId': this.userId,
			'auth': {'type': 'password', 'username': username, 'password': password},
		});

		const devices = myq.devices();

		devices.forEach(device => {
			SmartDevices.upsert({'deviceId': device.serial_number}, {
				$set: {
					'type': 'myq',
					'accountId': accountId,
					'title': device.name,
					'rawState': device.state,
					'parentDeviceId': device.parent_device_id,
					'userId': this.userId,
					'updatedOn': date,
					'cloudUpdatedOn': new Date(device.state.last_status),
					'online': !!device.state.online,
				},
			});
		});
	},
	'RemoveAccount': function(accountId) {
		SmartDevices.remove({'accountId': accountId});
		SmartAccounts.remove({'_id': accountId});
	},
});