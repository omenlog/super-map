const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module:{
        rules:[{
            test: /.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }],
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'dist')
    },
}