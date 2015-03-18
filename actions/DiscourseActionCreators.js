'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    DiscourseAPI = require('apis/DiscourseAPI');

// Stores
var DiscoursePostStore = require('../stores/DiscoursePostStore');

const {
  REQUEST_DISCUSSIONS
} = require('../constants/ActionTypes');

var {
  handleSearchError,
  handleSearchSuccess,
} = require('actions/DiscourseServerActionCreators');


var IssueActionCreators;
module.exports = IssueActionCreators = {
  requestSearch({term, page}){
    AppDispatcher.handleViewAction({type: REQUEST_DISCUSSIONS, term});
    DiscourseAPI.requestSearch({term, page, success: handleSearchSuccess, error: handleSearchError});
  }
}
