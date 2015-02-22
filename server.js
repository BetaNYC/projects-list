var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

if('production' == process.env.NODE_ENV){
}else{
  var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
    // , hot: true
    // // webpack-dev-server options
    , contentBase: "./public"
    // webpack-dev-middleware options
    , quiet: true
    // , noInfo: true
    , watchDelay: 100
    , headers: { "X-Custom-Header": "yes" }
    , stats: { colors: true }

  });

  server.listen(4000, 'localhost', function (err, result) {
    if (err) { console.log(err); }

    console.log('Listening at ' + config.output.serverBase);
  });
}