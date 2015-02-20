'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

var RepoServerActionCreators = {
  handleRepoSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_SUCCESS,
      response: response
    });
  },

  handleRepoError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_ERROR
    });
  },

  handleReposPageSuccess(login, response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPOS_PAGE_SUCCESS,
      login: login,
      response: response
    });
  },

  handleReposPageError(login, err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPOS_PAGE_ERROR,
      login: login
    });
  }
};

module.exports = RepoServerActionCreators;