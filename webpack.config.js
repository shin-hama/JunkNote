const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
});

module.exports = {
  //  development or production
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        use: [
          {
            // babel
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 3000,
  },
};
