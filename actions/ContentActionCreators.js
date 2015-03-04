'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI'),
    CfAPI = require('apis/CfAPI'),
    ReadmeStore = require('stores/ReadmeStore'),
    {handleRepoContentError, handleRepoContentSuccess} = require('actions/ContentServerActionCreators');

var toArray = require('lodash/lang/toArray');

const {
  REQUEST_REPO_CONTENT
} = require('../constants/ActionTypes');

var ContentActionCreators = {
  requestRepoReadme({repoName}){

    // Do nothing if the content is already in the store
    if(ReadmeStore.getReadme(repoName)){ return; }

    // TODO: get the project with the repoName

    CfAPI.requestProject({name: repoName, success: (response)=>{
      let {entities} = response;
      let {repos_CfAPI} = entities;
      if(repos_CfAPI){
        let [repo] = toArray(repos_CfAPI)

        AppDispatcher.handleViewAction({ type: REQUEST_REPO_CONTENT, repoName });

        GithubAPI.getReadme({repoName:repo.name, owner: repo.owner, error: handleRepoContentError, success: handleRepoContentSuccess});
      }

    }});


  }
}
module.exports = ContentActionCreators;
