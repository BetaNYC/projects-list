window.angular.module('ngff.controllers.projects', [])
.controller('ProjectsController', ['$scope','$routeParams','$location','Projects',
  function ($scope, $routeParams, $location, Projects) {



    //$scope.global = Global;



    $scope.find = function (query) {
      Projects.query(query, function (projects) {
        $scope.projects = projects;
      });
    };



}]);



