'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    GithubAPI = require('utils/GithubAPI'),
    invariant = require('react/lib/invariant');

var RepoActionCreators = {

  requestRepoSearch({q,sort,order}){
    var seedRepos = SeedStore.getAll();
    if!(sort)
      sort = 'star';
    if!(order)
      order = 'desc';
    invariant(seedRepos.length > 0, 'The seed repos must contain at least one repo.')

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO_SEARCH,
      seedRepos: seedRepos,
      q: q,
      sort: sort,
      order: order
    });

    GithubAPI.searchRepos(q,sort,order,repos);
  },

  requestSeedRepos(){
    if (SeedStore.wasFetchedRecently()) { return; }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_SEEDS
    });

    GithubAPI.requestSeedRepos();
  }

};

module.exports = RepoActionCreators;
