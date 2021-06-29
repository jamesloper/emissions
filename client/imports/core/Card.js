import React from 'react';

export const Card = ({title, children, help, RightComponent}) => {
	return (
		<div className="card">
			{title ? (
				<div className="card-title">
					<span>{title}</span>
					{RightComponent}
				</div>
			) : null}
			<div className="card-body">
				{help ? <div className="card-help">{help}</div> : null}
				{children}
			</div>
		</div>
	);
};