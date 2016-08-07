module.exports = {
    entry: __dirname + "/js/main.jsx",
    output: {
        path: __dirname + '/js',
        filename: 'output.js'
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
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
