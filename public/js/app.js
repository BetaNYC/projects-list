window.app = angular.module('ngProjects', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngProjects.controllers', 'ngProjects.directives', 'ngProjects.services']);

// bundling dependencies
window.angular.module('ngProjects.controllers', ['ngProjects.controllers.projects']);
window.angular.module('ngProjects.services',['ngProjects.services.projects']);