import React from 'react';
import { showModal } from '../core/Modal';
import { ConfirmModal } from '../modals/ConfirmModal';

export const callMethod = (methodName, opts = {}) => {
	if (opts.confirm) {
		showModal(<ConfirmModal message={opts.confirm} method={methodName} data={opts.data}/>)
		return;
	}
	if (opts.onLoading) opts.onLoading(true);
	Meteor.call(methodName, opts.data, (err, res) => {
		if (opts.onLoading) opts.onLoading(false);
		if (err) return console.warn(err);
		if (opts.onSuccess) opts.onSuccess(res);
	})
};