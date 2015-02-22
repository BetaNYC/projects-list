/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    SeedStore = require('../stores/SeedStore'),
    GithubAPI = require('../apis/GithubAPI'),
    values = require('lodash/object/values'),
    {createStore, isInBag, mergeIntoBag, extractRepoNames} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils');

var _repos = {};
var _repoNames = [];

var RepoStore = createStore({
  contains(fullName: string, fields: mixed): bool { return isInBag(_repos, fullName, fields); },
  get(fullName): mixed { return _repos[fullName]; },
  getAllRepos(): mixed { return _repos; }
});


var q, sort, order;
RepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([SeedStore.dispatchToken]);

  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedRepos = entities && entities.repo,
      fetchedSeeds = entities && values(values(entities)[0]);

  if (fetchedRepos) {
    // mergeIntoBag(_repos, fetchedRepos);
    _repos = fetchedRepos;
    RepoStore.emitChange();
  }
});



module.exports = RepoStore;