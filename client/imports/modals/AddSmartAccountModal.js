import React, { useState } from 'react';
import { Window } from '../core/Window';
import { Button, TextInput } from '../core/Input';
import { closeModal, showModal } from '../core/Modal';
import { callMethod } from '../util/call';

export const AddSmartAccountModal = () => {
	return (
		<Window title="Add Smart Account">
			<div className="smart-account-picker">
				<div className="smart-account" onClick={() => showModal(<AddTwilioAccountModal/>)}>
					<img src="/smart/twilio.svg"/>
				</div>
				<div className="smart-account" onClick={() => showModal(<AddMyQAccountModal/>)}>
					<img src="/smart/myq.svg"/>
				</div>
				<div className="smart-account">
					<img src="/smart/wyze.svg"/>
				</div>
			</div>
		</Window>
	);
};

export const AddMyQAccountModal = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const submit = () => callMethod('AddMyQAccount', {
		'data': {username, password},
		'onLoading': setLoading,
		'onSuccess': closeModal,
	});

	return (
		<Window
			bottomComponent={<Button title="Login" disabled={loading}/>}
			onSubmit={submit}
		>
			<img src="/smart/myq.svg" width={50}/>
			<div className="input-col">
				<TextInput
					placeholder="Username"
					type="email"
					value={username}
					onChange={setUsername}
				/>
				<TextInput
					placeholder="Password"
					type="password"
					value={password}
					onChange={setPassword}
				/>
			</div>
		</Window>
	);
};

export const AddTwilioAccountModal = () => {
	const [sid, setSid] = useState('');
	const [loading, setLoading] = useState(false);

	const submit = () => callMethod('AddTwilioAccount', {
		'data': {sid},
		'onLoading': setLoading,
		'onSuccess': closeModal,
	});

	return (
		<Window
			bottomComponent={<Button title="Connect" disabled={loading}/>}
			onSubmit={submit}
		>
			<img src="/smart/twilio.svg" width={50}/>
			<div className="input-col">
				<TextInput
					placeholder="SID"
					value={sid}
					onChange={setSid}
				/>
			</div>
		</Window>
	);
};