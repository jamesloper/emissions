import { deviceEvents } from '../imports/deviceEvents';
import { Events } from '../../imports/db';

deviceEvents.on('change', (device, status) => {
	Events.insert({
		'deviceId': device._id,
		'userId': device.userId,
		'status': status,
		'date': new Date(),
	});
});