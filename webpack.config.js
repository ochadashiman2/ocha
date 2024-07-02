const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: {
        dps: './src/component/dps/index.tsx',
        settings: './src/component/settings/index.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('overlay', 'public', 'js')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2,
                            workerParallelJobs: 50,
                            workerNodeArgs: ['--max-old-space-size=512'],
                            name: 'tsx-loader-pool',
                        }
                    },
                    {
                        loader: 'esbuild-loader',
                        options: { loader: 'tsx', target: 'es2015' }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
            terserOptions: {}
        })],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProvidePlugin({ React: "react" }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {}
    },

    target: ["web", "es5"],
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    }
};