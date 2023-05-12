const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/sample/aws/s3.js',
  output: {
    filename: 's3-bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    fallback: {
        "path": require.resolve("path-browserify"),
        "os": false,
        "fs": false,
        "http": false,
        "https": false,
        "zlib": false,
        "stream": false,
        "crypto": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};