'use strict';
// require("bootstrap-sass-loader!../bootstrap-sass.config.js");
require("bootstrap-webpack!../bootstrap.config.js");


var React = require('react'),
    App = require('./app');

React.render(<App />, document.body);
