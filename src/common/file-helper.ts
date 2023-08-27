const fs = require('fs');

export function getFileContent (filePath: string) {
	try {
		return fs.readFileSync(filePath, {encoding: 'utf8'});
	} catch (err) {
		console.error(err);
		return '';
	}
}

