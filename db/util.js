const fs = require('fs');

function getSqlFromPath(path) {
  let sql = [];
  fs.readdirSync(path).sort().map(file => {
    if (/\.sql$/.test(file)) {
      sql.push(fs.readFileSync(path + '/' + file).toString() + ';');
    }
  });
  return sql;
}

module.exports.getSqlFromPath = getSqlFromPath;
