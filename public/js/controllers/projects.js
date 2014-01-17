window.angular.module('ngProjects.controllers.projects', [])
.controller('ProjectsController', ['$scope','$routeParams','$location','Projects','$http',
  function ($scope, $routeParams, $location, Projects, $http) {

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
     	});

     	project.html_url = $scope.newUrl;

     	project.$save(function (response) {
     	  $scope.projects.push(project);
     	  $scope.newUrl = "";
      });
    };

    $scope.update = function () {
      $http.get('/projects/update');
      $location.path("/");
    };


    var sorter = function () {
      var orderDesc = false;
      var orderAsc = true;
      var order = orderDesc;

      var sortAsc = function(a, b) {
        if(!Number.isNaN(parseInt(a))) {
          a = parseInt(a, 10);
          b = parseInt(b, 10);
        }

        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0;
      };

      var sortDesc = function(a, b) {
        if(!Number.isNaN(parseInt(a))) {
          a = parseInt(a, 10);
          b = parseInt(b, 10);
        }

        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      };

      var nameSort = function(a, b) {
        if (order === orderDesc) {
          return sortDesc(a.name.toLowerCase(), b.name.toLowerCase());
        }

        return sortAsc(a.name.toLowerCase(), b.name.toLowerCase());
      };

      var contributorSort = function(a, b) {
        if (order === orderDesc) {
          return sortDesc(a.contributors.length, b.contributors.length);
        }

        return sortAsc(a.contributors.length, b.contributors.length);
      };

      var watcherSort = function(a, b) {
        if (order === orderDesc) {
          return sortDesc(a.watchers_count, b.watchers_count);
        }

        return sortAsc(a.watchers_count, b.watchers_count);
      };

      var forkSort = function(a, b) {
        if (order === orderDesc) {
          return sortDesc(a.forks_count, b.forks_count);
        }

        return sortAsc(a.forks_count, b.forks_count);
      };

      var issueSort = function(a, b) {
        if (order === orderDesc) {
          return sortDesc(a.open_issues, b.open_issues);
        }

        return sortAsc(a.open_issues, b.open_issues);
      };

      var setOrder = function(sortOrder) {
        order = sortOrder;
      };

      return {
        nameSort: nameSort,
        contributorSort: contributorSort,
        watcherSort: watcherSort,
        forkSort: forkSort,
        issueSort: issueSort,
        setOrder: setOrder
      };
    }();

    $scope.sort = {
      'sorter': sorter,
      'sort': function (option, order) {
        if (this.currentSort === option) {
          this.sortOrder = !order;
        } else {
          this.currentSort = option;
          this.sortOrder = order;
        }

        this.sorter.setOrder(this.sortOrder);

        switch (option) {
          case (this.name):
            return $scope.projects.sort(this.sorter.nameSort);
          case(this.contributors):
            return $scope.projects.sort(this.sorter.contributorSort);
          case(this.watchers):
            return $scope.projects.sort(this.sorter.watcherSort);
          case(this.forks):
            return $scope.projects.sort(this.sorter.forkSort);
          case(this.issues):
            return $scope.projects.sort(this.sorter.issueSort);
          default:
            return $scope.projects.sort(this.sorter.nameSort);
        }
      },
      'isActive': function (option) {
        switch (option) {
          case (this.name):
            return 'active-sort';
          case(this.contributors):
            return 'active-sort';
          case(this.watchers):
            return 'active-sort';
          case(this.forks):
            return 'active-sort';
          case(this.issues):
            return 'active-sort';
          default:
            return '';
        }
      },
      'name': 0,
      'contributors': 1,
      'watchers': 2,
      'forks': 3,
      'issues': 4,
      'orderDesc': false,
      'orderAsc': true,
      'sortOrder': false,
      'currentSort': null
    };

}]);



