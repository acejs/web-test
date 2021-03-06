const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'dev.test.kuaishou.com',
    port: '3003',
    clientLogLevel: 'warning',
    historyApiFallback: true,
    open: true,
    hot: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    progress: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
