import React, { useState } from 'react';
import { Button } from '../core/Input';
import { Window } from '../core/Window';
import { callMethod } from '../util/call';

export const ConfirmModal = ({message, method, data}) => {
	const [loading, setLoading] = useState(false);

	const submit = () => callMethod(method, {data, 'onStatus': setLoading});

	return (
		<Window
			onSubmit={submit}
			children={message}
			bottomComponent={<Button disabled={loading} title="Totally Sure" onClick={submit}/>}
		/>
	);
};