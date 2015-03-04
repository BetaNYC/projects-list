/* @flow */
"use strict"
var React = require('react/addons');
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

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {content} = entities || {};

  if (content) {
    var res = {};
    res[content.path] = decodeField(content.content, 'base64');
    _repos[response.repoId] = res;
    ContentByRepoStore.emitChange();
  }
});



module.exports = ContentByRepoStore;