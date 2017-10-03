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
        include: [path.join(__dirname, '/public/src')],
        // exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/, // have to include node modules for css b/c of react-widgets
        include: [path.join(__dirname, '/public'), path.join(__dirname, '/node_modules')],
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|jpe?g|png|ttf|eot|svg|woff2?)$/,
        include: [path.join(__dirname, '/public'), path.join(__dirname, '/node_modules')],
        loader: 'url-loader?name=[name].[ext]?limit=25000',
      }
    ]
  }
};
