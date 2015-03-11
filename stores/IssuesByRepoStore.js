'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    RepoStore = require('stores/RepoStore'),
    IssueStore = require('../stores/IssueStore'),
    IssuesByRepoStore = require('../stores/IssuesByRepoStore'),
    { createIndexedListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');

const {
  REQUEST_ISSUES,
  REQUEST_ISSUES_SUCCESS,
  REQUEST_ISSUES_ERROR
} = ActionTypes;

var IssuesByRepoStore
module.exports = IssuesByRepoStore = createIndexedListStore({
  getIssues(repoName) {
    return this.getIds(repoName).map(IssueStore.get);
  }
});

var handleListAction = createListActionHandler({
  request: REQUEST_ISSUES,
  success: REQUEST_ISSUES_SUCCESS,
  error:   REQUEST_ISSUES_ERROR,
});

AppDispatcher.register(function (payload) {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  let {action} = payload || {},
      {response} = action || {},
      {repoName} = action || {};


  if (repoName || (response && response.repoName)) {
    let _repoName = repoName || response.repoName;
    handleListAction( action, IssuesByRepoStore.getList(_repoName), IssuesByRepoStore.emitChange );
  }
});

