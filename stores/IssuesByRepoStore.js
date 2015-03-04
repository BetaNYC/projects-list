'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    RepoStore = require('stores/RepoStore'),
    IssueStore = require('../stores/IssueStore'),
    { createIndexedListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');

const {
  REQUEST_REPO_CONTENT,
  REQUEST_REPO_CONTENT_SUCCESS,
  REQUEST_REPO_CONTENT_ERROR
} = ActionTypes;

var IssuesByRepoStore = createIndexedListStore({
  getIssuesByRepo(repoFullName) {
    return this.getIds(repoFullName).map(IssueStore.get);
  }
});

var handleListAction = createListActionHandler({
  request: REQUEST_REPO_CONTENT,
  success: REQUEST_REPO_CONTENT_SUCCESS,
  error:   REQUEST_REPO_CONTENT_ERROR,
});

AppDispatcher.register(function (payload) {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  let {action} = payload || {},
      {fullName} = action || {};

  if (fullName) {
    handleListAction( action, IssuesByRepoStore.getList(fullName), IssuesByRepoStore.emitChange );
  }
});

module.exports = IssuesByRepoStore;