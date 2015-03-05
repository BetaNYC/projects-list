'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_REPO_README_SUCCESS,
  REQUEST_REPO_README_ERROR
} = require('constants/ActionTypes');


var ContentServerActionCreator;

export default ContentServerActionCreator = {

  handleRepoReadmeSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_README_SUCCESS,
      response
    });
  },

  handleRepoReadmeError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_REPO_README_ERROR
    });
  }
}

