/* @flow */

"use strict"

var _ = require('underscore');
var moment = require('moment');
var objectAssign = require('object-assign');
var EventEmitter = require('eventemitter3');
var emitter = new EventEmitter();
var Dispatcher = require('flux').Dispatcher;
var repoDispatcher = new Dispatcher();
var React = require('react');
var $ = require('jquery');
var CHANGE_EVENT = 'change';

var GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories\?q\=civic.json\&filename:civic.json\&sort\=stars\&order\=desc&client_id=a81bb8768be5bb8012d0&client_secret=b4e7a1a9e782537908ed4af80ad172932fc384af';

// TODO: configure the Flux dispatcher for this store
// TODO: create an action for Repos
var REPOS = 'repos';
var ISSUES = 'issues';
var getRepos = function() {return JSON.parse(localStorage.getItem(REPOS)) || [];};
var getIssues = function() {return JSON.parse(localStorage.getItem(ISSUES)) || [];};
var repos = getRepos();
var issues = getIssues();
var repos_count = 0;
// var REPOS_LAST_FETCH_DATE = 'repos_last_fetch_date';
var REPOS_NEXT_FETCH_DATE = 'repos_next_fetch_date';

var fetchRepos = function():any {
  $.getJSON(GITHUB_SEARCH_URL).then(function(result) {

    localStorage.setItem(REPOS, JSON.stringify(result.items))
    // localStorage.setItem(REPOS_LAST_FETCH_DATE, Date.now())
    localStorage.setItem(REPOS_NEXT_FETCH_DATE, moment().minutes() + 1)

    Repo.emit(CHANGE_EVENT);
  })
};

var Issue = objectAssign(emitter,{
  addChangeListener: function(listener):void {
    Issue.on(CHANGE_EVENT, listener);
    return;
  },
  removeChangeListener: function(listener):void {
    Issue.off(CHANGE_EVENT, listener);
    return;
  },
  dispatchIndex: repoDispatcher.register(function(payload) {
    var type = payload.actionType;
    var action  = payload.action;
    var announce = true;


  })
});


var Repo = objectAssign(emitter,{
  addChangeListener: function(listener):void {
    Repo.on(CHANGE_EVENT, listener);
    return;
  },
  removeChangeListener: function(listener):void {
    Repo.off(CHANGE_EVENT, listener);
    return;
  },

  getAllRepos: function(): Array<any> {
    var repos_next_fetch_date = parseInt(localStorage.getItem(REPOS_NEXT_FETCH_DATE));
    // localStorage.setItem(REPOS_NEXT_FETCH_DATE, null);
    if (!repos_next_fetch_date || Date.now() < repos_next_fetch_date) {
      console.log(repos_next_fetch_date,moment().minutes());
      fetchRepos();
    };
    return getRepos();
  },
  dispatchIndex: repoDispatcher.register(function(payload) {
    var type = payload.actionType;
    var action  = payload.action;
    var announce = true;


  })

});

// setTimeout(function() {console.log(EventEmitter);}, 10)




module.exports = Repo;