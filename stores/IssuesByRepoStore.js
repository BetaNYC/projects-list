'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    RepoStore = require('stores/RepoStore'),
    { createIndexedListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');

var IssuesByRepoStore = createIndexedListStore({
  getIssuesByRepo(repoFullName) {
    return this.getIds(repoFullName).map(IssueStore.get);
  }
});
var handleListAction = createListActionHandler({
  request: ActionTypes.REQUEST_REPO_CONTENT,
  success: ActionTypes.REQUEST_REPO_CONTENT_SUCCESS,
  error:   ActionTypes.REQUEST_REPO_CONTENT_ERROR,
});

AppDispatcher.register(function (payload) {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  var action = payload.action,
      fullName = action.fullName;

  if (fullName) {
    handleListAction(
      action,
      IssuesByRepoStore.getList(fullName),
      IssuesByRepoStore.emitChange
    );
  }
});

module.exports = IssuesByRepoStore;