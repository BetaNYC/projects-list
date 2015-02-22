'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes');

var IssueServerActionCreator = {
  handleIssuesSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_ISSUES_SUCCESS,
      response: response
    });
  },

  handleIssuesError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_ISSUES_ERROR
    });
  }
}

module.exports = IssueServerActionCreator;