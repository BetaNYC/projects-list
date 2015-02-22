'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    GithubAPI = require('utils/GithubAPI'),
    ContentByRepoStore = require('stores/ContentByRepoStore');

var ContentActionCreators = {
  requestRepoContent(fullName,path){
    if(ContentByRepoStore.getContent(fullName,path)){ return; }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO_CONTENT,
      fullName: fullName,
      path: path
    });

    GithubAPI.getRepoContentsAtPath(fullName,path);
  }
}
module.exports = ContentActionCreators;
