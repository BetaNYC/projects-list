'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./App'),
    HomePage = require('pages/HomePage');

if (__PRERELEASE__) {
  // Clear the browser console.
  console.clear();
}



module.exports = (
  <Route name='app' path='/' handler={App}>
    <Route name='homePage' path='/'  handler={HomePage} />
  </Route>
);
