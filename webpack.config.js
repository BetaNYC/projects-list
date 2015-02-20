var webpack = require('webpack');
var path = require('path');



module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: __dirname + '/assets/',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.coffee'],
    root: [__dirname]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot','jsx?harmony&stripTypes'],
        exclude: /(node_modules|bootstrap(-sass)?\.config.*)/
      },
      // Pattern matches the coffeescript files
      {
        test: /\.coffee$/,
        loaders: ['react-hot','jsx?harmony&stripTypes', 'coffee']
      },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff2?(\?v=.+)?$/, loader: "url?limit=8962&minetype=application/font-woff" },
      { test: /\.ttf(\?v=.+)?$/,    loader: "url?limit=8962&minetype=application/octet-stream" },
      { test: /\.eot(\?v=.+)?$/,    loader: "file" },
      { test: /\.svg(\?v=.+)?$/,    loader: "url?limit=8962&minetype=image/svg+xml" },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // the url-loader is like the file-loader, but it inlines the image if it's below a certain file size.
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8962'
      },
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: /bootstrap\/js\//,
      //   // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: /\.scss$/,
      //   // Query parameters are passed to node-sass
      //   loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      // },
      {
        test: /\.less$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!less'
      }
    ]
  }
};
