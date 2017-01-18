var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var validate = require('webpack-validator');
var path = require('path');
var WebpackBrowserPlugin = require('webpack-browser-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [

  // Extract css into a separate file
  new ExtractPlugin('bundle.css'),

  new webpack.optimize.CommonsChunkPlugin({
    // Move dependencies to our main file
    name: 'main',
    // Look for common dependencies in all children,
    children: true,
    // How many times a dependency must come up before being extracted
    minChunks: 2
  }),

  // dists the html template
  new HtmlWebpackPlugin({
    template: './src/index.template.ejs',
    inject: 'body'
  }),

  // Starts web server
  new WebpackBrowserPlugin({
    port: 8080,
    url: 'http://localhost'
  })
];

// Setup plugins for production code
if (production) {
  plugins = plugins.concat([
    new CleanPlugin('dist'),
    // Looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),
    // Optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),
    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        // Suppress uglification warnings
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]);
}

const common = {
  debug: !production,
  devtool: production ? false : 'eval',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: ExtractPlugin.extract('style', 'css!sass'),
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'file',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = validate(common);
