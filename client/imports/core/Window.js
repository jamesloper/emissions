import React from 'react';

export const Window = ({children, bottomComponent, title, onSubmit}) => {
	const submit = (e) => {
		e.preventDefault();
		onSubmit();
	};
	return (
		<form className="window" onSubmit={submit}>
			{title ? <div className="window-title" children={title}/> : null}
			<div className="window-body" children={children}/>
			{bottomComponent ? <div className="window-bottom" children={bottomComponent}/> : null}
		</form>
	);
};