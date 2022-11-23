const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, argv) => {
    const modeEnv = argv.mode || 'development';
    const isDev = modeEnv !== 'production';

    return {
        devServer: {
            host: '0.0.0.0',
            port: 3000,
            static: {
                directory: path.join(__dirname),
            },
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '',
                            },
                        },
                        'css-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            {
                                                browsers: 'last 2 versions',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                        'sass-loader',
                    ]
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),
            new MiniCssExtractPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'static'),
                        to: path.resolve(__dirname, 'build/static'),
                    },
                ],
            }),
        ],
        entry: path.resolve(__dirname, 'js/index.js'),
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'build'),
        },
        optimization: {
            minimize: !isDev,
            minimizer: [!isDev && new TerserPlugin()].filter(Boolean),
        },
    }
}
