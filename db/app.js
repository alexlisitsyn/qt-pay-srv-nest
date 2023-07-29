const fs = require('fs');
const path = require('path');
const {getSqlFromPath} = require('./util');
const {db, pgp, runSql} = require('./db');
const {config} = require('./config');

const SCHEMA = config.db.schema;
const DIR = 'sql';

const dbSetSearchPath = async () => {
  await runSql('SET search_path TO ' + SCHEMA + ';');
}

const dbClean = async () => {
  const query = fs.readFileSync(path.resolve(__dirname, './sql/_clean.sql')).toString().replace(/%%SCHEMA%%/g, SCHEMA) + ';';
  await runSql(query);
  console.log('+ dbClean');
}

const dbSys = async () => {
  let sqls = [];
  sqls.push(fs.readFileSync(path.resolve(__dirname, './sql/_sys.sql')).toString() + ';');
  const query = sqls.join('');
  await runSql(query);
  console.log('+ dbSys');
}

const dbRunUpd = async (updId) => {
  if (!updId) return;

  try {
    await dbSetSearchPath();
    const updRes = await db.oneOrNone('select id from _inst where id = ${id}', {id: updId});
    if (updRes && updRes.id) {
      console.log(updId, 'already installed');
      return true;
    }
    let sql = getSqlFromPath(path.resolve(__dirname, 'sql/' + updId));
    sql.push(`insert into _inst (id) values ('${updId}');`);
    await db.any(sql.join(''));
    console.log('+', updId, 'installed');
    return true;
  } catch (error) {
    console.error(error);
    console.log('!!', updId, 'NOT installed');
    return false;
  }
}

const taskUpdate = async () => {
  try {
    let upds = [];
    fs.readdirSync(path.resolve(__dirname, `./${DIR}`)).forEach(file => {
      if (file.indexOf('upd') === 0 && fs.statSync(path.resolve(__dirname, `./${DIR}/${file}`)).isDirectory()) {
        upds.push(file);
      }
    });

    if (upds.length === 0) {
      console.log('Nothing to update');
      return;
    }

    await dbSetSearchPath();

    let updRes = true;
    for (const updId of upds) {
      if (!updRes) {
        console.log('!! Update NOT complete');
        return;
      }

      updRes = await dbRunUpd(updId);
    }

    console.log('+ Update complete');
  } catch (error) {
    console.log(error);
    console.log('!! Update NOT complete');
  } finally {
    pgp.end();
  }
}

const taskRecreate = async () => {
  await dbClean();
  await dbSetSearchPath();
  await dbSys();
  await taskUpdate();
  pgp.end();
  console.log('+ Recreate complete');
}

const taskClean = async () => {
  await dbSetSearchPath();
  await dbClean();
  await dbSys();
  pgp.end();
  console.log('Clean complete');
}

console.log('RUN_TASK:', process.env.RUN_TASK);
if (process.env.RUN_TASK === 'recreate') {
  taskRecreate();
} else if (process.env.RUN_TASK === 'update') {
  taskUpdate();
} else if (process.env.RUN_TASK === 'clean') {
  taskClean();
} else {
  pgp.end();
  console.log('UNKNOWN PARAM');
}
