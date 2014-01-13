var mongoose = require('mongoose')
  , async = require('async')
  , Game = mongoose.model('Game')
  , _ = require('underscore')

  exports.create = function (req, res) {

  var gameId = req.body.game
  var position = req.body.position
  var board = req.body.board

console.log(position)
 
  var answer = new Answer(req.body)
  answer.answer = req.body.answer
  answer.question = req.body.question

  Game.findById(gameId,function(err,game){
	console.log(game)
	console.log(answer)
    //game.answers.push(answer)  
    //Find position in this game and push
    game[board][position].push(answer)

    game.save()
    console.log(game)
  })
 
 
  //answer.save()
  res.jsonp(answer)
  //res.write(game)

}

exports.answer = function(req, res, next, id){
  var Answer = mongoose.model('Answer')
 
  Answer.load(id, function (err, answer) {
    if (err) return next(err)
    if (!answer) return next(new Error('Failed to load answer ' + id))
    req.answer = answer
    next()
  })
}