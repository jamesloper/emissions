import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PhoneLog, SmartAccounts } from '../../../imports/db';

export const restTwilio = (req, res) => {
	console.log('INCOMING TWILIO:', res.query);

	const account = SmartAccounts.findOne({
		'type': 'twilio',
		'auth': {'sid': res.AccountSid},
	});

	PhoneLog.insert({
		'twilioId': res.CallSid,
		'from': res.From,
		'to': res.To,
		'date': new Date(),
		'callerId': res.CallerName,
		'city': `${res.FromCity}, ${res.FromState}`,
		'zip': res.FromZip,
	});

	const component = (
		<response>
			<play>{account.twilio.messageUrl || 'https://chestnut-drever-2371.twil.io/assets/emissions.mp3'}</play>
			<dial>{account.twilio.forwardNumber || '+14046639113'}</dial>
		</response>
	);

	res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
	ReactDOMServer.renderToStaticNodeStream(component).pipe(res);
};