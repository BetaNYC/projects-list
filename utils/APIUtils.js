'use strict';

var humps = require('humps'),
    normalizr = require('normalizr'),
    camelizeKeys = humps.camelizeKeys,
    Schema = normalizr.Schema,
    arrayOf = normalizr.arrayOf,
    normalize = normalizr.normalize,
    assign = require('object-assign'),
    superagent = require('superagent');

var API_ROOT = 'https://api.github.com';
var API_KEY = {client_id: 'a81bb8768be5bb8012d0', client_secret: 'b4e7a1a9e782537908ed4af80ad172932fc384af'};

var seeds   = new Schema('seeds', { idAttribute: 'id' });
var repo    = new Schema('repo', { idAttribute: 'fullName' });
var issue   = new Schema('issue', { idAttribute: 'id' });
var content = new Schema('content', { idAttribute: 'url' });


var APIUtils = {
  request(endpoint) {
    if (endpoint.indexOf(API_ROOT) === -1) {
      endpoint = API_ROOT + endpoint;
    }

    return superagent(endpoint).query(API_KEY);
  },
  decodeField(field, encoding){
    if(field)
      return window.atob(field)
  },
  extractPagination(response) {
    var link = response.headers.link;
    if (!link) {
      return;
    }

    var nextLink = link.split(',').filter(s => s.indexOf('rel="next"') > -1)[0];
    if (!nextLink) {
      return;
    }

    return {
      nextPageUrl: nextLink.split(';')[0].slice(1, -1)
    };
  },

  normalizeIssueResponse(response) {
    return assign(normalize(camelizeKeys(response.body), issue), APIUtils.extractPagination(response));
  },

  normalizeIssueArrayResponse(response) {
    return assign(normalize(camelizeKeys(response.body), arrayOf(issue)), APIUtils.extractPagination(response));
  },

  normalizeRepoContentResponse(response) {
    return assign(normalize(camelizeKeys(response.body), content), APIUtils.extractPagination(response));
  },

  normalizeRepoResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), repo), APIUtils.extractPagination(response)
    );
  },

  normalizeRepoArrayResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), arrayOf(repo)), APIUtils.extractPagination(response)
    );
  }
};

module.exports = APIUtils;