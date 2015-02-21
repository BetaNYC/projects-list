'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./App'),
    HomePage = require('pages/HomePage');

if ('production' !== process.env.NODE_ENV) {
  // Clear the browser console.
  console.clear();
}


var basePath = '/';
  

module.exports = (
  <Route name='app' path={basePath} handler={App}>
    <Route name='homePage' path={basePath}  handler={HomePage} />
  </Route>
);
