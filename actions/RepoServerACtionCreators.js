'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes');

var RepoServerActionCreators = {
  handleSeedReposSuccess(response) {

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEEDS_SUCCESS,
      response: response
    });
  },

  handleSeedReposError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEEDS_ERROR
    });
  },

  handleRepoSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_SEARCH_SUCCESS,
      response: response
    });
  },

  handleRepoSearchError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_SEARCH_ERROR
    });
  }

};

module.exports = RepoServerActionCreators;