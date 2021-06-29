import { PhoneLog, SmartAccounts, SmartDevices } from '../imports/db';

Meteor.publish('SmartDevices', function () {
	if (!this.userId) return null;
	return [
		SmartDevices.find({'userId': this.userId}),
		SmartAccounts.find({'userId': this.userId}),
	];
});

Meteor.publish('PhoneLog', function () {
	if (!this.userId) return null;
	return PhoneLog.find({'userId': this.userId});
});