import { useState, useEffect } from 'react'

export function isFullScreenElement(el) {
	if (el && el.current) {
		return Boolean(
			document.fullscreenElement === el.current ||
			document.mozFullScreenElement === el.current ||
			document.webkitFullscreenElement === el.current ||
			document.msFullscreenElement === el.current,
		);
	}

	return Boolean(
		document.fullscreenElement ||
		document.mozFullScreenElement ||
		document.webkitFullscreenElement ||
		document.msFullscreenElement ||
		document.fullscreen ||
		document.mozFullScreen ||
		document.webkitIsFullScreen ||
		document.fullScreenMode,
	);
}

export function useFullScreen(fsEl) {
	const initialState = isFullScreenElement(fsEl);
	const [fullScreen, setFullScreen] = useState(initialState);

	// access various open fullscreen methods
	function openFullScreen() {
		const el = (fsEl && fsEl.current) || document.documentElement

		if (el.requestFullscreen) return el.requestFullscreen()
		if (el.mozRequestFullScreen) return el.mozRequestFullScreen()
		if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen()
		if (el.msRequestFullscreen) return el.msRequestFullscreen()
	}

	// access various exit fullscreen methods
	function closeFullScreen() {
		if (document.exitFullscreen) return document.exitFullscreen()
		if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
		if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
		if (document.msExitFullscreen) return document.msExitFullscreen()
	}

	useEffect(() => {
		function handleChange() {
			setFullScreen(isFullScreenElement(fsEl));
		}

		document.addEventListener('webkitfullscreenchange', handleChange, false);
		document.addEventListener('mozfullscreenchange', handleChange, false);
		document.addEventListener('msfullscreenchange', handleChange, false);
		document.addEventListener('MSFullscreenChange', handleChange, false);
		document.addEventListener('fullscreenchange', handleChange, false);

		return () => {
			document.removeEventListener('webkitfullscreenchange', handleChange);
			document.removeEventListener('mozfullscreenchange', handleChange);
			document.removeEventListener('msfullscreenchange', handleChange);
			document.removeEventListener('MSFullscreenChange', handleChange);
			document.removeEventListener('fullscreenchange', handleChange);
		};
	}, [fsEl])

	return {
		fullScreen,
		toggle: fullScreen ? closeFullScreen : openFullScreen,
	};
};