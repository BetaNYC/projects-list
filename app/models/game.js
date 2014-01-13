var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;


 var AnswerSchema = new Schema({
  answer: {type: String},
  question: {type: String}
});

 mongoose.model('Answer', AnswerSchema);

 var CategorySchema = new Schema({
  title: {type: String},
  answers: [AnswerSchema]
 });

 mongoose.model('Category', CategorySchema);


  var GameSchema = new Schema({
  name: {type: String},
  owner: {type: Schema.ObjectId, ref: 'User'},
  board1:[CategorySchema],
  board2:[CategorySchema]

});

  GameSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('owner').exec(cb);
  }
};

mongoose.model('Game', GameSchema);