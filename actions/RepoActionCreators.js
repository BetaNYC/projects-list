'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    GithubAPI = require('apis/GithubAPI'),
    RepoStore = require('stores/RepoStore'),
    values = require('lodash/object/values'),
    invariant = require('react/lib/invariant'),
    {extractRepoNames} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils'),
    {handleRepoSearchSuccess, handleRepoSearchError} = require('actions/RepoServerActionCreators'),
    {handleSeedReposError, handleSeedReposSuccess} = require('actions/RepoServerActionCreators');

const {
  REQUEST_REPO_SEARCH,
  REQUEST_SEEDS
} = require('constants/ActionTypes');

var RepoActionCreators = {
  requestRepoSearch({q,sort,order}){
    q = q || '';
    sort = sort || 'star';
    order = order || 'desc';

    let repos = RepoStore.getAll();
    if(repos && repos.length > 0){
      AppDispatcher.handleViewAction({ type: REQUEST_REPO_SEARCH, q, sort, order });
      GithubAPI.searchRepos({q, sort, order, repos, success: handleRepoSearchSuccess, error: handleRepoSearchError });
    } else{
      GithubAPI.requestRepoNames({success: (response)=> {
        let {entities} = response;
        let {content} = entities || {};
        // Decode the content && parse the field to extract the repo names as an array
        repos = extractRepoNames(decodeField(values(content)[0].content, 'base64'));
        // TODO: create a timestamp for when the seeds were fetched
        GithubAPI.searchRepos({q, sort, order, repos, success: handleRepoSearchSuccess, error: handleRepoSearchError });
      }});
    }
  },

  requestRepoNames(){
    if (RepoStore.wasFetchedRecently()) { return; }

    AppDispatcher.handleViewAction({ type: REQUEST_SEEDS });
    GithubAPI.requestRepoNames({error: handleSeedReposError, success: handleSeedReposSuccess});
  }
};

module.exports = RepoActionCreators;
