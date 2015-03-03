'use strict';

var humps = require('humps'),
    normalizr = require('normalizr'),
    camelizeKeys = humps.camelizeKeys,
    Schema = normalizr.Schema,
    arrayOf = normalizr.arrayOf,
    normalize = normalizr.normalize,
    assign = require('object-assign'),
    superagent = require('superagent');


var seeds       = new Schema('seeds', { idAttribute: 'id' });
var repoSearch  = new Schema('repoSearch', { idAttribute: 'fullName' });
var issue       = new Schema('issue', { idAttribute: 'id' });
var content     = new Schema('content', { idAttribute: 'url' });


var APIUtils = {
  request(endpoint) {
    return superagent(endpoint);
  },
  decodeField(field, encoding){
    if(field)
      return window.atob(field)
  },

  extractPaginationFromHeader(response) {
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

  extractPaginationFromBody(response) {
    var link = response.body.pages;
    if (!link) {
      return;
    }

    var nextLink = link.next;
    var lastLink = link.last;
    if (!nextLink) {
      return;
    }

    return {
      nextPageUrl: nextLink,
      lastPageUrl: lastLink
    };
  },

  normalizeIssueResponse(response) {
    return assign(normalize(camelizeKeys(response.body), issue), APIUtils.extractPaginationFromHeader(response));
  },

  normalizeIssueArrayResponse(response) {
    return assign(normalize(camelizeKeys(response.body), arrayOf(issue)), APIUtils.extractPaginationFromHeader(response));
  },

  normalizeRepoContentResponse(response) {
    return assign(normalize(camelizeKeys(response.body), content), APIUtils.extractPaginationFromHeader(response));
  },

  normalizeRepoSearchResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), repoSearch), APIUtils.extractPaginationFromHeader(response)
    );
  },

  normalizeRepoSearchArrayResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body.items), arrayOf(repoSearch)), APIUtils.extractPaginationFromHeader(response)
    );
  }
};

module.exports = APIUtils;