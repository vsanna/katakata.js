show sample use in detail

## npm install

```
$ mkdir katakata_sample
$ cd katakata_sample
$ npm init
$ npm install --save katakata babel-core babel-loader babel-preset-es2015 babel-runtime webpack
```

## prepare files
### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>katakata</title>
  <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400,900' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>
  <div class="box">
  <div id="katakata"></div>
  <script src="js/output.js" type="text/javascript"></script>
</body>
</html>
```

### styles/style.css
read [here](https://github.com/vsanna/katakata.js/blob/master/styles/style.css)

### js/main.jsx

```
var Katakata = require('katakata');
var katakata = new Katakata({ 'text': "what |you |want |to |show\n| たとえば| 改行も | できるんだぜ", 'devider': '|'})
katakata.run();
```

### webpack.config.js
```
module.exports = {
  entry: __dirname + "/js/main.jsx",
  output: {
    path: __dirname + '/js',
    filename: 'output.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        plugins: ['transform-runtime'],
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
```


## do webpack 
```
$ ./node_modules/webpack/bin/webpack.js
``` 

and, open your page on browser!
