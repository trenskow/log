'use strict';

module.exports = exports = (type, subtype, payload) => {
	if (!subtype && !payload) {
		payload = type;
		type = 'info';
		subtype = 'message';
	}
	const log = JSON.stringify({
		time: new Date(),
		type: type,
		subtype: subtype,
		payload: payload
	});
	console.info(log);
	return log;
};
