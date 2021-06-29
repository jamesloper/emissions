import React, { useState, useRef } from 'react';
import { Icon } from './Icon';
import { useFullScreen } from '../util/fullscreen';
import { Card } from './Card';

export const CameraView = ({title, url}) => {
	const [error, setError] = useState(null);
	const el = useRef();
	const {fullScreen, toggle} = useFullScreen(el);

	return (
		<Card
			title={title}
			RightComponent={<Icon name={fullScreen ? 'fullscreen_exit' : 'fullscreen'} onClick={toggle}/>}
		>
			{error ? (
				<div className="placeholder">OFFLINE</div>
			) : (
				<img src={url} className="camera-view" ref={el} onError={setError}/>
			)}
		</Card>
	);
};