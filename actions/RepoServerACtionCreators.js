'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI');

const {
  REQUEST_SEEDS_SUCCESS,
  REQUEST_SEEDS_ERROR,
  REQUEST_REPO_SEARCH_SUCCESS,
  REQUEST_REPO_SEARCH_ERROR
} = require('constants/ActionTypes');

var RepoServerActionCreators = {
  handleSeedReposSuccess(response) {

    AppDispatcher.handleServerAction({
      type: REQUEST_SEEDS_SUCCESS,
      response
    });

  },

  handleSeedReposError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_SEEDS_ERROR
    });
  },

  handleRepoSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_SEARCH_SUCCESS,
      response
    });
  },

  handleRepoSearchError(...err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_SEARCH_ERROR
    });
  }

};

module.exports = RepoServerActionCreators;