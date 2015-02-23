'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI'),
    ContentByRepoStore = require('stores/ContentByRepoStore'),
    {handleRepoContentError, handleRepoContentSuccess} = require('actions/RepoServerActionCreators');

const {
  REQUEST_REPO_CONTENT
} = require('../constants/ActionTypes');

var ContentActionCreators = {
  requestRepoContent(fullName, path){
    if(ContentByRepoStore.getContent(fullName,path)){ return; }

    AppDispatcher.handleViewAction({
      type: REQUEST_REPO_CONTENT,
      fullName: fullName,
      path: path
    });

    GithubAPI.getRepoContentsAtPath({fullName, path, error: handleRepoContentError, success: handleRepoContentSuccess});
  }
}
module.exports = ContentActionCreators;
