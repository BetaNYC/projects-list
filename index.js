'use strict';
// Global styles
require("bootstrap-webpack!./config/bootstrap.config.js");
require('font-awesome-webpack');

var React = require('react/addons'),
    router = require('./router');

router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.body);
});
