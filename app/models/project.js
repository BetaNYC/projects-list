var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

  //mongoose.set('debug', true)


  var NeedSchema = new Schema({
      need: {type: String},
  });
  mongoose.model('Need', NeedSchema);



   var CategorySchema = new Schema({
      category: {type: String},
  });
  mongoose.model('Category', CategorySchema);

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
  owner: {
    login: {type: String},
    html_url: {type: String},
    avatar_url: {type: String},
    type: {type: String}
  },
  contributors:[{
    login: {type: String},
    html_url: {type: String},
    avatar_url: {type: String},
    type: {type: String}
  }],
  civicJson:{
    status: {type: String},
    thumbnailUrl: {type: String},
    bornAt: {type: String},
    geography: {type: String},
    type: {type: String},
    needs: [NeedSchema],
    categories: [CategorySchema]
  }
  

});

   ProjectSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

 mongoose.model('Project', ProjectSchema);



