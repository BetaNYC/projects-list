'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    CfAPI = require('apis/CfAPI'),
    RepoStore = require('stores/RepoStore'),
    values = require('lodash/object/values'),
    invariant = require('react/lib/invariant'),
    {extractRepoNames} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils'),
    {handleProjectSearchError, handleProjectSearchSuccess} = require('actions/ProjectServerActionCreators');

const {
  REQUEST_PROJECT_SEARCH
} = require('constants/ActionTypes');

var RepoActionCreators;

export default RepoActionCreators = {
  requestProjects({q,sort,order}){
    AppDispatcher.handleViewAction({ type: REQUEST_PROJECT_SEARCH, q, sort, order });

    CfAPI.requestProjects({q, sort_by: sort, order_by: order, success: handleProjectSearchSuccess, error: handleProjectSearchError });
  }
};

