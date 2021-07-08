/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
})
const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
  //  development or production
  mode: 'development',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: outputPath,
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  // to make faster for building
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            // babel
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: outputPath,
    open: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    // need for hot reloading in docker container
    watchOptions: {
      poll: 1000,
    },
  },
}
