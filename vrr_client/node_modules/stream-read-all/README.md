[![view on npm](https://img.shields.io/npm/v/stream-read-all.svg)](https://www.npmjs.org/package/stream-read-all)
[![npm module downloads](https://img.shields.io/npm/dt/stream-read-all.svg)](https://www.npmjs.org/package/stream-read-all)
[![Build Status](https://travis-ci.org/75lb/stream-read-all.svg?branch=master)](https://travis-ci.org/75lb/stream-read-all)
[![Coverage Status](https://coveralls.io/repos/github/75lb/stream-read-all/badge.svg?branch=master)](https://coveralls.io/github/75lb/stream-read-all?branch=master)
[![Dependency Status](https://badgen.net/david/dep/75lb/stream-read-all)](https://david-dm.org/75lb/stream-read-all)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# stream-read-all

Returns a promise which resolves once all data in the supplied stream has been read.

This example script...

```js
async function printInput () {
  const streamReadAll = require('stream-read-all')
  const stdin = await streamReadAll(process.stdin)
  console.log(stdin.toString())
}
printInput()
```

...prints this output.

```
$ echo Hello | node example.js
Hello
```

* * *

&copy; 2017-20 Lloyd Brookes <75pound@gmail.com>.
