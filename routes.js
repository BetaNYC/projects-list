'use strict';

var React = require('react/addons'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./App'),
    HomePage = require('pages/HomePage'),
    ProjectPage = require('pages/ProjectPage'),
    OwnerPage = require('pages/OwnerPage'),
    SearchPage = require('pages/SearchPage');

if (__PRERELEASE__) {
  // Clear the browser console.
  console.clear();
}



module.exports = (
  <Route name='app' path='/' handler={App}>
    <Route name='homePage' path='/'  handler={HomePage} />
    <Route name='searchPage' path='/search'  handler={SearchPage} />
    <Route name='ownerPage' path='/project/:owner'  handler={OwnerPage} />
    <Route name='projectPage' path='/project/:owner/:repoName'  handler={ProjectPage} />
  </Route>
);
