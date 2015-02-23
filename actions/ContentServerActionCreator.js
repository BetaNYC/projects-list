'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_REPO_CONTENT_SUCCESS,
  REQUEST_REPO_CONTENT_ERROR
} = require('constants/ActionTypes');
  

var ContentServerActionCreator = {

  handleRepoContentSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_CONTENT_SUCCESS,
      response: response
    });
  },

  handleRepoContentError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_CONTENT_ERROR
    });
  }
}


module.exports = ContentServerActionCreator;