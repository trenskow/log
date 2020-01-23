'use strict';

module.exports = exports = (type, subtype, payload) => {
	if (!subtype && !payload) {
		payload = type;
		type = 'info';
		subtype = 'message';
	}
	const log = {
		time: new Date(),
		type: type,
		subtype: subtype,
		payload: payload
	};
	console.info(JSON.stringify(log));
	return log;
};
