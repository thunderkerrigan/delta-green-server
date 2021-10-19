const webpack = require("webpack");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: { index: "./src/index.ts" },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new Dotenv(),
    new NodePolyfillPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /lib\/adapter\/xhr\.js/,
      "lib/adapter/http.js"
    ),
  ],
  externals: [
    nodeExternals(),
    {
      // aws4: "commonjs aws4",
      express: "commonjs express",
      axios: "commonjs axios",
      mquery: "commonjs mquery",
      mongodb: "commonjs mongodb",
      mongoose: "commonjs mongoose",
      bcrypt: "commonjs bcrypt",
      "socket.io": "commonjs socket.io",
      // path: "commonjs path",
      // fs: "commonjs fs",
      // "path-browserify": "commonjs path-browserify",
    },
  ],
  // externals: [nodeExternals()],
  externalsPresets: { node: true },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
