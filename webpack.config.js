const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          static: {
            directory: path.resolve(__dirname, 'dist'),
            publicPath: path.resolve(__dirname, 'public'),
          },
          port: 3000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true,
        },
      };

const esLintPlugin = (isDev) =>
  isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })];

module.exports = ({ mode }) => ({
  mode: mode ? 'development' : 'production',
  devtool: mode ? 'source-map' : false,
  ...devServer(mode),
  entry: {
    bundle: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    // clean: true,
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    ...esLintPlugin(mode),
  ],
});
