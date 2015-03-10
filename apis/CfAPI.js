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

// Schemas
var userSchema  = new Schema('users_CfAPI', { idAttribute: 'login' });
var repoSchema  = new Schema('repos_CfAPI', { idAttribute: 'id' });
var issueSchema  = new Schema('issues_CfAPI', { idAttribute: 'id' });
var projectSchema  = new Schema('projects_CfAPI', { idAttribute: 'name' });
projectSchema.define({
  githubDetails: repoSchema,
  issues: arrayOf(issueSchema)
})
repoSchema.define({
  owner: userSchema
})
issueSchema.define({
  project: projectSchema
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

var normalizeIssuesArrayResponse = (response) => {
  var {objects, total, pages} = response.body;
  return assign(
    normalize(camelizeKeys(objects), arrayOf(issueSchema)), extractPaginationFromBody(response), {total: total});
};

// Main
var CfAPI = {
  requestIssues({repoName, per_page, page, success, error}){
    var qs = '/issues';
    var per_page = 10;

    request(API_ROOT + qs).query({project_name: repoName, per_page, page}).end((res)=> {
        var {ok} = res;
        if(!ok){ error({repoName, per_page, page, err: res.text}); }
        // Add the repoName to the response.
        let normalResponse = normalizeIssuesArrayResponse(res);
        normalResponse.repoName = repoName;
        success(normalResponse);
    });
  },
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
