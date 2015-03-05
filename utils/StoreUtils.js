'use strict';

var { EventEmitter } = require('events'),
    assign = require('object-assign'),
    forEach = require('lodash/collection/each'),
    isFunction = require('lodash/lang/isFunction'),
    I = require('immutable'),
    CHANGE_EVENT = 'change';

var StoreUtils = {
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
    return I.fromJS(bag).mergeDeepWith(transform, I.fromJS(entities)).toJS();
  }
};

module.exports = StoreUtils;