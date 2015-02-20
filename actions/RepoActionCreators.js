'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    RepoAPI = require('../utils/RepoAPI'),
    ReposByUserStore = require('../stores/ReposByUserStore'),
    RepoStore = require('../stores/RepoStore');
    
var RepoActionCreators = {
  requestRepo(fullName, fields) {
    if (RepoStore.contains(fullName, fields)) {
      return;
    }

    // Although this action is currently not handled by any store,
    // it is fired for consistency. You might want to use it later,
    // e.g. to show a spinner or have a more detailed log.

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO,
      fullName: fullName
    });

    RepoAPI.requestRepo(fullName);
  },

  requestReposPage(login, isInitialRequest) {
    if (ReposByUserStore.isExpectingPage(login) ||
        ReposByUserStore.isLastPage(login)) {
      return;
    }

    if (isInitialRequest && ReposByUserStore.getPageCount(login) > 0) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_STARRED_REPOS_PAGE,
      login: login
    });

    var nextPageUrl = ReposByUserStore.getNextPageUrl(login);
    RepoAPI.requestReposPage(login, nextPageUrl);
  }
};

module.exports = RepoActionCreators;
