export interface IEngine {
	name: string;
	engine: any;
}

export interface IBpmnActivity {
	run(params: any);
}

// ToDo: replace any
export interface IBpmnOptions {
	variables: any;
	listeners: any;
}

export interface IBpmn {
	name: string;
	schema: string; // source: bpmn scheme content (xml)
	options: IBpmnOptions;
	active: boolean;
	created_ts: Date;
	updated_ts: Date;
}
