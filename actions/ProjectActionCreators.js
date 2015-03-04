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
      handleProjectError,
      handleProjectSuccess,
      handleProjectSearchError,
      handleProjectSearchSuccess,
      handleProjectPaginateSuccess,
      handleProjectPaginateError
    } = require('actions/ProjectServerActionCreators');

const {
  REQUEST_PROJECT,
  REQUEST_PROJECT_SEARCH,
  REQUEST_PROJECT_PAGINATE
} = require('constants/ActionTypes');

var ProjectActionCreators;

export default ProjectActionCreators = {
  requestProject({name}){
    if(ProjectStore.getByName(name).length != 0){
      // Return instantly if the project is available locally.
      ProjectStore.emitChange();
    }else{
      AppDispatcher.handleViewAction({ type: REQUEST_PROJECT, name });
      CfAPI.requestProject({name, success: handleProjectSuccess, error: handleProjectError });
    }
  },
  requestProjects({q,sort_by, sort_dir, category, page}){
    AppDispatcher.handleViewAction({ type: REQUEST_PROJECT_SEARCH, q, sort_by, sort_dir, category, page });

    CfAPI.requestProjects({q, sort_by, sort_dir, category, page, success: handleProjectSearchSuccess, error: handleProjectSearchError });
  }
};

