import { SmartAccounts, SmartDevices } from '../../imports/db';
import { ChamberlainAccount } from '../imports/myq';
import { deviceEvents } from '../imports/deviceEvents';

const pollGarageDoors = () => {
	console.log('Checking on the garage doors...');
	SmartAccounts.find({type: 'myq'}).forEach(account => {
		const devices = SmartDevices.find({'accountId': account._id}).fetch();
		const myq = new ChamberlainAccount(account.auth.username, account.auth.password);
		myq.devices().filter(r => r.device_type === 'garagedooropener').forEach(myqDevice => {
			console.log('MyQ:', myqDevice);
			const newStatus = myqDevice.state.door_state;
			const device = devices.find(r => r.deviceId === myqDevice.serial_number);
			if (!device) { // device was removed from smart account
				deviceEvents.emit('removed', device);
			} else if (newStatus !== device.status) {
				SmartDevices.update(device._id, {$set: {'status': newStatus}});
				deviceEvents.emit('change', device, newStatus);
			}
		});
	});
};

Meteor.setInterval(pollGarageDoors, 60000);
// Meteor.startup(pollGarageDoors);