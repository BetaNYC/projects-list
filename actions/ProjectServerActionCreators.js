'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_ERROR
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
  }

};

module.exports = RepoServerActionCreators;