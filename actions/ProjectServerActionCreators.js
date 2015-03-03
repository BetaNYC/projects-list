'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_ERROR,
  REQUEST_PROJECT_SEARCH_SUCCESS,
  REQUEST_PROJECT_SEARCH_ERROR,
  REQUEST_PROJECT_PAGINATE_SUCCESS,
  REQUEST_PROJECT_PAGINATE_ERROR
} = require('constants/ActionTypes');

var RepoServerActionCreators = {
  handleProjectSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_SUCCESS,
      response
    });
  },

  handleProjectError(...err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_ERROR
    });
  },

  handleProjectSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_SEARCH_SUCCESS,
      response
    });
  },

  handleProjectSearchError(...err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_SEARCH_ERROR
    });
  },

  handleProjectPaginateSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_PAGINATE_SUCCESS,
      response
    });
  },

  handleProjectPaginateError(...err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_PROJECT_PAGINATE_ERROR
    });
  }

};

module.exports = RepoServerActionCreators;