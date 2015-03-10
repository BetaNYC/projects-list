'use strict';

var union = require('lodash/array/union'),
    without = require('lodash/array/without'),
    invariant = require('react/lib/invariant');

class PaginatedList {
  constructor(ids) {
    this._ids = ids || [];
    this._lastResult = ids || [];
    this._pageCount = 0;
    this._total = 0;
    this._nextPageUrl = null;
    this._lastPageUrl = null;
    this._isExpectingPage = false;
  }

  getIds() {
    return this._ids;
  }

  getLastResult() {
    return this._lastResult;
  }

  getPageCount() {
    return this._pageCount;
  }

  getTotal(){
    return this._total;
  }

  isExpectingPage() {
    return this._isExpectingPage;
  }

  getNextPageUrl() {
    return this._nextPageUrl;
  }

  isLastPage() {
    return this.getNextPageUrl() === null && this.getPageCount() > 0;
  }

  prepend(id) {
    this._ids = union([id], this._ids);
  }

  remove(id) {
    this._ids = without(this._ids, id);
  }

  expectPage() {
    invariant(!this._isExpectingPage, 'Cannot call expectPage twice without prior cancelPage or receivePage call.');
    this._isExpectingPage = true;
  }

  cancelPage() {
    invariant(this._isExpectingPage, 'Cannot call cancelPage without prior expectPage call.');
    this._isExpectingPage = false;
  }

  receivePage({newIds, nextPageUrl, lastPageUrl, total}) {
    invariant(this._isExpectingPage, 'Cannot call receivePage without prior expectPage call.');

    if (newIds.length) {
      this._ids = union(this._ids, newIds);
    }

    this._lastResult = newIds;
    this._total = total;
    this._isExpectingPage = false;
    this._nextPageUrl = nextPageUrl || null;
    this._lastPageUrl = lastPageUrl || null;
    this._pageCount++;
  }
}

module.exports = PaginatedList;