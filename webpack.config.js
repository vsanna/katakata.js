module.exports = {
    entry: __dirname + "/src/katakata.js",
    output: {
        path: __dirname + '/dist',
        filename: 'katakata.js'
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
        }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
