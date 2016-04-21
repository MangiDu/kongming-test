var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: ['./script/main.js'],
    vendors: [
      'jquery',
      'react',
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
