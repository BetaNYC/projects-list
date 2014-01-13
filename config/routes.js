
var async = require('async')

module.exports = function (app, passport, auth) {


  var projects = require('../app/controllers/projects')
  app.get('/projects/update', projects.update)
  app.get('/projects', projects.list)

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)

  var leagues = require('../app/controllers/leagues')  
  app.get('/leagues', leagues.all)
  app.post('/leagues', auth.requiresLogin, leagues.create)
  app.get('/leagues/:leagueId', leagues.show)
  app.put('/leagues/:leagueId', auth.requiresLogin, leagues.update)
  app.del('/leagues/:leagueId', auth.requiresLogin, leagues.destroy)
 
  app.param('leagueId', leagues.league)

  var games = require('../app/controllers/games')  
  app.get('/games', games.all)
  app.post('/games', auth.requiresLogin, games.create)
  app.get('/games/:gameId', games.show)
  app.put('/games/:gameId', auth.requiresLogin, games.update)
  app.del('/games/:gameId', auth.requiresLogin, games.destroy)
 
  app.param('gameId', games.game)

   var answers = require('../app/controllers/answers')  
 
  app.post('/answers', auth.requiresLogin, answers.create)
  app.param('answerId', answers.answer)



  
  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
