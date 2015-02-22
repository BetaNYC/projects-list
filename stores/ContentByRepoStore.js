/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    RepoStore = require('../stores/RepoStore'),
    {decodeField} = require('../utils/APIUtils'),
    {createStore,extractRepoNames} = require('../utils/StoreUtils');

var _repos = {};

var ContentByRepoStore = createStore({
  getContent(repoId: string, path: string): string {
    return (_repos[repoId] && _repos[repoId][path]) || '';
  }
});

ContentByRepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedContent = entities && entities.content;

  if (fetchedContent) {
    var res = {};
    res[fetchedContent.path] = decodeField(fetchedContent.content, 'base64');
    _repos[response.fullName] = res;

    ContentByRepoStore.emitChange();
  }
});



module.exports = ContentByRepoStore;