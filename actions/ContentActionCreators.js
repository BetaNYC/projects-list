'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI'),
    CfAPI = require('apis/CfAPI'),
    ContentByRepoStore = require('stores/ContentByRepoStore'),
    {handleRepoContentError, handleRepoContentSuccess} = require('actions/ContentServerActionCreators');

var toArray = require('lodash/lang/toArray');

const {
  REQUEST_REPO_CONTENT
} = require('../constants/ActionTypes');

var ContentActionCreators = {
  requestRepoContent({repoName, path}){

    // Do nothing if the content is already in the store
    if(ContentByRepoStore.getContent(repoName,path)){ return; }

    // TODO: get the project with the repoName

    CfAPI.requestProject({name: repoName, success: (response)=>{
      let {entities} = response;
      let {repos_CfAPI} = entities;
      if(repos_CfAPI){
        let [repo] = toArray(repos_CfAPI)

        AppDispatcher.handleViewAction({ type: REQUEST_REPO_CONTENT, repoName, path });

        GithubAPI.getRepoContentsAtPath({repoName:repo.name, owner: repo.owner, path, error: handleRepoContentError, success: handleRepoContentSuccess});
      }

    }});


  }
}
module.exports = ContentActionCreators;
