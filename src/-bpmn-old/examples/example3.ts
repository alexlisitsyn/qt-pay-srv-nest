import {getFileContent} from "../../common/file-helper";
import * as path from "path";

const {Engine} = require('bpmn-engine');

const filePath = path.join(__dirname, '../../../bpmn-xml/account-balance.bpmn');
const source = getFileContent(filePath);

export const engine = new Engine({
	name: 'check balance flow',
	source,
	moddleOptions: {
		camunda: require('camunda-bpmn-moddle/resources/camunda')
	},
	extensions: {
		saveToResultVariable(activity) {
			if (!activity.behaviour.resultVariable)
				return;

			activity.on('end', ({environment, content}) => {
				// console.log('!!! activity on end:', activity.id);
				environment.output[activity.behaviour.resultVariable] = content.output[0];
				// environment.variables[activity.behaviour.resultVariable] = content.output[0];
			});
		},
	}
});

