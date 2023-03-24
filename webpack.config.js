const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require("webpack");

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode: 'development',
  entry: './src/js/pixi.ts',
  output: {
    path: __dirname + '/dist/',
    filename: './js/pixi.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: "./",
        configFile: path.join("./", "tsconfig.json"),
        extensions: [".js", ".ts", ".tsx"],
      })
    ]
  },
  optimization: {
    usedExports: true,
  },
  devServer: {
    publicPath: "/assets/", // here's the change
    contentBase: [
      path.join(__dirname, '/assets'),
      path.join(__dirname, '/dist')
    ]
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: path.resolve('/assets/'),
              outputPath: "/assets/",
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['./dist/*'],
      notify: false
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "favicon.ico",
      template: path.join(__dirname, "./src/index.html"),
      inject: false
    })
  ],
  watch: true,
  devtool: 'source-map'
}
