'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    GithubAPI = require('apis/GithubAPI');

var IssueActionCreators = {
  requestRepoIssues(fullName){
    if(IssuesByRepoStore.getIssuesByRepo(fullName).length == 0){
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO_ISSUES,
      fullName: fullName
    });

    GithubAPI.getIssues(fullName);
  }
}

module.exports = IssueActionCreators;