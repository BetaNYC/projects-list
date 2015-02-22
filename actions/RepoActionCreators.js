'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    GithubAPI = require('apis/GithubAPI'),
    SeedStore = require('stores/SeedStore'),
    invariant = require('react/lib/invariant');

var RepoActionCreators = {
  requestRepoSearch({q,sort,order}){
    if(!q)
      q = '';
    if(!sort)
      sort = 'star';
    if(!order)
      order = 'desc';


    var repos = SeedStore.getAll();
    if(repos && repos.length > 0){

      AppDispatcher.handleViewAction({
        type: ActionTypes.REQUEST_REPO_SEARCH,
        q: q,
        sort: sort,
        order: order
      });
      GithubAPI.searchRepos(q,sort,order,repos);
    } else{

      var {
        request,
        normalizeRepoContentResponse
      } = require('utils/APIUtils');

      var seedQ = '/repos/BetaNYC/betanyc-projects-list/contents/REPOS';
      request(seedQ).end(function(res) {
        if(!res.ok){}
        var _repoNames;
        var values = require('lodash/object/values');
        var {extractRepoNames} = require('../utils/StoreUtils');
        var response = normalizeRepoContentResponse(res);
        var entities = response.entities;
        var fetchedSeeds = entities && values(values(entities)[0])
        var {decodeField} = require('../utils/APIUtils');

        if (fetchedSeeds) {
          // Decode the content && parse the field to extract the repo names as an array
          _repoNames = extractRepoNames(decodeField(fetchedSeeds[0].content, 'base64'));
          // TODO: create a timestamp for when the seeds were fetched
          GithubAPI.searchRepos(q,sort,order,_repoNames);
        }
      })
    }
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
