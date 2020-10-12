const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION;

// console.log('PRODUCTION', IS_PRODUCTION);
// console.log('DEVELOPMENT', IS_DEVELOPMENT);

const filename = (ext) => IS_DEVELOPMENT ? `bundle.${ ext }` : `bundle.[hash].${ ext }`;
const jsLoaders = () => {
  const LOADERS = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (IS_DEVELOPMENT) {
    LOADERS.push('eslint-loader');
  }

  return LOADERS;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  devtool: IS_DEVELOPMENT ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: IS_DEVELOPMENT,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: IS_PRODUCTION,
        collapseWhitespace: IS_PRODUCTION,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEVELOPMENT,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
    ],
  },
};
