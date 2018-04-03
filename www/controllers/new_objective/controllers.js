// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.objective', {
		url: '/objective',
		controller: 'objectiveController',
		templateUrl: 'views/new_objective/New_Objective.html'
	});
});

piggySaver.controller('objectiveController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

	$('#fixed_dash_nav').hide();

  $scope.addObjective = function(){

    $location.path('/core/add');

  }

}]);
