/* @flow */
"use strict"
var React = require('react');
// var {moment} = require('moment');
var objectAssign = require('object-assign'),
    AppDispatcher = require('dispatchers/AppDispatcher'),
    {createStore} = require('utils/StoreUtils');


var GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories?q=civic&filename:civic.json+sort=stars&order=desc&client_id=a81bb8768be5bb8012d0&client_secret=b4e7a1a9e782537908ed4af80ad172932fc384af';


var _repos = {};

var RepoStore = createStore({
  contains(fullName, fields) {
    return isInBag(_repos, fullName, fields);
  },

  get(fullName) {
    return _repos[fullName];
  },

  getAllRepos(): Array<any> {
    return _repos;
  }

});

RepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedRepos = entities && entities.repos;

  if (fetchedRepos) {
    mergeIntoBag(_repos, fetchedRepos);
    RepoStore.emitChange();
  }
});



module.exports = RepoStore;