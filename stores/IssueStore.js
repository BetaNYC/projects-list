'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    { createStore, mergeIntoBag, isInBag } = require('utils/StoreUtils');

var _issues = {};

var IssueStore = createStore({
  contains(id, fields) {
    return isInBag(_issues, id, fields);
  },

  get(id) {
    return _issues[id];
  }
});

IssueStore.dispatchToken = AppDispatcher.register(function (payload) {
  var {action} = payload || {},
      {response} = action|| {},
      {entities} = response || {},
      {issues_CfAPI} = entities || {};

  if (issues_CfAPI) {
    _issues = mergeIntoBag(_issues, issues_CfAPI);
    IssueStore.emitChange();
  }
});

module.exports = IssueStore;