# katakata.js
JavaScript is a simple library to add an effect like TypeWriter.

# how to use

first, install katakata.js via npm.

```
$ npm install katakata
```

And then, read, config and run. that's all.
```
var Katakata = require('katakata');
var katakata = Katakata({
  'target': '#your_element_id', // default : '#katakata'
  'text': 'what you want to show', // default : 'katakata'
  'intervalMinMSec': 200, // default: 200
  'intervalMaxMSec': 600, // default: 600
})
katakata.run();
```
