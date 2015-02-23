'use strict';
var RepoServerActionCreators = require('actions/RepoServerActionCreators');
var IssueServerActionCreators = require('../actions/IssueServerActionCreators');
var RepoStore = require('stores/RepoStore');
var invariant = require('react/lib/invariant');

var {
  request,
  normalizeIssueArrayResponse,
  normalizeRepoContentResponse,
  normalizeRepoSearchArrayResponse
} = require('utils/APIUtils');

var GithubAPI = {
  requestRepoNames({error, success}){
    let q = '/repos/BetaNYC/betanyc-project-repos/contents/REPOS';
    request(q).end((res)=> {
      if(!res.ok){ error(res.text); }
      success(normalizeRepoContentResponse(res));
    })
  },

  searchRepos({q, sort, order, repos, success, error}){
    invariant(repos.length > 0, 'You must search in at least 1 repo');
    if(q==''){q='a'};
    let repoQ = repos.map((repo)=>{return '+repo:' + repo}).join('');
    let qs = '/search/repositories?q=' + q + repoQ + '+fork:true+sort:'+ sort +'&order=' + order;
    request(qs).end((res)=> {
        let {ok} = res;
        if(!ok){ error({q, sort, order, repos, err: res.text}); }
        success(normalizeRepoSearchArrayResponse(res));
    });
  },

  getRepoContentsAtPath({fullName, path, error, success}){
    if(!path){path='/readme'}
    let q = '/repos/'+fullName+'/contents' + path;
    request(q).end((res)=> {
      if(!res.ok){ error(res.text); }
      let response = normalizeRepoContentResponse(res);
      // Add the fullName to the response to make it findable.
      response.fullName = fullName;
      success(response);
    })
  },

  getIssues(fullName){
    let q = '/repos/'+fullName+'/issues';
    request(q).end((res)=> {
      if(!res.ok){
        IssueServerActionCreators.handleIssuesError(res.text);
      }
      let response = normalizeIssueArrayResponse(res);
      RepoServerActionCreators.handleIssuesSuccess(response);
    })
  }
};


module.exports = GithubAPI;
