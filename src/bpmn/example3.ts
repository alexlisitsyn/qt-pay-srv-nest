import {getFileContent} from "./file-helper";
import * as path from "path";

const {Engine} = require('bpmn-engine');

// async function getRequest(scope, callback) {
// 	try {
// 		var result = await getJson(scope.environment.variables.apiPath); // eslint-disable-line no-var
// 	} catch (err) {
// 		return callback(null, err);
// 	}
//
// 	return callback(null, result);
// }

// const source = `
// <?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/bpmn">
//   <process id="theProcess" isExecutable="true">
// 	  <startEvent id="theStart" />
// 	  <serviceTask id="getBalance" implementation="\${environment.services.getBalance}" camunda:resultVariable="balance" />
// 	  <exclusiveGateway id="checkBalance" default="flow3" />
// 	  <endEvent id="endSkip" />
// 	  <endEvent id="endProcess" />
//
// 	  <sequenceFlow id="flow1" sourceRef="theStart" targetRef="getBalance" />
// 	  <sequenceFlow id="flow2" sourceRef="getBalance" targetRef="checkBalance" />
//
// 	  <sequenceFlow id="flow3" sourceRef="checkBalance" targetRef="endSkip" />
// 	  <sequenceFlow id="flow4" sourceRef="checkBalance" targetRef="endProcess">
//       <conditionExpression xsi:type="tFormalExpression">
//       	\${environment.services.checkBalance(environment.output.balance)}
//       </conditionExpression>
//     </sequenceFlow>
//
//   </process>
// </definitions>`;

// ${environment.services.isCheck(environment.variables.balance, 5000)}


const filePath = path.join(__dirname, '../../bpmn-xml/example3.xml');
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

// engine.execute({
// 	variables: {
// 		apiPath: 'https://example.com/test'
// 	},
// 	services: {
// 		getRequest,
// 	}
// }, (err, execution) => {
// 	if (err) throw err;
//
// 	console.log('Service task output:', execution.environment.output.serviceResult);
// });
