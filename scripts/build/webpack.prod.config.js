const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "none",
  entry: path.resolve(__dirname, "../../src/index.tsx"),
  output: {
    libraryTarget: "commonjs2",
  },
  externals: ["react", "antd"],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 单独的进程进行类型检查
    new ForkTsCheckerWebpackPlugin(),
  ],
};
