// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.dashboard', {
		url: '/dashboard',
		controller: 'dashboardController',
		templateUrl: 'views/dashboard/dashboard.html'
	});
});

piggySaver.factory('$objectifStocker', ['$rootScope', '$http', '$location', function($rootScope, $http, $location) {

  return{

    objectifStocker: function(){

			/* Requête get pour récupérer les informations de l'objectif en fonction de l'userID */
			return $http.get('https://guillaumegascon.eu/PiggySaver/models/objectiveFounder.php').then(function(data){

					return data;

      })
      .catch(function(error){

					alert('Nothing to see here !');
					$rootScope.user = false;
					$location.path('/login');


      });

    },

		incomeStocker: function(){

			/* Requête get pour récupérer la somme de income en fonction de l'userID */
			return $http.get('https://guillaumegascon.eu/PiggySaver/models/incomeFounder.php').then(function(data){

					return data;

      })
      .catch(function(error){

					alert('Nothing to see here !');
					$rootScope.user = false;
					$location.path('/login');


      });

    },

		spendStocker: function(){

			/* Requête get pour récupérer la somme de spend en fonction de l'userID */
			return $http.get('https://guillaumegascon.eu/PiggySaver/models/spendFounder.php').then(function(data){

					return data;

      })
      .catch(function(error){

					alert('Nothing to see here !');
					$rootScope.user = false;
					$location.path('/login');


      });

    }

  };

}]);


piggySaver.controller('dashboardController', ['$rootScope', '$scope', '$location', '$http', '$objectifStocker', function($rootScope, $scope, $location, $http, $objectifStocker) {

	$('#fixed_dash_nav').addClass('activated');

	$objectifStocker.objectifStocker().then(function(data) {

		$('#objectif_title').append(data.data.Title);
		$('#objectif_price').append(data.data.Cost+' '+ data.data.Currency);
		$('#objectif_desc').append(data.data.Desc_OBJ);
		$('#objectif_margin').append(data.data.Margin+' '+ data.data.Currency);
		$('#objectif_amount').append(data.data.Amount+' '+ data.data.Currency);

		$scope.initSub = data.data.Substance;
		$scope.addCost = data.data.Cost;
		$scope.addAmount = data.data.Amount;
		$scope.addMargin = data.data.Margin;

		$objectifStocker.incomeStocker().then(function(data) {

			$scope.addIncome = data.data;

			$objectifStocker.spendStocker().then(function(data) {

				$scope.addSpend = data.data;
				console.log($scope.addSpend);

				if($scope.addSpend == 'null' || $scope.addSpend == ''){

					$scope.addSpend = 0;
					$('#objectif_spend').append($scope.addSpend);

				}else{

					$('#objectif_spend').append($scope.addSpend);

				}

				if($scope.addIncome == 'null' || $scope.addIncome == ''){

					$scope.addIncome = 0;
					$('#objectif_inc').append($scope.addIncome);

				}else{

					$('#objectif_inc').append($scope.addIncome);

				}

				/* opération pour définir les fonds disponibles en fonction des entrées/sorties de l'argent */

				$scope.totalSub = Number($scope.initSub) + Number($scope.addIncome) - Number($scope.addSpend);

				$('#objectif_sub').append($scope.totalSub);

				/* Gestion des pourcentage du cercle et de l'affichage de ceux-ci */

				var val = parseInt($scope.totalSub) * 100 / parseInt($scope.addCost);
			  var $circle = $('#svg #bar');
				/* Si la valeur donne NaN on passe le cercle à 100% */
			  if (isNaN(val)) {
			   val = 100;
			  }
			  else{
			    var r = $circle.attr('r');
					/* On récupère le rayon du cercle */
			    var c = Math.PI*(r*2);
					/* On définit le périmètre de celui-ci */

			    if (val < 0) { val = 0;}
					/* Si la valeur est inférieure à 0 alors on la set à 0 */
			    if (val > 100) { val = 100;}
					/* Si la valeur est supérieure à 100 alors on la set a 100 */

			    var pct = ((100-parseInt(val))/100)*parseInt(c);
					/* Pour avoir la valeur du strokedash : on soustrait val à 100, on le divise encore par 100 puis on le multiplie par le périmètre */

			    $circle.css({ strokeDashoffset: pct});

			    $('#cont').attr('data-pct', parseInt(val));
			  };

				var month = ((parseInt($scope.addCost) + parseFloat($scope.addAmount)) - parseFloat($scope.totalSub)) / (parseFloat($scope.addIncome) - parseFloat($scope.addMargin));

				if(parseInt(month) <= 1){
					$('#time_before').prepend(parseInt(month) + '<br>Month');
				} else {
						$('#time_before').prepend(parseInt(month) + '<br>Months');
				}


			});

		});

	});

}]);
