var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
  // // webpack-dev-server options
  // contentBase: "/assets",
  // webpack-dev-middleware options
  // , quiet: false,
  // noInfo: false,
  // watchDelay: 300,
  , headers: { "X-Custom-Header": "yes" }
  , stats: { colors: true }

}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
