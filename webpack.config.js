var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: ['./script/main.js'],
    vendors: [
      'jquery',
      'bootstrap',
      'react',
      'react-dom',
      'flux'
    ]
  },
  output: {
    filename: './build/[name].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      loader: 'jsx-loader'
    },{
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'url-loader?importLoaders=1&limit=1000&name=./fonts/[name].[ext]'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
