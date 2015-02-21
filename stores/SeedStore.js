/* @flow */
"use strict"
var React = require('react');
// var {moment} = require('moment');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('dispatchers/AppDispatcher'),
    {createStore} = require('utils/StoreUtils');


var GITHUB_ID_OF_THIS_REPO = 15855011;


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
