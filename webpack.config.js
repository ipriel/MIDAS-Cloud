var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var _root = path.resolve(__dirname);
function resolvePath(args) {
  args = Array.prototype.slice.call(arguments, 0);
  var res = path.join.apply(path, [_root].concat(args));
  return res;
}

module.exports = {
  entry: {
    'polyfills': './www_src/polyfills.ts',
    'vendor': './www_src/vendor.ts',
    'app': './www_src/main.ts'
  },
  output: {
    path: resolvePath('/server/www'),
    filename: "[name].bundle.js"
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.js.map$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        exclude: /(bootstrap)/,
        loader: 'file?name=assets/[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      },
      {
        test: /\.css$/,
        exclude: resolvePath('www_src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: resolvePath('www_src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new ExtractTextPlugin('styles/[name].css'),

    new HtmlWebpackPlugin({
      title: 'MIDAS WebConsole',
      template: './www_src/index.ejs',
      appMountId: 'mwc-app',
      filename: 'index.html',
      minify: {
        caseSensitive: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true
      }
    }),

    new HtmlWebpackExternalsPlugin([
      {
        name: 'facebook',
        url: 'https://connect.facebook.net/en_US/sdk.js'
      },
      {
        name: 'google',
        url: 'https://apis.google.com/js/platform.js'
      },
      {
        name: 'fontawesome',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ])
  ]
};