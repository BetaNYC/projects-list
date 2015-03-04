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

var ReadmeStore = createStore({
  getReadme({repoName, owner}): string {
    let fullName = owner + '/' + repoName;
    return _repos[fullName];
  }
});

ReadmeStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {content_GithubAPI} = entities || {};

  if (content_GithubAPI) {
    var res = {};
    let [key] = keys(content_GithubAPI);
    var entity = content_GithubAPI[key];
    if(entity.content)
      _repos[response.fullName] = marked(decodeField(entity.content, 'base64'));
    ReadmeStore.emitChange();
  }
});



module.exports = ReadmeStore;