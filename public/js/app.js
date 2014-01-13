window.app = angular.module('ngJeopardy', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngff.controllers', 'ngff.directives', 'ngff.services']);

// bundling dependencies
window.angular.module('ngff.controllers', ['ngff.controllers.projects']);
window.angular.module('ngff.services',['ngff.services.projects']);