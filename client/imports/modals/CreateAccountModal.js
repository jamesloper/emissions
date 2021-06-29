import React, { useState } from 'react';
import { toast } from '../core/Toast';
import { closeModal } from '../core/Modal';
import { Button, TextInput } from '../core/Input';
import { Window } from '../core/Window';

export const CreateAccountModal = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('');

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		Accounts.createUser({email, password}, (err) => {
			setLoading(false);
			if (err) return toast(err.reason);
			closeModal();
		});
	};

	return (
		<Window
			title="Create Account"
			onSubmit={submit}
			bottomComponent={<Button disabled={loading} title="Submit" onClick={submit}/>}
		>
			<div className="input-col">
				<TextInput
					placeholder="Email"
					type="email"
					value={email}
					onChange={setEmail}
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