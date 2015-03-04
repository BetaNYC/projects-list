/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    RepoStore = require('../stores/RepoStore'),
    {decodeField} = require('../utils/APIUtils'),
    {createStore,extractRepoNames} = require('../utils/StoreUtils');

var keys = require('lodash/object/keys');
var marked = require('marked');

var _repos = {};

var ContentByRepoStore = createStore({
  getContent({repoName, owner, path}): string {
    let fullName = owner + '/' + repoName;
    return (_repos[fullName] && _repos[fullName][path]) || '';
  }
});

ContentByRepoStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {content_GithubAPI} = entities || {};

  if (content_GithubAPI) {
    var res = {};
    let [key] = keys(content_GithubAPI);
    var entity = content_GithubAPI[key];
    res[entity.path] = marked(decodeField(entity.content, 'base64'));
    _repos[response.fullName] = res;
    ContentByRepoStore.emitChange();
  }
});



module.exports = ContentByRepoStore;