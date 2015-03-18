'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher');

const {
  REQUEST_DISCUSSIONS_SUCCESS,
  REQUEST_DISCUSSIONS_ERROR
} = require('constants/ActionTypes');

var DiscourseServerActionCreators = {
  handleSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: REQUEST_DISCUSSIONS_SUCCESS, response
    });
  },

  handleSearchError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: REQUEST_DISCUSSIONS_ERROR
    });
  }
}

module.exports = DiscourseServerActionCreators;