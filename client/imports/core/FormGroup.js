import React from 'react';
import { Button } from './Input';

export const FormGroup = ({title, buttonText, onClickButton, children}) => {
	return (
		<div className="form-group">
			{title ? (
				<div className="form-group-top">
					<h2>{title}</h2>
					<Button title={buttonText} onClick={onClickButton}/>
				</div>) : null}
			{children}
		</div>
	);
};