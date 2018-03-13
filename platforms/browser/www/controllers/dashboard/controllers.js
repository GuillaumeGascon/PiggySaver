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

	$('#fixed_dash_nav').removeClass('deactived').addClass('activated');

	$objectifStocker.objectifStocker().then(function(data) {

		$('#objectif_title').append(data.data.Title);
		$('#objectif_price').append(data.data.Cost+',00 '+ data.data.Currency);
		$('#objectif_desc').append(data.data.Desc_OBJ);

		$scope.initSub = data.data.Substance;
		$scope.addCost = data.data.Cost;
		$scope.addAmount = data.data.Amount;
		$scope.addMargin = data.data.Margin;

		$objectifStocker.incomeStocker().then(function(data) {

			$scope.addIncome = data.data;

			$objectifStocker.spendStocker().then(function(data) {

				$scope.addSpend = data.data;

				if($scope.addSpend == 'null'){

					$scope.addSpend = 0;
					$('#objectif_spend').append($scope.addSpend);

				}else{

					$('#objectif_spend').append(parseFloat($scope.addSpend));

				}

				if($scope.addIncome == 'null'){

					$scope.addIncome = 0;
					$('#objectif_inc').append($scope.addIncome);

				}else{

					$('#objectif_inc').append(parseFloat($scope.addIncome));

				}

				/*opération pour définir les fonds disponible en fonction des entrées/sorties de l'argent*/

				$scope.totalSub = Number($scope.initSub) + Number($scope.addIncome) - Number($scope.addSpend);

				$('#objectif_sub').append($scope.totalSub);

				/*Gestion des pourcentage du cercle et de l'affichage de ceux-ci*/

				var val = parseFloat($scope.totalSub) * 100 / parseFloat($scope.addCost);
			  var $circle = $('#svg #bar');
				/*si la valeur donne NaN on passe le cercle à 100%*/
			  if (isNaN(val)) {
			   val = 100;
			  }
			  else{
			    var r = $circle.attr('r');
					/*on récupère le rayon du cercle*/
			    var c = Math.PI*(r*2);
					/*on défini le périmètre de celui-ci*/

			    if (val < 0) { val = 0;}
					/*si la valeur et inférieur à 0 alors on la set à 0*/
			    if (val > 100) { val = 100;}
					/* si la valeur et supérieur à 100 alors on la set a 100*/

			    var pct = ((100-parseInt(val))/100)*parseInt(c);
					/*pour avoir la valeur du strokedash on soustrait val à 100 que le divise encore par 100 puis on le multiplie par le périmètre*/

			    $circle.css({ strokeDashoffset: pct});

			    $('#cont').attr('data-pct', parseInt(val));
			  };

				var month = ((parseInt($scope.addCost) + parseFloat($scope.addAmount)) - parseFloat($scope.totalSub)) / (parseFloat($scope.addIncome) - parseFloat($scope.addMargin));

				$('#time_before').prepend(parseInt(month) + '<br>Month');

			});

		});

	});

}]);