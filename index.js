import { appendFile } from 'fs/promises';

import objectMap from '@trenskow/object-map';
import merge from '@trenskow/merge';

const transform = (value) => {
	if (Array.isArray(value)) return value.map(transform);
	if (typeof value === 'object' && value !== null) return objectMap.values(value, (_, value) => transform(value));
	if (typeof value === 'string') return value.replace(/(auth|app|password|secret|api-key|authorization-token)=.*?(&|$)/ig, '$1=🤫$2');
	return value;
};

export default async (level = 'info', message) => {

	if (typeof level === 'object' && typeof message === 'undefined') {
		message = level;
		level = 'info';
	}

	const log = merge({ level }, transform(message));

	let data;

	switch (process.env.LOG_STYLE) {
	case 'pretty':
		data = JSON.stringify(log, null, parseInt(process.env.LOG_STYLE_PRETTY_INDENTATION_WIDTH) || 4);
		break;
	default:
		data = JSON.stringify(log);
		break;
	}

	data = `${data}\n`;

	const output = process.env.LOG_OUTPUT || 'stdout';

	switch (output) {
	case 'stdout':
	case 'stderr':
		await new Promise((resolve, reject) => {
			process[output].write(data, (err) => {
				if (err) return reject(err);
				resolve();
			});
		});
		break;
	default:
		await appendFile(process.env.LOG_OUTPUT, data);
		break;
	}

	return log;

};
