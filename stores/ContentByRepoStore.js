/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('dispatchers/AppDispatcher'),
    RepoStore = require('stores/RepoStore'),
    {createStore,extractRepoNames} = require('utils/StoreUtils');
    
var _repos = {};

var ContentByRepoStore = createStore({
  getContent(repoId): mixed {
    return (_repos[repoId] && _repos[repoId].content) || {};
  }

});

ContentByRepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedRepos = entities && entities.repos;

  if (fetchedRepos) {
    mergeIntoBag(_repos, fetchedRepos);
    ContentByRepoStore.emitChange();
  }
});



module.exports = ContentByRepoStore;