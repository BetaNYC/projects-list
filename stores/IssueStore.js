'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    { createStore, mergeIntoBag, isInBag } = require('utils/StoreUtils');

var _issues = {};

var IssueStore = createStore({
  contains(fullName, fields) {
    return isInBag(_issues, fullName, fields);
  },

  get(fullName) {
    return _issues[fullName];
  }
});

IssueStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedIssues = entities && entities.issues;

  if (fetchedIssues) {
    mergeIntoBag(_issues, fetchedIssues);
    IssueStore.emitChange();
  }
});

module.exports = IssueStore;