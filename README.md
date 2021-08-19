@trenskow/log
----

# Usage

Just a simple function which lets you log JSON to the console.

````javascript
const log = require('@trenskow/log');

await log('info', {
	state: 'running',
	port: process.env.PORT
});
````

This will output to stdout.

````json
{"time":"2020-01-23T10:16:55.289Z","level":"info","state":"running","port":3000}
````

## Debugging

Use it together with [jwalker](https://npmjs.org/package/jwalker) to get pretty printing while debugging.

````bash
node ./index.js | jwalker
````

# License

See LICENSE.
