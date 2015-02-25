/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    RepoStore = require('../stores/RepoStore'),
    GithubAPI = require('../apis/GithubAPI'),
    values = require('lodash/object/values'),
    PaginatedStoreUtils = require('../utils/PaginatedStoreUtils'),
    {createStore, isInBag, mergeIntoBag} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils'),
    { createIndexedListStore, createListActionHandler } = PaginatedStoreUtils;


var _repos = {};
var _repoNames = [];

var RepoSearchStore = createStore({
  contains(fullName: string, fields: mixed): bool { return isInBag(_repos, fullName, fields); },
  get(fullName): mixed { return _repos[fullName]; },
  getAllRepos(): mixed { return _repos; }
});


var q, sort, order;
RepoSearchStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {repoSearch} = entities || {};


  if (repoSearch) {
    // mergeIntoBag(_repos, fetchedRepos);
    _repos = repoSearch;
    RepoSearchStore.emitChange();
  }
});



module.exports = RepoSearchStore;