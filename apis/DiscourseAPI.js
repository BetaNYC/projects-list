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
var API_ROOT = 'http://talk.beta.nyc';

// Schemas
var postSchema  = new Schema('post_DiscourseAPI', { idAttribute: 'id' });
var searchSchema  = new Schema('search_DiscourseAPI', { idAttribute: 'id' });
searchSchema.define({
  posts: arrayOf(postSchema)
});

// Helper functions
var normalizeDiscussionsResponse = (response) => {
  return assign(normalize(camelizeKeys(arrayOf(response.body)), searchSchema));
};

// Main
var DiscourseAPI = {
  requestSearch({term, page, success, error}){
    var qs = '/search.json';

    request(API_ROOT + qs).query({term, page}).end((res)=> {
        var {ok} = res;
        if(!ok){ error({term, page, err: res.text}); }
        // Add the repoName to the response.
        let normalResponse = normalizeDiscussionsResponse(res);
        success(normalResponse);
    });
  }
};

module.exports = DiscourseAPI;
