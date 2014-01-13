var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;


 var ProjectSchema = new Schema({
  id: {type: Number},
  name: {type: String},
  description: {type: String},
  homepage: {type: String},
  html_url: {type: String},
  language: {type: String},
  watchers_count: {type: String},
  contributors_url: {type: String},
  forks_count: {type: String},
  open_issues: {type: String},
  created_at: {type: String},
  updated_at: {type: String},
  pushed_at: {type: String},
  owner: [{
    login: {type: String},
    html_url: {type: String},
    avatar_url: {type: String},
    type: {type: String}
  }],
  contributors:[{
    login: {type: String},
    html_url: {type: String},
    avatar_url: {type: String},
    type: {type: String}
  }]
  

});

 mongoose.model('Project', ProjectSchema);
