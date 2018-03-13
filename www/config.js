var piggySaver = angular.module('piggySaver', ['ui.router', 'ui.materialize']);

piggySaver.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/login/login.html'
	})
	.state('core', {
		url: '/core',
		templateUrl: 'views/core/core.html'
	});
});
