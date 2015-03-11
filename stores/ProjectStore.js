/* @flow */
"use strict"
var React = require('react/addons');
var _ = require('lodash');
var moment = require('moment');
var RepoStore = require('stores/RepoStore');
var assign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    { createListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');

const {
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_SEARCH,
  REQUEST_PROJECT_SEARCH_SUCCESS,
  REQUEST_PROJECT_SEARCH_ERROR
} = require('../constants/ActionTypes');

var _projects: mixed = {};
var _lastPageNum = null;

const PER_PAGE = 10;
var offset = PER_PAGE

var ProjectStore = createListStore({
  getAll(page=1){
    let offset = (page - 1) * PER_PAGE;
    let total = ProjectStore.getList().getTotal();
    let lastResult = ProjectStore.getList().getLastResult();
    let filterFn = _.identity;
    if(total < PER_PAGE)
      filterFn = (item)=>{return lastResult.indexOf(item.name) != -1 }
    return _.chain(_projects).values().sortBy((item)=>{
      // Sort the projects by the last update of their repo
      let repo = RepoStore.get(item.githubDetails);
      let lastUpdated = Date.parse(repo.pushedAt)/1000;
      return lastUpdated
    }).reverse().filter(filterFn).value().slice(offset,PER_PAGE*page);
   },
   getFirst(name){
    return _.chain(_projects).findWhere({name}).value()
   },
   get(props){
    return _.chain(_projects).where(props).value()
   }
});

var handleListAction = createListActionHandler({request: REQUEST_PROJECT_SEARCH, success: REQUEST_PROJECT_SEARCH_SUCCESS, error: REQUEST_PROJECT_SEARCH_ERROR});


ProjectStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {result} = response || [],
      {project} = entities || {},
      {projects_CfAPI} = entities || [];


  if(projects_CfAPI){
    _projects = mergeIntoBag(_projects, projects_CfAPI);
  }

  handleListAction(action, ProjectStore.getList(), ProjectStore.emitChange);




});



module.exports = ProjectStore;
