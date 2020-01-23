@trenskow/log
----

# Usage

Just a simple function which lets you log JSON to the console.

    const log = require('@trenskow/log');

	log('info', 'server', {
		state: 'running',
		port: process.env.PORT
	});

This will output to stdout.

    {"time":"2020-01-23T10:16:55.289Z","type":"info","subtype":"server","payload":{"state":"running","port":3000}}

## Debugging

Use it together with [jwalker](https://npmjs.org/package/jwalker) to get pretty printing while debugging.

    node ./index.js | jwalker

# License

See LICENSE.
