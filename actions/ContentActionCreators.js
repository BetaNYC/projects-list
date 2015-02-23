'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    GithubAPI = require('apis/GithubAPI'),
    ContentByRepoStore = require('stores/ContentByRepoStore'),
    {handleRepoContentError, handleRepoContentSuccess} = require('actions/RepoServerActionCreators');

var ContentActionCreators = {
  requestRepoContent(fullName, path){
    if(ContentByRepoStore.getContent(fullName,path)){ return; }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO_CONTENT,
      fullName: fullName,
      path: path
    });

    GithubAPI.getRepoContentsAtPath({fullName, path, error: handleRepoContentError, success: handleRepoContentSuccess});
  }
}
module.exports = ContentActionCreators;
