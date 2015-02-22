'use strict';

var { EventEmitter } = require('events'),
    assign = require('object-assign'),
    forEach = require('lodash/collection/each'),
    isFunction = require('lodash/lang/isFunction'),
    shallowEqual = require('react/lib/shallowEqual'),
    CHANGE_EVENT = 'change';

var StoreUtils = {
  extractRepoNames(content){
    // Magic REPO file parser.
    return content.split('-beta-\n')[1].split('\n');;
  },
  createStore(spec) {
    var store = assign({
      emitChange() {
        this.emit(CHANGE_EVENT);
      },

      addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
      },

      removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
      }
    }, spec, EventEmitter.prototype);

    forEach(store, function (val, key) {
      if (isFunction(val)) {
        store[key] = store[key].bind(store);
      }
    });

    store.setMaxListeners(0);
    return store;
  },

  isInBag(bag, id, fields) {
    var item = bag[id];
    if (!bag[id]) {
      return false;
    }

    if (fields) {
      return fields.every(field => item.hasOwnProperty(field));
    } else {
      return true;
    }
  },

  mergeIntoBag(bag, entities, transform) {
    if (!transform) {
      transform = (x) => x;
    }

    for (var key in entities) {
      if (!entities.hasOwnProperty(key)) {
        continue;
      }

      if (!bag.hasOwnProperty(key)) {
        bag[key] = transform(entities[key]);
      } else if (!shallowEqual(bag[key], entities[key])) {
        bag[key] = transform(assign({}, bag[key], entities[key]));
      }
    }
  }
};

module.exports = StoreUtils;