/* @flow */
"use strict"
var React = require('react/addons');
var _ = require('lodash');
var RepoStore = require('stores/RepoStore');
var assign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    { createListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');

const {
  REQUEST_PROJECT,
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_ERROR
} = require('../constants/ActionTypes');

var _projects: mixed = {};

var ProjectStore = createListStore({
  getAll(){
    return _projects;
   },
   getFirst(props){
    return _.chain(_projects).findWhere(props).value()
   },
   get(props){
    return _.chain(_projects).where(props).value()
   }
});
  
var handleListAction = createListActionHandler({
  request: REQUEST_PROJECT,
  success: REQUEST_PROJECT_SUCCESS,
  error: REQUEST_PROJECT_ERROR
});


ProjectStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {result} = response || {},
      {project} = entities || {},
      {projects_CfAPI} = entities || [];


  if(projects_CfAPI){
    _projects = mergeIntoBag(_projects, projects_CfAPI);
  }

  handleListAction(action, ProjectStore.getList(), ProjectStore.emitChange);




});



module.exports = ProjectStore;
