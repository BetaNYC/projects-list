/* @flow */
"use strict"
var React = require('react/addons');
var _ = require('lodash');
var ProjectStore = require('stores/ProjectStore');
var RepoStore = require('stores/RepoStore');
var assign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    { createListStore } = require('utils/PaginatedStoreUtils');

const {
  REQUEST_PROJECT_SUCCESS
} = require('constants/ActionTypes');

var _projects: Array<number> = [];

var ProjectsByQueryStore = createListStore({
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

ProjectsByQueryStore.dispatchToken = AppDispatcher.register((payload)=> {
  AppDispatcher.waitFor([ProjectStore.dispatchToken]);

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {result} = response || {},
      {project} = entities || {},
      {projects_CfAPI} = entities || [];


  if(projects_CfAPI || action.type == REQUEST_PROJECT_SUCCESS){
    // Assign the results array. We only want the ids.
    _projects = result;
    ProjectsByQueryStore.emitChange();
  }

});



module.exports = ProjectsByQueryStore;
