var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express');

if(process.env.NODE_ENV === 'production'){
}else{
  var server = new WebpackDevServer(webpack(config), {
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

  });

  server.listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
}

// API server
db = process.env.DATABASE_URL;
var api = express();

api.get('/appointments',function(req,res) {
  console.log(req.query);
  res.status(200).send({type: 'success', message: 'hey.'});
});


api.listen(process.env.API_PORT || 3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }


  console.log('Listening at localhost:3001');
});
