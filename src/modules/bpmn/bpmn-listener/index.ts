import { EventEmitter } from "events";
import {onActivityEnd} from './bpmn-listener';

const availableListeners = {
	'activity.end': onActivityEnd
}

// ToDo: refactor to class
//  add logs

async function buildListeners(listenersNames: string[]) {
	if (!Array.isArray(listenersNames) || !listenersNames?.length)
		return null;

	const listener = new EventEmitter();
	listenersNames.forEach(listenersName => {
		const listenerHandler = availableListeners[listenersName]
		if (listenerHandler)
			listener.on(listenersName, listenerHandler);
	});

	return listener;
}

export {
	buildListeners,
	onActivityEnd,
}
