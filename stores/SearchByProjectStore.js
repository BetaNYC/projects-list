/* @flow */
"use strict"
var React = require('react/addons');
var _ = require('lodash');
var ProjectStore = require('stores/ProjectStore');
var RepoStore = require('stores/RepoStore');
var assign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    { createListStore } = require('utils/PaginatedStoreUtils');

var _projects: Array<number> = [];

var SearchByProjectStore = createListStore({
  getAll(){
    // Map over the results, selecting items from ProjectStore
    let ret = _projects.map((name)=>{return ProjectStore.getFirst({name})});
    // Sort the projects by the last update of their repo
    return _.chain(ret).compact().sortBy((item)=>{
      let repo = RepoStore.get(item.githubDetails);
      let lastUpdated = Date.parse(repo.pushedAt)/1000;
      return lastUpdated
    }).reverse().value();
  }
});

SearchByProjectStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([ProjectStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {result} = response || {},
      {project} = entities || {},
      {projects_CfAPI} = entities || [];


  if(projects_CfAPI){
    // Assign the results array. We only want the ids.
    _projects = result;
    SearchByProjectStore.emitChange();
  }

});



module.exports = SearchByProjectStore;
