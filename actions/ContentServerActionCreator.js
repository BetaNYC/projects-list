'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes');

var ContentServerActionCreator = {

  handleRepoContentSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_CONTENT_SUCCESS,
      response: response
    });
  },

  handleRepoContentError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_CONTENT_ERROR
    });
  }
}


module.exports = ContentServerActionCreator;