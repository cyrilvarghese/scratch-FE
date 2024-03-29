const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/script.js', // assuming your entry file is script.js
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your source 'index.html'
        })],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // for production, change to 'production'
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            // ... other rules
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // path to the directory with static files to serve
        },
        compress: true, // Enable gzip compression
        port: 8001, // Default to 8080, you can change this
        open: true, // Open the browser after server had been started
        hot: true, // Enable hot module reloading
    },
};
