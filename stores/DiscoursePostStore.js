var React = require('react/addons');
var AppDispatcher = require('dispatchers/AppDispatcher');
var { createListStore, createListActionHandler } = require('utils/PaginatedStoreUtils');


var _posts = {};
var _topics = {};

var DiscoursePostStore;
DiscoursePostStore = createListStore({
  getAllPosts():array{
    // Sort the projects by the last update of their repo
    let ret = _.chain(_posts).toArray().sortBy((item)=>{
      return Date.parse(item.updatedAt)/1000;
    }).reverse().value();
    return ret;
  },
  getAllTopics():array{
    // Sort the projects by the last update of their repo
    let ret = _.chain(_topics).toArray().sortBy((item)=>{
      return Date.parse(item.bumpedAt)/1000;
    }).reverse().value();
    return ret;
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
        _posts = entities.posts;
        _topics = entities.topics;
        DiscoursePostStore.emitChange();
        break;
    }

})


module.exports = DiscoursePostStore;