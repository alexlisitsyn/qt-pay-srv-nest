import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter } from "events";

@Injectable()
export class BpmnListenerHelper {
	private readonly logger = new Logger(BpmnListenerHelper.name);

	// ToDo: refactor

	onActivityEnd = (elementApi) => {
		// console.log(">>> activity.end elementApi.id:", elementApi.id);

		if (elementApi.id === "endSkip")
			this.logger.log("!!! endSkip");

		if (elementApi.id === "endProcess")
			this.logger.log("!!! endProcess");
	};

	availableListeners = {
		'activity.end': this.onActivityEnd
	}

	async buildListeners(listenersNames: string[]) {
		if (!Array.isArray(listenersNames) || !listenersNames?.length)
			return null;

		const listener = new EventEmitter();
		listenersNames.forEach(listenersName => {
			const listenerHandler = this.availableListeners[listenersName]
			if (listenerHandler)
				listener.on(listenersName, listenerHandler);
		});

		return listener;
	}
}
