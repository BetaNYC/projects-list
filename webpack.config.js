var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
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
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot','6to5','jsx?harmony&stripTypes'], exclude: /(node_modules|bootstrap(-sass)?\.config.*)/ },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff2?(\?v=.+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=.+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=.+)?$/,    loader: "file" },
      { test: /\.svg(\?v=.+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // the url-loader is like the file-loader, but it inlines the image if it's below a certain file size.
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000'
      },
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
      //   loader: 'imports?jQuery=jquery'
      // },
      {
        test: /bootstrap\/js\//,
        // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.less$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!less'
      }
    ]
  }
};
