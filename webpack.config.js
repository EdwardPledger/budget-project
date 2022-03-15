const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode: env.prod ? "production" : "development",
  // devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.vue?/,
        use: 'vue-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
}