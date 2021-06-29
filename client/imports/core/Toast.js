import React, { useState, useEffect } from 'react';
import { SimpleEmitter } from '../util/emitter';

const bus = new SimpleEmitter();

const Toast = () => {
	const [message, setMessage] = useState('');

	useEffect(() => {
		bus.on(setMessage);
		return () => bus.off(setMessage);
	}, []);

	useEffect(() => {
		if (!message) return;
		const timeout = setTimeout(() => setMessage(''), 2000);
		return () => clearTimeout(timeout);
	}, [message]);

	return (
		<div className="toast-container">
			{message ? <div className="toast" children={message}/> : null}
		</div>
	);
};

export const toast = (message) => bus.emit(message);

export default Toast;