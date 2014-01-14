  var mongoose = require('mongoose')
  , async = require('async')
  , Project = mongoose.model('Project')
  , _ = require('underscore')
  , fs = require('fs')
  , https = require('https')

  var currentList = [];
  var queryPath;
  var tokenParam = "?access_token=ad4a5a65354dc275060d333c956d1afcb9a8fe87";
  var contributors;

  exports.create = function(req, res) {

    var project = new Project(req.body)
    console.log(req.body)


    project.save()
    res.jsonp(project)

  }


  exports.project = function (req, res, next, id){
    console.log(id);
    var Project = mongoose.model('Project')
   
    Project.load(id, function (err, project) {
      if (err) return next(err)
      if (!project) return next(new Error('Failed to load project ' + id))
      req.project = project
      next()
    })
  }

  exports.update = function(req, res) {


   Project.find().exec(function(err, projects) {
     if (err) {
       res.render('error', {status: 500});
     } else {      
        var currentList = [];
        projects.forEach(function(project){
          currentList.push(project.html_url);
        })
        console.log(currentList);
         currentList.forEach(function(repoUrl) {

      repoUrl = repoUrl.split("/");
      console.log(repoUrl);
      queryPath = "/repos/" + repoUrl[3] + "/" + repoUrl[4];
      

      var options = {
        host: 'api.github.com',
        path: queryPath + tokenParam,
        headers: {
          'User-Agent': 'chriswhong'

        }
      }

    //Get the data!
    https.get(options, function(res){
      console.log(res.headers);
      var data = '';

      res.on('data', function (chunk){
        data += chunk;
      });

      res.on('end',function(){
        data = JSON.parse(data);

        addOrUpdate(data);
      })

    })


  })
     }
   });

  }

  exports.destroy = function(req, res){
    var project = req.project;
    project.remove(function(err){
      if (err) {
        res.render('error', {status: 500});
      }  else {
        res.jsonp(1);
      }
    })
  }

  exports.list = function(req, res) {
   Project.find().exec(function(err, projects) {
     if (err) {
       res.render('error', {status: 500});
     } else {      
       res.jsonp(projects);
     }
   });
  }

  function updateProjects() {

   
  }

  function addOrUpdate(data){

    Project.findOne({'html_url':data.html_url}, function(err,obj){
      if (err) {
        throw err;
      };
      var project;






        project = obj;

        project.id = data.id;
        project.name = data.name;
        project.description = data.description;
        project.homepage = data.homepage;
        project.html_url = data.html_url;
        project.language = data.language;
        project.watchers_count = data.watchers_count;
        project.contributors_url = data.contributors_url;
        project.forks_count = data.forks_count;
        project.open_issues = data.open_issues;
        project.created_at = data.created_at;
        project.updated_at = data.updated_at;
        project.pushed_at = data.pushed_at;

        project.owner.login = data.owner.login;
        project.owner.html_url = data.owner.html_url;
        project.owner.avatar_url = data.owner.avatar_url;
        project.owner.type = data.owner.type;
        
        getContributors(data.contributors_url,function(){
          console.log("Callback");
          console.log(contributors);
          project.contributors = contributors;
          project.save()
        })
      

        

      
    });
  }


  function getContributors(url,callback){ 

    contributorsUrl = url.split("/");
    contributorsUrl = "/" + 
    contributorsUrl[3] + "/" + 
    contributorsUrl[4] + "/" + 
    contributorsUrl[5] + "/" + 
    contributorsUrl[6] + tokenParam;

    console.log(contributorsUrl);
    

    var options = {
      host: 'api.github.com',
      path: contributorsUrl,
      headers: {
        'User-Agent': 'chriswhong'
      }
    }
    https.get(options, function(res){
      res.body = "";
      res.on('data', function (chunk){
        res.body += chunk;
      });

      res.on('end',function(){
        contributors = res.body;
        console.log("about to parse");
        contributors = JSON.parse(contributors);
        console.log(contributors);
        callback();
        

      })
    })

  }


