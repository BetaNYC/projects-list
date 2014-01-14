window.angular.module('ngProjects.controllers.projects', [])
.controller('ProjectsController', ['$scope','$routeParams','$location','Projects',
  function ($scope, $routeParams, $location, Projects) {



    //$scope.global = Global;



    $scope.find = function (query) {
      Projects.query(query, function (projects) {
        $scope.projects = projects;
      });
    };

    $scope.destroy = function (project) {
             project.$remove();
      for (var i in $scope.projects) {
        if ($scope.projects[i] == project) {
          $scope.projects.splice(i, 1)
        }
      }
    };

     $scope.create = function () {
     	var project = new Projects({	
     	})

     	project.html_url = $scope.newUrl;

     	project.$save(function (response) {
     	$scope.projects.push(project);
     	$scope.newUrl = "";
      });

    };



}]);



