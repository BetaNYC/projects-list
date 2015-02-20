'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    UserStore = require('UserStore'),
    { createIndexedListStore, createListActionHandler } = PaginatedStoreUtils;

var StargazersByRepoStore = createIndexedListStore({
  getUsers(repoFullName) {
    return this.getIds(repoFullName).map(UserStore.get);
  }
});

var handleListAction = createListActionHandler({
  request: ActionTypes.REQUEST_STARGAZER_PAGE,
  success: ActionTypes.REQUEST_STARGAZER_PAGE_SUCCESS,
  error: ActionTypes.REQUEST_STARGAZER_PAGE_ERROR,
});

AppDispatcher.register(function (payload) {
  AppDispatcher.waitFor([RepoStore.dispatchToken]);

  var action = payload.action,
      content = action.content;

  if (content) {
    // handleListAction(
    //   action,
    //   StargazersByRepoStore.getList(content),
    //   StargazersByRepoStore.emitChange
    // );
  }
});

module.exports = StargazersByRepoStore;