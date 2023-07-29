// import pg, {Pool} from 'pg';
// import appConfig from '../config';
//
// const pgTypes = pg.types;
// pgTypes.setTypeParser(1114, function(stringValue) {
// 	return stringValue + 'Z';
// });
//
// export const pool = new Pool({
// 	host: appConfig.DB.HOST,
// 	user: appConfig.DB.USER,
// 	password: appConfig.DB.PASSWORD,
// 	database: appConfig.DB.DATABASE,
// 	port: appConfig.DB.PORT,
// 	// max: 20,
// 	// idleTimeoutMillis: 30000,
// 	// connectionTimeoutMillis: 2000,
// });
