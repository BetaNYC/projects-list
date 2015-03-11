'use strict';

var StoreUtils = require('utils/StoreUtils'),
    PaginatedList = require('utils/PaginatedList'),
    invariant = require('react/lib/invariant'),
    assign = require('object-assign'),
    {createStore} = StoreUtils;

var PROXIED_PAGINATED_LIST_METHODS = [
  'getIds', 'getPageCount', 'getNextPageUrl',
  'isExpectingPage', 'isLastPage'
];

function createListStoreSpec({ getList, callListMethod }) {
  var spec = {getList};

  PROXIED_PAGINATED_LIST_METHODS.forEach(method => {
    spec[method] = function (...args) {
      return callListMethod(method, args);
    };
  });

  return spec;
}

/**
 * Creates a simple paginated store that represents a global list (e.g. feed).
 */
function createListStore(spec) {
  var list = new PaginatedList();

  function getList() {
    return list;
  }

  function callListMethod(method, args) {
    return list[method].call(list, args);
  }

  return createStore(
    assign(createListStoreSpec({ getList, callListMethod }), spec)
  );
}

/**
 * Creates an indexed paginated store that represents a one-many relationship
 * (e.g. user's posts). Expects foreign key ID to be passed as first parameter
 * to store methods.
 */
function createIndexedListStore(spec) {
  var lists = {},
      prefix = 'ID_';

  function getList(id) {
    var key = prefix + id;
    if (!lists[key]) {
      lists[key] = new PaginatedList();
    }

    return lists[key];
  }

  function callListMethod(method, args) {
    var id = args.shift();
    if (typeof id ===  'undefined') {
      throw new Error('Indexed pagination store methods expect ID as first parameter.');
    }

    var list = getList(id);
    return list[method].call(list, args);
  }

  return createStore(
    assign(createListStoreSpec({ getList, callListMethod }), spec)
  );
}

/**
 * Creates a handler that responds to list store pagination actions.
 */
 function createListActionHandler(actions) {
  var {
    request: requestAction,
    error: errorAction,
    success: successAction
  } = actions;

  invariant(requestAction, 'Pass a valid request action.');
  invariant(errorAction, 'Pass a valid error action.');
  invariant(successAction, 'Pass a valid success action.');

  return function (action, list, emitChange) {
    switch (action.type) {
    case requestAction:
      if(list.isExpectingPage())
        list.cancelPage()

      list.expectPage();
      emitChange();
      break;

    case errorAction:
      list.cancelPage();
      emitChange();
      break;

    case successAction:
      let {result,nextPageUrl,total,lastPageUrl} = action.response;
      list.receivePage({
        newIds: result, nextPageUrl, total, lastPageUrl
      });
      emitChange();
      break;
    }
  };
}

module.exports = { createListStoreSpec, createListStore, createIndexedListStore, createListActionHandler }