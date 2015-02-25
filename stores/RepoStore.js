/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore,extractRepoNames} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

var _repoNames: Array<string> = [];

var RepoStore = createStore({
  wasFetchedRecently(){ false },
  getAll(){return _repoNames}
});

RepoStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {repo} = entities || {};


  if (repo) {
    console.log(values(repo), entities)

    // Decode the content && parse the field to extract the repo names as an array
    _repoNames = extractRepoNames(decodeField(repo[0].content, 'base64'));
    // TODO: create a timestamp for when the seeds were fetched
    RepoStore.emitChange();
  }
});



module.exports = RepoStore;
