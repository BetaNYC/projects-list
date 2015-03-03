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
var normalizeProjectResponse = (response) => {
  var {objects} = response.body;
  return assign(normalize(camelizeKeys(objects), projectSchema));
};

var normalizeProjectArrayResponse = (response) => {
  var {objects, total, pages} = response.body;
  return assign(
    normalize(camelizeKeys(objects), arrayOf(projectSchema)), extractPaginationFromBody(response), {total: total});
};

// Main
var CfAPI = {
  requestProjects({q, sort_by, sort_dir, category, page, success, error}){
    var qs = '/projects';
    var per_page = 10;

    request(API_ROOT + qs).query({q,sort_by,sort_dir, categories: category, per_page, page}).end((res)=> {
        var {ok} = res;
        if(!ok){ error({q, sort_by, sort_dir, category, page, err: res.text}); }
        success(normalizeProjectArrayResponse(res));
    });
  },
  requestProject({name, success, error}){
    var qs = '/projects';

    // This query might return multiple results occasionally since name is not a unique identifier.
    request(API_ROOT + qs).query({name}).end((res)=> {
        var {ok} = res;
        if(!ok){ error({name, err: res.text}); }
        success(normalizeProjectArrayResponse(res));
    });
  }
};


module.exports = CfAPI;
