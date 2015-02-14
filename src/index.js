'use strict';
// require("bootstrap-sass-loader!../bootstrap-sass.config.js");
require("bootstrap-webpack!../config/bootstrap.config.js");


var React = require('react'),
    App = require('./app');

React.render(<App />, document.body);
