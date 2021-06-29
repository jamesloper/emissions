import React, { useState } from 'react';
import { Logo } from '../core/Logo';
import { Button, TextInput } from '../core/Input';
import { toast } from '../core/Toast';
import { showModal } from '../core/Modal';
import { CreateAccountModal } from '../modals/CreateAccountModal';

const LoggedOutView = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = (e) => {
		e.preventDefault();
		Meteor.loginWithPassword(email, password, (err) => {
			if (err) toast(err.reason);
		});
	};

	const clickCreateAccount = (e) => {
		e.preventDefault();
		showModal(<CreateAccountModal/>);
	};

	return (
		<div className="landing-page">
			<Logo/>
			<form className="login-form input-col" onSubmit={login}>
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
				<Button title="Login"/>
				<Button title="Create Account" onClick={clickCreateAccount}/>
			</form>
		</div>
	);
};

export default LoggedOutView;