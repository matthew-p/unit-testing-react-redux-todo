var webpack = require('webpack'); // require webpack library

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080", // setting url for hot reload 
        "webpack/hot/only-dev-server", // reload only dev server
        "./src/index.jsx"
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot-loader!babel-loader' // include react-hot loader, needed to append '-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader' // add the css loader
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'] // needed '*' instead of just '' empty string
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true // activate hot reloading
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // wirein hot loading plugin 
    ]
};