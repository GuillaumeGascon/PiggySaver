piggySaver.controller('coreController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

	/*On passe de base deviceready et user sur false*/
	$scope.deviceReady = false;
	$rootScope.user = false;

	/*Si l'utilisateur n'est pas log on le redirige vers le login*/
	if (!$rootScope.user) {
		$location.path('/login');
	}
	else{
		$location.path('/core');
	}

	/*On attend que l'appareil ai tout chargé*/
	document.addEventListener('deviceReady', function() {

		/*Une fois fais on passe l'appareil en ready*/
    $scope.$apply(function() {

      $scope.deviceReady = true;
			/*On cache la status bar pendant l'attente*/
	    StatusBar.hide();

    });

  });

	/*Changement de formulaire vers le login*/
	$scope.changeForm = function(){

		$('#form_register').animate({

			left: "-200%"

		}, 1000);

		$('#form_login').animate({

			left: "50%"

		}, 1000);

	};

	/*Changement de formulaire vers le register*/
	$scope.changeLogin = function(){

		$('#form_register').animate({

			left: "50%"

		}, 1000);

		$('#form_login').animate({

			left: "-200%"

		}, 1000);

	};

	$scope.register = function(){

		var userRegister = {

			mail: $('input[name="email"]').val(),
			username: $('input[name="username"]').val(),
			pass: $('input[name="password"]').val(),
			passBis: $('input[name="password_bis"]').val()

		};
		$http.post('https://guillaumegascon.eu/PiggySaver/models/register.php', userRegister).then(function(data){

			$scope.objective = data.data;

			if ($scope.objective.Objective_ID == 0 && $scope.objective.type == "success") {

				$rootScope.user = true;
				$location.path('/core/objective');

			}else if ($scope.objective.Objective_ID != 0 && $scope.objective.type == "success") {

				$rootScope.user = true;
				$location.path('/core/dashboard');

			}else if ($scope.objective.type == "error") {

				alert($scope.objective.message);
				$rootScope.user = false;

			}


		})
		.catch(function(error){

			alert('error');

		});

	}

	$scope.logUser = function(){

		var userRegister = {

			logUsername: $('input[name="logUsername"]').val(),
			logPass: $('input[name="logPassword"]').val()

		};
		$http.post('https://guillaumegascon.eu/PiggySaver/models/login.php', userRegister).then(function(data){

			$scope.objective = data.data;

			if ($scope.objective.Objective_ID == 0 && $scope.objective.type == "success") {

				$rootScope.user = true;
				$location.path('/core/objective');

			}else if ($scope.objective.Objective_ID != 0 && $scope.objective.type == "success") {

				$rootScope.user = true;
				$location.path('/core/dashboard');

			}else if ($scope.objective.type == "error") {

				alert($scope.objective.message);
				$rootScope.user = false;

			}

		})
		.catch(function(error){

			alert('error');

		});

	}

	$scope.locIncome = function(){

		$('#home_nav').removeClass('active_nav');
		$('#spend_nav').removeClass('active_nav');
		$('#inc_nav').addClass('active_nav');
		$location.path('/core/income');

	}

	$scope.locHome = function(){

		$('#home_nav').addClass('active_nav');
		$('#spend_nav').removeClass('active_nav');
		$('#inc_nav').removeClass('active_nav');
		$location.path('/core/dashboard');

	}

	$scope.locSpend = function(){

		$('#home_nav').removeClass('active_nav');
		$('#spend_nav').addClass('active_nav');
		$('#inc_nav').removeClass('active_nav');
		$location.path('/core/spend');

	}

}]);
