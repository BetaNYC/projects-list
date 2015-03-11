'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    CfAPI = require('apis/CfAPI');

// Stores
var IssuesByRepoStore = require('../stores/IssuesByRepoStore');

const {
  REQUEST_ISSUES
} = require('../constants/ActionTypes');

var {
  handleIssuesError,
  handleIssuesSuccess,
} = require('actions/IssueServerActionCreators');


var IssueActionCreators;
module.exports = IssueActionCreators = {
  requestRepoIssues({repoName, page}){
    // If we already have issues for this repo, do nothing in this request.
    // if(IssuesByRepoStore.getIssues(repoName).length != 0){
    //   return;
    // }

    AppDispatcher.handleViewAction({type: REQUEST_ISSUES, repoName});
    // GithubAPI.getIssues(repoName);
    CfAPI.requestIssues({repoName, page, success: handleIssuesSuccess, error: handleIssuesError});
  }
}
