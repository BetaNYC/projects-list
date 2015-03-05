'use strict';
var humps = require('humps'),
    {Schema,arrayOf,normalize} = require('normalizr'),
    assign = require('object-assign'),
    {camelizeKeys} = humps;
var {
  request,
  extractPaginationFromBody
} = require('utils/APIUtils');


var API_ROOT = 'https://api.github.com';
var API_KEY = {token: '234e7011ae7c3b56ed79d13cb34059f86f36576c'};


// Schemas
var contentSchema = new Schema('content_GithubAPI', { idAttribute: 'name' });

// Normalizers
var normalizeRepoContentResponse = (response)=>{
  return assign(normalize(camelizeKeys(response.body), contentSchema));
};


var GithubAPI = {
  getReadme({repoName, owner, error, success}){
    let fullName = owner + '/' + repoName;
    let path='readme';
    let q = '/repos/'+fullName+'/' + path;
    request(API_ROOT + q).query(API_KEY).end((res)=> {
      if(!res.ok){
        error(res.text);
        return;
      }
      let response = normalizeRepoContentResponse(res);
      // Add the fullName to the response to make it findable.
      response.fullName = fullName;
      success(response);
    }).catch(error);
  }
};


module.exports = GithubAPI;
