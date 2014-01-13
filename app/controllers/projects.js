var mongoose = require('mongoose')
, async = require('async')
, Project = mongoose.model('Project')
, _ = require('underscore')
, fs = require('fs')
, https = require('https')

var currentList = [];
var queryPath;

exports.update = function(req, res) {

  fs.readFile('./public/js/projects.json',function(err, data){
    if (err) throw err;
    data = JSON.parse(data);
    currentList = data;
    console.log(currentList);
    updateProjects();
  });

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
  currentList.forEach(function(repoUrl) {
 
    repoUrl = repoUrl.split("/");
    console.log(repoUrl);
    queryPath = "/repos/" + repoUrl[3] + "/" + repoUrl[4];
    console.log(repoUrl);

    var options = {
      host: 'api.github.com',
      path: queryPath,
      headers: {
        'User-Agent': 'louiedog98'
      }
    }

  //Get the data!
    https.get(options, function(res){
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

function addOrUpdate(data){
  console.log(data.id);
  Project.findOne({'id':data.id}, function(err,obj){
    if (err) {
      throw err;
    };
    var project;



    if(obj==null){
      console.log("yes, it's null");

      console.log(data);

      project = new Project(data);

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



      project.save()

    } else {

      console.log("no, I found something");

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

      project.contributors = getContributors(data.contributors_url);

      project.save()

    }
  });
}


function getContributors(url){ 

  var contributorsQueryPath = queryPath + "/contributors";
  console.log(queryPath);
  var contributors;

  var options = {
    host: 'api.github.com',
    path: contributorsQueryPath,
    headers: {
      'User-Agent': 'louiedog98'
    }
  }
  https.get(options, function(res){
    res.on('data', function (chunk){
      contributors += chunk;
    });

    res.on('end',function(){
      console.log(contributors);
      contributors = JSON.parse(contributors);
      console.log(contributors);

      return contributors;

    })
  })

}

