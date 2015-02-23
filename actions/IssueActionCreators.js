'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI');

const {
  REQUEST_REPO_ISSUES
} = require('../constants/ActionTypes');

var IssueActionCreators = {
  requestRepoIssues(fullName){
    if(IssuesByRepoStore.getIssuesByRepo(fullName).length == 0){
      return;
    }

    AppDispatcher.handleViewAction({
      type: REQUEST_REPO_ISSUES,
      fullName: fullName
    });

    GithubAPI.getIssues(fullName);
  }
}

module.exports = IssueActionCreators;