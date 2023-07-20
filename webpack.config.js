/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 不进行类型检查，仅编译，加快编译速度。
              configFile: path.resolve(__dirname, './tsconfig.json') // 指定tsconfig.json文件
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'tsc-dist/scripts/createAdmin.js'),
            to: path.resolve(__dirname, 'dist/scripts/')
          }
        ]
      })
    ]
  }
}
