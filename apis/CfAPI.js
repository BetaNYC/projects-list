'use strict';
var humps = require('humps'),
    {Schema,arrayOf,normalize} = require('normalizr'),
    assign = require('object-assign'),
    {camelizeKeys} = humps;
var {
  request,
  extractPaginationFromBody
} = require('utils/APIUtils');

// Constants
var API_ROOT = 'http://betanyc-api.herokuapp.com/api';

// Schema
var userSchema  = new Schema('users', { idAttribute: 'login' });
var repoSchema  = new Schema('repos', { idAttribute: 'id' });
repoSchema.define({
  owner: userSchema
})
var projectSchema  = new Schema('projects', { idAttribute: 'id' });
projectSchema.define({
  githubDetails: repoSchema
})

// Helper functions
var normalizeProjectArrayResponse = (response) => {
  var {objects, total, pages} = response.body;
  return assign(
    normalize(camelizeKeys(objects), arrayOf(projectSchema)), extractPaginationFromBody(response), {total: total});
};

// Main
var CfAPI = {
  requestProjects({q, sort_by, sort_dir, success, error}){
    let qs = '/projects';
    request(API_ROOT + qs).query({q,sort_by,sort_dir}).end((res)=> {
        let {ok} = res;
        if(!ok){ error({q, sort_by, sort_dir, repos, err: res.text}); }
        success(normalizeProjectArrayResponse(res));
    });
  }
};


module.exports = CfAPI;
