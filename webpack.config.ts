import webpack, { Configuration } from "webpack";
import path from "path";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import Dotenv from "dotenv-webpack";

const config: Configuration = {
  mode: "development",
  entry: { index: "./src/index.ts" },
  target: "node",
  devtool: "cheap-source-map",
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
    // nodeExternals({ modulesFromFile: true }),
    {
      // aws4: "commonjs aws4",
      express: "commonjs express",
      axios: "commonjs axios",
      mquery: "commonjs mquery",
      mongodb: "commonjs mongodb",
      mongoose: "commonjs mongoose",
      "node-forge": "commonjs node-forge",
      bcrypt: "commonjs bcrypt",
      "socket.io": "commonjs socket.io",
      "firebase-admin": "commonjs firebase-admin",
      "firebase-admin/app": "commonjs firebase-admin/app",
      "firebase-admin/auth": "commonjs firebase-admin/auth",
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
    devtoolModuleFilenameTemplate: path.resolve(__dirname, "src"),
    clean: true,
  },
};

export default config;
