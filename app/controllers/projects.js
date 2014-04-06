var mongoose = require('mongoose')
, async = require('async')
, Project = mongoose.model('Project')
, _ = require('underscore')
, fs = require('fs')
, https = require('https')

// var nconf = require('nconf');
// nconf.use('file', { file: './config.json' });
// nconf.load();

var Step = require('step');

var currentList = [];
var tokenParam = "?access_token=ad4a5a65354dc275060d333c956d1afcb9a8fe87";
var contributors;

var minutes = 5, 
the_interval = minutes * 60 * 1000;

setInterval(function() {

  updateProjects();

}, the_interval);

exports.create = function(req, res) {

  var project = new Project(req.body)



  project.save()
  res.jsonp(project)

}


exports.project = function (req, res, next, id){

  var Project = mongoose.model('Project')

  Project.load(id, function (err, project) {
    if (err) return next(err)
      if (!project) return next(new Error('Failed to load project ' + id))
        req.project = project
      next()
    })
}

exports.update = function(req, res) {


  updateProjects(req,res);


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


exports.auth = function(req, res) {
  var password = process.env.PW || ENV['PW']
  if (req.body.password == password) {
    res.jsonp(1);
  } else {
    res.render('error', {status: 403});
  }
}


exports.json = function(req, res) {
  Project.find().exec(function(err, projects) {
    if (err) {
      res.render('error', {status: 500});
    } else {      
      var urls = projects.map(function (e){
        return e.html_url
      });
      res.jsonp(urls);
    }
  });
}


function updateProjects(req,res,callback) {
 

  Project.find().exec(function(err, projects) {
   if (err) {
     res.render('error', {status: 500});
   } else {      
    var currentList = [];
    projects.forEach(function(project){  //push api urls to an array
      currentList.push(project.html_url);
    })



    currentList.forEach(function(repoUrl) {


      repoUrl = repoUrl.split("/");



      var queryPath = "/repos/" + repoUrl[3] + "/" + repoUrl[4];

      

      var options = {
        host: 'api.github.com',
        path: queryPath + tokenParam,
        headers: {
          'User-Agent': 'chriswhong'

        }
      }

      var data;

  //Get the data!
  Step(
    function getRepoJson() {
      fetchJson(options,this)
    },

    function getCivicJson(response){
      data = response;
      options.path = queryPath + "/contents/civic.json" + tokenParam;
      fetchJson(options,this)
    },
    function processCivicJson(response){
      console.log(response);
      if(!response.message){

        var civicJson = new Buffer(response.content, 'base64').toString('ascii'); 
        civicJson = JSON.parse(civicJson);
        data.civicJson = civicJson;


       
        



      }

       var contributorsUrl = getContributorsUrl(data.contributors_url);
        

        options.path = contributorsUrl + tokenParam;


      fetchJson(options,this);

    },
    function gotContributors(response){


      data.contributors = response;           
      


  //console.log("addorupdate " + data.name + " " + data.html_url);

  Project.findOne({'html_url':data.html_url}, function(err,obj){



    if(obj){

      var project ;

      project = obj;

      project.id = data.id;
      project.name = data.name;
      project.description = data.description;
      project.homepage = data.homepage ? data.homepage : data.html_url;
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
      project.contributors = data.contributors;
      project.civicJson = data.civicJson;


      project.save();

    } else {
      console.log("failed on " + data.name);
    }

    
    



    
  });


    }
    )




  




})
}
});

}

function fetchJson(getOptions,callback){



  https.get(getOptions, function(res){
    console.log(getOptions.path);

    var resData = '';

    res.on('data', function (chunk){
      resData += chunk;
    });

    res.on('end',function(){
      resData = JSON.parse(resData);

      callback(resData);
    })
    

  })
  

}

function addOrUpdate(data){


}



function getContributorsUrl(url){ 

  contributorsUrl = url.split("/");
  contributorsUrl = "/" + 
  contributorsUrl[3] + "/" + 
  contributorsUrl[4] + "/" + 
  contributorsUrl[5] + "/" + 
  contributorsUrl[6];

  return contributorsUrl;
}


