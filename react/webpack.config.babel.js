import { ExternalsPlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

const distPath = path.join(__dirname, "../angularjs/dist");

export default {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: distPath,
    filename: "react.js",
    library: "appReact",
    libraryTarget: "umd",
    chunkFilename: "react-chunk.[id].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new ExternalsPlugin("commonjs")],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  optimization: {
    noEmitOnErrors: true
  },
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  devServer: {
    contentBase: distPath,
    hot: true,
    publicPath: "/react/",
    historyApiFallback: true,
    writeToDisk: true
  }
};
