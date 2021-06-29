import React from 'react';

export const Icon = ({name, color, onClick}) => {
	return (
		<i
			className={`material-icons md-${name}`}
			style={{color: color}}
			onClick={onClick}
			children={name || 'extension'}
		/>
	);
};