'use strict';
var RepoServerActionCreators = require('actions/RepoServerActionCreators');
var IssueServerActionCreators = require('../actions/IssueServerActionCreators');

var {
  request,
  normalizeIssueArrayResponse,
  normalizeRepoContentResponse,
  normalizeRepoArrayResponse
} = require('utils/APIUtils');

var GithubAPI = {

  requestSeedRepos(){
    var q = '/repos/BetaNYC/betanyc-projects-list/contents/REPOS';
    request(q).end(function(res) {
      if(!res.ok){
        RepoServerActionCreators.handleSearchError(err);
      }
      var response = normalizeRepoContentResponse(res);
      RepoServerActionCreators.handleSeedsSuccess(response);
    })
  },

  searchRepos(q: string, sort: string, order: string, repos: array){
    var repoQ = repos.map((repo)=>{return '+repo:' + repo}).join('');
    var qs = '/search/repositories?q=' + q + repoQ + '+fork:true+sort:'+ sort +'&order=' + order;

    request(qs).end(function(res) {
        if(!res.ok){
          RepoServerActionCreators.handleSearchError(err);
        }
        var response = normalizeRepoArrayResponse(res);
        RepoServerActionCreators.handleSearchSuccess(response);
    });
  },

  getRepoContentsAtPath(fullName, path){
    if(!path){path='/readme'}
    var q = '/repos/'+fullName+'/contents' + path;
    request(q).end(function(res) {
      if(!res.ok){
        RepoServerActionCreators.handleRepoContentError(err);
      }
      var response = normalizeRepoContentResponse(res);
      // Add the fullName to the response to make it findable.
      response.fullName = fullName;
      RepoServerActionCreators.handleRepoContentSuccess(response);
    })
  },

  getIssues(fullName){
    var q = '/repos/'+fullName+'/issues';
    request(q).end(function(res) {
      if(!res.ok){
        IssueServerActionCreators.handleIssuesError(err);
      }
      var response = normalizeIssueArrayResponse(res);
      RepoServerActionCreators.handleIssuesSuccess(response);
    })
  }
};


module.exports = GithubAPI;
