const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "http://qrng.anu.edu.au/*",
    }
  },
  plugins: [
    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */
    new webpack.HotModuleReplacementPlugin(),
    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
    new webpack.NoErrorsPlugin(),
    /**
     * DefinePlugin allows us to define free variables, in any webpack build, you can
     * use it to create separate builds with debug logging or adding global constants!
     * Here, we use it to specify a development build.
     */
    new webpack.DefinePlugin({
      // Force HTMLtoJSX to use the in-browser `document` object rather than
      // require the Node-only "jsdom" package.
      // You need this to use XMLHttpRequest
      IN_BROWSER: true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /toomanyerrors\.jsx?$/,
        loaders: ['jshint'],
        // define an include so we check just the files we need
          include: path.join(__dirname, 'src')
      }
    ],
    loaders: [
        {
            test: /\.js?/,
            exclude: [/node_modules/, /styles/],
        loaders: ['babel'],
          include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
