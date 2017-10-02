var path = require('path');

module.exports = {
  entry: [
    './public/src/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist')
    // path: __dirname + '/public/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [__dirname + '/public/src'],
        // exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        include: [__dirname + '/public/styles', __dirname + '/node_modules'],
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loaders: ['file-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader?limit=25000'
      }
    ]
  }
};
