'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    { createStore, mergeIntoBag, isInBag } = require('utils/StoreUtils');
var map = require('lodash/collection/map');
var marked = require('marked');

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
      {response} = action || {},
      {result} = response || {},
      {entities} = response || {},
      {issues_CfAPI} = entities || {};

  if (issues_CfAPI) {

    map(issues_CfAPI, (issue)=>{
      if(issue.body){
        issue.body = marked(issue.body);
      }else{
        issue.body = "<i class='text-muted'>No description provided.</i>";
      }
      return issue
    })
    _issues = mergeIntoBag(_issues, issues_CfAPI);
    IssueStore.emitChange();
  }
});

module.exports = IssueStore;