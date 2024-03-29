import React, { useState } from 'react';
import { Window } from '../core/Window';
import { TextInput, Select, Button } from '../core/Input';
import { callMethod } from '../util/call';
import { closeModal } from '../core/Modal';

const typeOptions = {camera: 'Video Camera', desktop: 'Desktop'};

export const AddVideoCaptureDeviceModal = () => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [type, setType] = useState('camera');
	const [loading, setLoading] = useState('');

	const submit = () => callMethod('AddCaptureDevice', {
		'data': {url, type, title},
		'onLoading': setLoading,
		'onSuccess': closeModal,
	});

	return (
		<Window
			title="Add Video Capture Device"
			bottomComponent={<Button title="Connect" disabled={loading}/>}
			onSubmit={submit}
		>
			<div className="input-col">
				<TextInput placeholder="Name" value={title} onChange={setTitle}/>
				<TextInput placeholder="Stream URL" value={url} onChange={setUrl}/>
				<Select options={typeOptions} value={type} onChangeValue={setType}/>
			</div>
		</Window>
	);
};