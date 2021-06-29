import React, { useRef, useEffect, useState } from 'react';
import { SimpleEmitter } from '../util/emitter';

const showBus = new SimpleEmitter();

const Modal = () => {
	const [modal, setModal] = useState(null);
	const el = useRef();

	useEffect(() => {
		const change = (modal) => {
			try {
				if (modal) {
					el.current.showModal();
				} else {
					el.current.close();
				}
			} catch (err) {
			}
			setModal(modal);
		};
		showBus.on(change);
		return () => showBus.off(change);
	}, [modal]);

	return (
		<dialog open={false} ref={el} onClick={closeModal}>
			<div className="modal-container" children={modal} onClick={e => e.stopPropagation()}/>
		</dialog>
	);
};

export const showModal = (el) => showBus.emit(el);
export const closeModal = () => showBus.emit(null);
export default Modal;