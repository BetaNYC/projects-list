'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_PROJECT_SEARCH_SUCCESS,
  REQUEST_PROJECT_SEARCH_ERROR
} = require('constants/ActionTypes');
  
var RepoServerActionCreators = {
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
  }

};

module.exports = RepoServerActionCreators;