// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.awsSpend', {
		url: '/awsSpend/":id"',
		controller: 'awsSpendController',
		templateUrl: 'views/spend/awsSpend.html'
	});
});

piggySaver.controller('awsSpendController', ['$rootScope', '$scope', '$location', '$http', '$timeout', '$stateParams', function($rootScope, $scope, $location, $http, $timeout, $stateParams) {

  $scope.pictureID = $stateParams.id;

	var sendID = {

		pictureID: $scope.pictureID

	}

	/* Requête post pour transmettre l'id de la photo et récupérer les données d'aws */
	$http.post('https://guillaumegascon.eu/PiggySaver/models/picSpend.php', sendID).then(function(data){

		$scope.array = data.data;

		$(document).ready(function() {
	    $('select').material_select();
	  });

	})
	.catch(function(error){

		alert('Error');

	});

	$scope.addSpend = function() {

		var sendIncome = {

			designation: $('select[name="designation"]').val(),
			cost: $('select[name="cost"]').val(),
			currency: $('select[name="currency"]').val(),

		}

		/* Requête post pour transmettre les infos de la dépense et récupérer les données */
		$http.post('https://guillaumegascon.eu/PiggySaver/models/spend.php', sendIncome).then(function(data){

			$scope.newSpend = data.data;

			if ($scope.newSpend.type == "error") {

				alert("Error, check the form !");
				return false;

			}
			else {

				// Changement de classe pour les icons navbar
				$('#home_nav').addClass('active_nav');
				$('#spend_nav').removeClass('active_nav');
				$('#inc_nav').removeClass('active_nav');
				$location.path('/core/dashboard');

			}


		})
		.catch(function(error){

			alert('Error');

		});

	}

}]);
