var mongoose = require('mongoose')
  , async = require('async')
  , Game = mongoose.model('Game')
  , _ = require('underscore')

  exports.create = function (req, res) {
  var game = new Game(req.body)
  console.log(req.body)

  game.owner = req.user
  game.save()
  res.jsonp(game)
}

exports.show = function(req, res){
  res.jsonp(req.game);
}

exports.game = function(req, res, next, id){
  var Game = mongoose.model('Game')
 
  Game.load(id, function (err, game) {
    if (err) return next(err)
    if (!game) return next(new Error('Failed to load game ' + id))
    req.game = game
    next()
  })
}

exports.all = function(req, res){
 Game.find().populate('commissioner').exec(function(err, games) {
   if (err) {
     res.render('error', {status: 500});
   } else {      
       res.jsonp(games);
   }
 });
}

exports.update = function(req, res){
  var game = req.game
  game = _.extend(game, req.body)
 
  game.save(function(err) {
    res.jsonp(game)
  })
}

exports.destroy = function(req, res){
  var game = req.game
  game.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}