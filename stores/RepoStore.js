/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('dispatchers/AppDispatcher'),
    SeedStore = require('stores/SeedStore'),
    {createStore} = require('utils/StoreUtils');

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
  AppDispatcher.waitFor([SeedStore.dispatchToken]);

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