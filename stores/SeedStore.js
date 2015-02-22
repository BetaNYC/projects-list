/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    {createStore,extractRepoNames} = require('../utils/StoreUtils'),
    {decodeField} = require('../utils/APIUtils');

var _repoNames: Array<string> = [];

var SeedStore = createStore({
  wasFetchedRecently(){
    false
  },
  getAll(){return _repoNames}

});

SeedStore.dispatchToken = AppDispatcher.register((payload)=> {
  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedSeeds = entities && entities.seeds;

  if (fetchedSeeds) {
    // Decode the content && parse the field to extract the repo names as an array
    _repoNames = extractRepoNames(decodeField(fetchedSeeds.content, 'base64'));
    // TODO: create a timestamp for when the seeds were fetched
    SeedStore.emitChange();
  }
});



module.exports = SeedStore;
