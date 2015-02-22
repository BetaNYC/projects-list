'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes');

var IssueServerActionCreators = {
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

module.exports = IssueServerActionCreators;