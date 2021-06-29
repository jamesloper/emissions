export class SimpleEmitter {
	listeners = [];
	on = (fn) => this.listeners.push(fn);
	emit = (payload) => this.listeners.forEach(fn => fn(payload));
	off = (fn) => this.listeners = this.listeners.filter(i => i !== fn);
};