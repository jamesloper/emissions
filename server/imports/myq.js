import MyQ from 'myq-api';

const {wrapAsync} = Meteor, logins = {};

export class ChamberlainAccount {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.api = logins[username] || this.login();
	}

	login = wrapAsync(async (callback) => {
		try {
			const account = new MyQ();
			await account.login(this.username, this.password);
			logins[this.username] = account;
			callback(null, account);
		} catch (err) {
			callback(err);
		}
	});

	devices = wrapAsync(async (callback) => {
		try {
			const devicesRes = await this.api.getDevices();
			callback(null, devicesRes.devices);
		} catch (err) {
			delete logins[this.username];
		}
	});
}

