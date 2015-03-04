'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_ISSUES_SUCCESS,
  REQUEST_ISSUES_ERROR
} = require('constants/ActionTypes');

var IssueServerActionCreators = {
  handleIssuesSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_ISSUES_SUCCESS, response
    });
  },

  handleIssuesError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_ISSUES_ERROR
    });
  }
}

module.exports = IssueServerActionCreators;