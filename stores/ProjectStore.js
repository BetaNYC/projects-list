/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore,extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

var _projects: Array<mixed> = [];
var _projectsCount: number = 0;

var ProjectStore = createStore({
  getAll(){return _projects},
  getProjectsCount(){return _projectsCount}
});

ProjectStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {result} = response || [],
      {project} = entities || {},
      {projects} = entities || [];


  if (!isEmpty(project)) {
    _projects = mergeIntoBag(_projects, project);
    ProjectStore.emitChange();
  }
  if (!isEmpty(projects)) {
    _projects = result.map( (item)=> {return projects[item] });
    _projectsCount = response.total;
    ProjectStore.emitChange();
  }
});



export default ProjectStore;
