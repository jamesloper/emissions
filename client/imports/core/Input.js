import React from 'react';

export const TextInput = ({value, type, placeholder, onChange}) => {
	return (
		<input
			placeholder={placeholder}
			className="text"
			type={type}
			value={value}
			onChange={e => {
				e.stopPropagation();
				onChange(e.target.value);
			}}
		/>
	);
};

export const Select = ({options, value, onChangeValue}) => {
	const renderOption = (key) => <option value={key} children={options[key]}/>;
	return (
		<select
			children={Object.keys(options).map(renderOption)}
			onChange={e => onChangeValue(e.target.value)}
			value={value}
		/>
	);
};

export const SecondaryButton = ({title, loading, onClick}) => {
	return (
		<button type="submit" children={title} onClick={onClick} className="btn secondary" disabled={loading}/>
	);
};

export const Button = ({title, loading, onClick}) => {
	return (
		<button type="submit" children={title} onClick={onClick} className="btn" disabled={loading}/>
	);
};