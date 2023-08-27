// import {QueryResult} from "pg";
// import {pool} from "./index";
// import config from "../config";
// import LoggerService from "../services/logger-service";
//
// const Logger = LoggerService.Instance;
//
// export default async function Test() {
// 	try {
// 		const res: QueryResult = await pool.query('SELECT 1 as test', []);
// 		if (res?.rows[0]?.test === 1) {
// 			Logger.info(`Postgres connected successfully to ${config.DB.HOST}:${config.DB.PORT}`);
// 		}
// 	} catch (e) {
// 		Logger.error(`ERROR. Postgres not connected successfully to ${config.DB.HOST}:${config.DB.PORT}`);
// 		throw new Error('Postgres not connected');
// 	}
// }
