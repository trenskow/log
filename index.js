'use strict';

const
	objectMap = require('@trenskow/object-map'),
	typeOf = require('type-of');

const transform = (value) => {
	if (Array.isArray(value)) return value.map(transform);
	if (typeOf(value) === 'object') return objectMap.values(value, (_, value) => transform(value));
	if (typeOf(value) === 'string') return value.replace(/(\?|&)(auth|app|password|secret|api-key|authorization-token)=.*?(&|$)/i, '$1$2=🤫$3');
	return value;
};

exports = module.exports = (type, subtype, payload) => {
	if (!subtype && !payload) {
		payload = type;
		type = 'info';
		subtype = 'message';
	}
	const log = {
		time: new Date(),
		type: type,
		subtype: subtype,
		payload: transform(payload)
	};
	console.info(JSON.stringify(log, null, process.env.LOG_OUTPUT !== 'pretty' ? undefined : 4));
	return log;
};
