const fs = require('fs');

export function getFileContent (filePath: string) {
	try {
		const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
		return fileContent;
	} catch (err) {
		console.error(err);
		return '';
	}
}

