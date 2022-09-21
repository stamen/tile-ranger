const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './'),
  },
  mode: 'development',
  resolve: {fallback: { "stream": false, "buffer": false}},
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 9009,
    hot: true
  },
};