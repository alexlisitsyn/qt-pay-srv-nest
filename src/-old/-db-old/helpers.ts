// import {pool} from "./index";
// import LoggerService from "../services/logger-service";
//
// const Logger = LoggerService.Instance;
//
// exports.updateById = async <T extends any[] = any[]>(table: string, params: T, id: number) => {
// 	let paramArray = [];
// 	let paramStr = '';
// 	let cnt = 0;
// 	for (const key in params) {
// 		cnt++;
// 		paramStr += `,"${key}"=$${cnt}`;
// 		paramArray.push(params[key]);
// 	}
//
// 	cnt++;
// 	paramArray.push(id);
// 	const queryStr: string = `update "${table}" set ` + paramStr.substring(1) + ` where "id" = $${cnt}`;
//
// 	return await pool.query(queryStr, paramArray);
// };
//
// exports.findAll = async (table: string, limit: number = 0, offset: number = 0, where: string = '') => {
// 	Logger.warn('>> findAll ToDo !!');
// };
//
// exports.insertOne = async <T extends any[] = any[]>(table: string, params: T, returnFields = 'id') => {
// 	let cnt = 0;
// 	let columns: any[] = [];
// 	let masks: string[] = [];
// 	let values: any[] = [];
//
// 	for (const key in params) {
// 		cnt++;
// 		columns.push(key);
// 		masks.push(`$${cnt}`);
// 		values.push(params[key]);
// 	}
//
// 	const queryStr = `insert into "${table}" (${columns.join(',')})
//                     values (${masks.join(',')}) ${returnFields ? ` returning ${returnFields}` : ''}`;
//
// 	return await pool.query(queryStr, values);
// };
//
// // массив param меняется в самом объекте, итоговый query возвращается функцией
// exports.addLimitOffset = (limit: number, offset: number, query: string, param: any[] = []) => {
// 	let cnt: number = param.length;
//
// 	if (limit) {
// 		cnt++;
// 		query += ` limit $${cnt}`;
// 		param.push(limit);
// 	}
//
// 	if (offset) {
// 		cnt++;
// 		query += ` offset $${cnt}`;
// 		param.push(offset);
// 	}
//
// 	return query;
// };
//
// export default exports;
