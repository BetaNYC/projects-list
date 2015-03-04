/* @flow */
"use strict"
var React = require('react/addons');
var Qs = require('qs');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    { createIndexedListStore, createListActionHandler } = require('utils/PaginatedStoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    findWhere = require('lodash/collection/findWhere'),
    where = require('lodash/collection/where'),
    {decodeField} = require('../utils/APIUtils');

const {
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_SEARCH_SUCCESS,
  REQUEST_PROJECT_PAGINATE_SUCCESS
} = require('../constants/ActionTypes');

var _projects: Array<mixed> = [];
var _projectsCount: number = 0;
var _nextPageNum = 2;
var _lastPageNum = null;

var ProjectStore = createIndexedListStore({
  getAll(){return _projects},
  getFirstByName(name){ return findWhere(_projects, {name}) },
  getByName(name){return where(_projects, {name}) },
  getProjectsCount(){return _projectsCount},
  getNextPageNum(){return _nextPageNum},
  getLastPageNum(){return _lastPageNum}
});

ProjectStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {nextPageUrl} = response || {},
      {lastPageUrl} = response || {},
      {result} = response || [],
      {project} = entities || {},
      {projects_CfAPI} = entities || [];

  let announce = false;

  if (!isEmpty(project)) {
    _projects = mergeIntoBag(_projects, project);
    announce = true;
  }

  if(nextPageUrl){
    // see: https://gist.github.com/jlong/2428561
    let parser = document.createElement('a');
    parser.href = nextPageUrl;
    let {page} = Qs.parse(parser.search.slice(1));
    _nextPageNum = page;
  }else{
    _nextPageNum = null;
  }

  if(lastPageUrl){
    // see: https://gist.github.com/jlong/2428561
    let parser = document.createElement('a');
    parser.href = lastPageUrl;
    let {page} = Qs.parse(parser.search.slice(1));
    _lastPageNum = page;
  }else{
    // _lastPageNum = null;
  }

  if(projects_CfAPI){
    // handleListAction(
    //   action,
    //   ProjectStore.getList(query), ProjectStore.emitChange
    // );
    let new_projects = result.map( (item)=> {return projects_CfAPI[item] });
    _projects = new_projects;
    _projectsCount = response.total;
    announce = true;
  }else{
    _projects = [];
    _projectsCount = 0;
    announce = true;
  }

  if(announce)
    ProjectStore.emitChange();
});



export default ProjectStore;
