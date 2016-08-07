# katakata.js
katakata is a simple JavaScript library, written in ES6, to show an effect like type-writer.  
('katakata' is a onomatopoeia which means typing in japanese.)

you can ...

- use for multiple lines.
- config typing speed, devider-symbol and other parameter.
- use class 'on-edit' for the word which is being editted.

demo GIF.

![sample](images/sample.gif)

demo on browser is [here](http://vsanna.github.io/katakata.js)

if you liked this style, you can use this style from ```styles/style.css```
it's very simple css, so you can modify as you like.


# how to use

first, install katakata.js via npm.

```bash
$ npm install katakata

# katakata is written in ES6, and uses generator.
# So, it requires some modules.
$ npm install --save babel-core babel-loader babel-runtime babel-preset-es2015
```

And then, require, config and run. That's all.

```js
var Katakata = require('katakata');
var katakata = new Katakata({
  'target': '#your_element_id', // default : '#katakata'
  'text': 'what |you |want |to |show.', // default : 'katakata'
  'devider': '|', // default: '|', this shows where to enter.
  'intervalMinMSec': 200, // default: 200
  'intervalMaxMSec': 600, // default: 600
})
katakata.run();
```

## sample code
check sample code [here!](https://github.com/vsanna/katakata.js/sample)
