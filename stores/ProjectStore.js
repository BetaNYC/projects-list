/* @flow */
"use strict"
var React = require('react/addons');
var Qs = require('qs');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {createStore,extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

const {
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_SEARCH_SUCCESS,
  REQUEST_PROJECT_PAGINATE_SUCCESS
} = require('../constants/ActionTypes');

var _projects: Array<mixed> = [];
var _projectsCount: number = 0;
var _nextPageNum = 2;

var ProjectStore = createStore({
  getAll(){return _projects},
  getByName(name){return _projects.filter((project)=>{return project.name == name})},
  getProjectsCount(){return _projectsCount},
  getNextPageNum(){return _nextPageNum}
});

ProjectStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {nextPageUrl} = response || {},
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

  switch(action.type){
    case REQUEST_PROJECT_SUCCESS:
      if(projects_CfAPI){
        let new_projects = result.map( (item)=> {return projects_CfAPI[item] });
        _projects = new_projects;
        _projectsCount = response.total;
        announce = true;
      }else{
        _projects = [];
        _projectsCount = 0;
        announce = true;
      }
      break;
    case REQUEST_PROJECT_SEARCH_SUCCESS:
      if(projects_CfAPI){
        let new_projects = result.map( (item)=> {return projects_CfAPI[item] });
        _projects = new_projects;
        _projectsCount = response.total;
        announce = true;
      }else{
        _projects = [];
        _projectsCount = 0;
        announce = true;
      }
      break;
    case REQUEST_PROJECT_PAGINATE_SUCCESS:
      if(projects_CfAPI){
        let new_projects = result.map( (item)=> {return projects_CfAPI[item] });
        _projects = _projects.concat(new_projects);
        announce = true;
      }
      break;

  }

  if(announce)
    ProjectStore.emitChange();
});



export default ProjectStore;
