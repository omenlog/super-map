const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module:{
        rules:[{
            test: /.ts$/,
            use: {
                loader: 'ts-loader',
                options:{
                    configFile: 'tsconfig.prod.json'
                }
            },
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