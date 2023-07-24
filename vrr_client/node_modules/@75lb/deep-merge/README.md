[![view on npm](https://badgen.net/npm/v/@75lb/deep-merge)](https://www.npmjs.org/package/@75lb/deep-merge)
[![npm module downloads](https://badgen.net/npm/dt/@75lb/deep-merge)](https://www.npmjs.org/package/@75lb/deep-merge)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/deep-merge)](https://github.com/75lb/deep-merge/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/deep-merge)](https://github.com/75lb/deep-merge/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/deep-merge/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/deep-merge/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/75lb/deep-merge/badge.svg)](https://coveralls.io/github/75lb/deep-merge)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# @75lb/deep-merge

Deep-merge the values of one object structure into another. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) except it processes the full depth of the object structure, not only the top level. Useful for merging config.

## Synopsis

```js
import deepMerge from '@75lb/deep-merge'

```

### Simple

Typical example merging four objects. Input:

```js
deepMerge(
  { port: 8000, data: { animal: 'cow' } },
  { stack: ['one'] },
  { stack: ['two'], help: true },
  { data: { animal: 'bat', metal: 'iron' } }
)
```

Result

```js
{
  port: 8000,
  stack: ['two'],
  help: true,
  data: { animal: 'bat', metal: 'iron' }
}
```

### Arrays

Empty arrays are ignored and not merged in. Input:

```js
deepMerge(
  { stack: ['one'] },
  { stack: [] }
)
```

Result:


```js
{ stack: ['one'] }
```

However, if the later array contains one or more values the later array will *replace* the original: 

```js
deepMerge(
  { stack: ['one'] },
  { stack: ['two'] }
)
```

Result:

```js
{ stack: ['two'] }
```

### Load anywhere

This library is compatible with Node.js, the Web and any style of module loader. It can be loaded anywhere, natively without transpilation.

Within a Node.js ECMAScript Module:

```js
import deepMerge from '@75lb/deep-merge'
```

Within an modern browser ECMAScript Module:

```js
import deepMerge from './node_modules/@75lb/deep-merge/dist/index.mjs'
```

* * *

&copy; 2021 [Lloyd Brookes](https://github.com/75lb) \<75pound@gmail.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner). Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
