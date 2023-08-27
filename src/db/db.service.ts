import { Injectable, Logger } from "@nestjs/common";
import pg, { Pool } from "pg";
import { InjectClient } from "nest-postgres";

@Injectable()
export class DbService {

	private readonly logger = new Logger(DbService.name);

	constructor(
		@InjectClient() private readonly pool: Pool
	) {
		require("pg").types.setTypeParser(1114, function(stringValue) {
			return stringValue + "Z";
		});
	}

	public async query(query: string, params: any = []) {
		try {
			const dbRes = await this.pool.query(query, params);
			return dbRes?.rows ?? [];
		} catch (e) {
			this.logger.error(e);
			return [];
		}
	};

	public async findAll(table: string, limit: number = 0, offset: number = 0, where: string = "") {
		this.logger.warn(">> findAll ToDo !!");
	};

	public async getAllData(table: string) {
		try {
			const dbRes = await this.pool.query(`select * from "${table}"`)
			return dbRes?.rows ?? [];
		} catch (e) {
			return [];
		}
	};

	public async getById(table: string, id: number | string) {
		return await this.pool.query(
			`select *
       from "${table}"
       where id = $1`,
			[id]
		);
	};

	public async updateById<T extends any[] = any[]>(table: string, params: T, id: number) {
		let paramArray = [];
		let paramStr = "";
		let cnt = 0;
		for (const key in params) {
			cnt++;
			paramStr += `,"${key}"=$${cnt}`;
			paramArray.push(params[key]);
		}

		cnt++;
		paramArray.push(id);
		const queryStr: string = `update "${table}"
                              set ` + paramStr.substring(1) + ` where "id" = $${cnt}`;

		return await this.pool.query(queryStr, paramArray);
	};

	public async insertOne<T extends object>(table: string, params: T, returnFields = "id") {
		let cnt = 0;
		let columns: any[] = [];
		let masks: string[] = [];
		let values: any[] = [];

		for (const key in params) {
			cnt++;
			columns.push(key);
			masks.push(`$${cnt}`);
			values.push(params[key]);
		}

		const queryStr = `insert into "${table}" (${columns.join(",")})
                      values (${masks.join(",")}) ${returnFields ? ` returning ${returnFields}` : ""}`;

		return await this.pool.query(queryStr, values);
	};

	// массив param меняется в самом объекте, итоговый query возвращается функцией
	public async addLimitOffset(limit: number, offset: number, query: string, param: any[] = []) {
		let cnt: number = param.length;

		if (limit) {
			cnt++;
			query += ` limit $${cnt}`;
			param.push(limit);
		}

		if (offset) {
			cnt++;
			query += ` offset $${cnt}`;
			param.push(offset);
		}

		return query;
	};
}
