'use strict';
var RepoServerActionCreators = require('actions/RepoServerActionCreators');
var IssueServerActionCreators = require('../actions/IssueServerActionCreators');
var RepoStore = require('stores/RepoStore');
var invariant = require('react/lib/invariant');


var API_ROOT = 'https://api.github.com';
var API_KEY = {token: '5029595087e21aaf90b56772b151e57ab6c68f01'};

var {
  request,
  normalizeIssueArrayResponse,
  normalizeRepoContentResponse,
  normalizeRepoSearchArrayResponse
} = require('utils/APIUtils');

var GithubAPI = {
  requestRepoNames({error, success}){
    let q = '/repos/BetaNYC/betanyc-project-repos/contents/REPOS';
    request(API_ROOT + q).query(API_KEY).end((res)=> {
      if(!res.ok){ error(res.text); }
      success(normalizeRepoContentResponse(res));
    })
  },

  searchRepos({q, sort, order, repos, success, error}){
    invariant(repos.length > 0, 'You must search in at least 1 repo');
    if(q==''){q='a'};
    let repoQ = repos.map((repo)=>{return '+repo:' + repo}).join('');
    let qs = '/search/repositories?q=' + q + repoQ + '+fork:true+sort:'+ sort +'&order=' + order;
    request(API_ROOT + qs).end((res)=> {
        let {ok} = res;
        if(!ok){ error({q, sort, order, repos, err: res.text}); }
        success(normalizeRepoSearchArrayResponse(res));
    });
  },

  getRepoContentsAtPath({fullName, path, error, success}){
    if(!path){path='/readme'}
    let q = '/repos/'+fullName+'/contents' + path;
    request(API_ROOT + q).query(API_KEY).end((res)=> {
      if(!res.ok){ error(res.text); }
      let response = normalizeRepoContentResponse(res);
      // Add the fullName to the response to make it findable.
      response.fullName = fullName;
      success(response);
    })
  },

  getIssues(fullName){
    let q = '/repos/'+fullName+'/issues';
    request(API_ROOT + q).query(API_KEY).end((res)=> {
      if(!res.ok){
        IssueServerActionCreators.handleIssuesError(res.text);
      }
      let response = normalizeIssueArrayResponse(res);
      RepoServerActionCreators.handleIssuesSuccess(response);
    })
  }
};


module.exports = GithubAPI;
