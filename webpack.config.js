import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));;

export default {
    entry: './src/index.ts',
    mode: 'production',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [{
            test: /.ts$/,
            use: {
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig-cjs.json'
                }
            },
            exclude: /node_modules/,
        }],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib/cjs/'),
        library: 'SuperMap',
        libraryTarget: 'umd',
        globalObject: 'this'
    }
}
