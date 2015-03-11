'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    CfAPI = require('apis/CfAPI'),
    RepoStore = require('stores/RepoStore'),
    ProjectStore = require('stores/ProjectStore'),
    values = require('lodash/object/values'),
    invariant = require('react/lib/invariant'),
    {extractRepoNames} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils'),
    {
      handleProjectError: error,
      handleProjectSuccess: success
    } = require('actions/ProjectServerActionCreators');

const {
  REQUEST_PROJECT
} = require('constants/ActionTypes');

var ProjectActionCreators;

module.exports = ProjectActionCreators = {
  requestProject({name}){
    if(ProjectStore.get({name}).length != 0){
      // Return instantly if the project is available locally.
      ProjectStore.emitChange();
    }else{
      AppDispatcher.handleViewAction({ type: REQUEST_PROJECT, name });

      CfAPI.requestProject({ name, success, error });
    }
  },
  requestProjects({q, sort_by, sort_dir, category, page}){

    AppDispatcher.handleViewAction({
      type: REQUEST_PROJECT,
      q, sort_by, sort_dir, category, page
    });

    CfAPI.requestProjects({
      q, sort_by, sort_dir, category, page, success, error
    });
  }
};

