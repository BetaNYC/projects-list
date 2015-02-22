'use strict';
var RepoServerActionCreators = require('actions/RepoServerActionCreators');
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
  searchRepos(q,repos){
    var repoQ = repos.map((repo)=>{return '+repo:' + repo}).join('');
    var qs = '/search/repositories?q=' + q + repoQ + '+fork:true+sort:stars&order=desc';

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



