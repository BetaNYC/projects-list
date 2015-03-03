/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {createStore,extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

const {
  REQUEST_PROJECT_SEARCH_SUCCESS
} = require('../constants/ActionTypes');

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
  if (projects) {
    _projects = result.map( (item)=> {return projects[item] });
    _projectsCount = response.total;
    ProjectStore.emitChange();
  }
  switch(action.type){
    case REQUEST_PROJECT_SEARCH_SUCCESS:
      if(!projects){
        _projects = [];
        _projectsCount = 0;
        ProjectStore.emitChange();
      }

  }

});



export default ProjectStore;
