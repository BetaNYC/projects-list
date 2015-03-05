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

const {
  REQUEST_REPO_README_ERROR
} = require('constants/ActionTypes');

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
      {err} = action || {},
      {entities} = response || {},
      {content_GithubAPI} = entities || {};


  if(err){
    // _repos[response.fullName] = null;
    ReadmeStore.emitChange();
  }

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