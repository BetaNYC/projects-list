'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    GithubAPI = require('utils/GithubAPI');

var IssueActionCreators = {
  requestRepoIssues(fullName){

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO_ISSUES,
      fullName: fullName
    });

    GithubAPI.getIssues(fullName);
  }
}

module.exports = IssueActionCreators;