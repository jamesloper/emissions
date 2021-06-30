import React, { useState } from 'react';
import { Window } from '../core/Window';
import { Button, TextInput } from '../core/Input';
import { callMethod } from '../util/call';
import { closeModal } from '../core/Modal';

export const EditSmartDeviceModal = ({device}) => {
	const [title, setTitle] = useState(device.title);
	const [streamUrl, setStreamUrl] = useState(device.streamUrl);
	const [loading, setLoading] = useState(false);

	const submit = () => callMethod('EditDevice', {
		'data': {'deviceId': device._id, title, streamUrl},
		'onLoading': setLoading,
		'onSuccess': closeModal,
	});

	const pressDelete = (e) => callMethod('DeleteDevice', {
		'event': e,
		'data': device._id,
		'onLoading': setLoading,
		'onSuccess': closeModal,
	});

	return (
		<Window
			title="Edit Video Device"
			bottomComponent={
				<div className="btn-column">
					<Button title="Submit" disabled={loading}/>
					<Button title="Delete" disabled={loading} onClick={pressDelete}/>
				</div>
			}
			onSubmit={submit}
		>
			<div className="input-col">
				<TextInput placeholder="Device Title" value={title} onChange={setTitle}/>
				<TextInput placeholder="Stream URL" value={streamUrl} onChange={setStreamUrl}/>
			</div>
		</Window>
	);
};