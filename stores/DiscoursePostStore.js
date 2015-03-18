var React = require('react/addons');
var AppDispatcher = require('dispatchers/AppDispatcher');
var { createListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');


var _posts = {};

var DiscoursePostStore;
DiscoursePostStore = createListStore({
  getAll(){
    // Sort the projects by the last update of their repo
    return _.chain(_posts).compact().sortBy((item)=>{
      let lastUpdated = Date.parse(item.updatedAt)/1000;
      return lastUpdated
    }).reverse().value();
  }
});

const {
  REQUEST_DISCUSSIONS,
  REQUEST_DISCUSSIONS_SUCCESS,
  REQUEST_DISCUSSIONS_ERROR
} = require('constants/ActionTypes');

DiscoursePostStore.dispatchToken = AppDispatcher.register((payload)=>{
  var {action} = payload || {},
      {response} = action || {},
      {result} = response || {},
      {entities} = response || {};

    switch(action.type){
      case REQUEST_DISCUSSIONS_SUCCESS:
        console.log(entities);
        break;
    }

})


module.exports = DiscoursePostStore;