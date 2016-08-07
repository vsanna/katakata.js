# katakata.js
this is a simple JavaScript library to add an effect like type-writer.


this is demo

TODO: add gif image


# how to use

first, install katakata.js via npm.

```bash
$ npm install katakata
```

And then, read, config and run. that's all.

```js
var Katakata = require('katakata');
var katakata = Katakata({
  'target': '#your_element_id', // default : '#katakata'
  'text': 'what you want to show', // default : 'katakata'
  'intervalMinMSec': 200, // default: 200
  'intervalMaxMSec': 600, // default: 600
})
katakata.run();
```
