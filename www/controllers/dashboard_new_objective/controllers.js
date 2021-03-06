// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.add', {
		url: '/add',
		controller: 'addObjectiveController',
		templateUrl: 'views/new_objective/dash_new_obj.html'
	});
});

piggySaver.controller('addObjectiveController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

	$('#fixed_dash_nav').hide();

	$scope.createObjective = function() {

		var sendObjective = {

			objective: $('input[name="objectif"]').val(),
			cost: $('input[name="cost"]').val(),
			currency: $('select[name="currency"]').val(),
			desc: $('input[name="desc"]').val(),
			substance: $('input[name="substance"]').val(),
			wages: $('input[name="wages"]').val(),
			day: $('input[name="day"]').val(),
			margin: $('input[name="margin"]').val(),
			amount: $('input[name="amount"]').val(),
			userID: $scope.sessionID

		}
		/* Requête post pour envoyer l'objectif et récupérer les données */
		$http.post('https://www.guillaumegascon.eu/PiggySaver/models/objective.php', sendObjective).then(function(data){

			$scope.newObjective = data.data;

			if ($scope.newObjective.type == "error") {

				alert("Error, check the form !");
				return false;

			}
			else {

				$location.path('/core/dashboard');
				$('#fixed_dash_nav').show();

			}


		})
		.catch(function(error){

			alert('Error');

		});

	}

}]);
