/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore,extractRepoNames, mergeIntoBag} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

var UserStore = require('stores/UserStore');

var _repos: mixed = {};

var RepoStore = createStore({
  wasFetchedRecently(){ false },
  getAll(){ return _repos },
  get(id){ return _repos[id] }
});

RepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  // User store must finish before RepoStore
  AppDispatcher.waitFor([UserStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {repos} = entities || {},
      {repo} = entities || {};


  if (repo) {
    // Decode the content && parse the field to extract the repo names as an array
    // _repoNames = extractRepoNames(decodeField(repo[0].content, 'base64'));
  }
  if (repos) {
    _repos = mergeIntoBag(_repos,repos);
    RepoStore.emitChange();
  }
});



module.exports = RepoStore;
