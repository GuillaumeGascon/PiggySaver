piggySaver.controller('coreController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

	/* On passe de base deviceready et user sur false */
	$scope.deviceReady = false;
	$rootScope.user = false;

	/* Si l'utilisateur n'est pas log on le redirige vers le login */
	if (!$rootScope.user) {
		$location.path('/login');
	}
	else{
		$location.path('/core');
	}

	/* On attend que l'appareil ait tout chargé */
	document.addEventListener('deviceReady', function() {

		/* Une fois fait... */
    	$scope.$apply(function() {

			/* On passe l'appareil en ready */
      	$scope.deviceReady = true;

			/* On cache la status bar pendant l'attente */
	   	StatusBar.hide();

    	});

  });

	/* Changement de formulaire vers le login */
	$scope.changeForm = function(){

		/* Formulaire pour enregistrement */
		$('#form_register').animate({

			left: "-200%"

		}, 1000);

		/* Formulaire pour connexion */
		$('#form_login').animate({

			left: "50%"

		}, 1000);

	};

	/* Changement de formulaire vers le register */
	$scope.changeLogin = function(){

		/* Formulaire pour enregistrement */
		$('#form_register').animate({

			left: "50%"

		}, 1000);

		/* Formulaire pour connexion */
		$('#form_login').animate({

			left: "-200%"

		}, 1000);

	};

	/* Fonction pour enregistrement */
	$scope.register = function(){

		var userRegister = {

			mail: $('input[name="email"]').val(),
			username: $('input[name="username"]').val(),
			pass: $('input[name="password"]').val(),
			passBis: $('input[name="password_bis"]').val()

		};

		/* Requête post pour transmettre les infos de l'user inscrit et récupérer les données */
		$http.post('https://guillaumegascon.eu/PiggySaver/models/register.php', userRegister).then(function(data){

			$scope.objective = data.data;

			/* Si l'objectif n'a pas encore d'ID ET renvoie success */
			if ($scope.objective.Objective_ID == 0 && $scope.objective.type == "success") {

				/* User connecté */
				$rootScope.user = true;
				/* Redirection vers page objectif */
				$location.path('/core/objective');

			}
			/* Si l'objectif a un ID correct ET renvoie success */
			else if ($scope.objective.Objective_ID != 0 && $scope.objective.type == "success") {

				/* User connecté */
				$rootScope.user = true;
				/* Redirection vers dashboard */
				$location.path('/core/dashboard');

			}
			/* Si renvoie erreur */
			else if ($scope.objective.type == "error") {

				/* Alerte avec message d'erreur */
				alert($scope.objective.message);
				/* User déconnecté */
				$rootScope.user = false;

			}


		})
		.catch(function(error){

			alert('error');

		});

	}

	/* Fonction pour connexion */
	$scope.logUser = function(){

		var userRegister = {

			logUsername: $('input[name="logUsername"]').val(),
			logPass: $('input[name="logPassword"]').val()

		};

		/* Requête post pour transmettre username et password de l'user et récupérer les données */
		$http.post('https://guillaumegascon.eu/PiggySaver/models/login.php', userRegister).then(function(data){

			$scope.objective = data.data;

			/* Si l'objectif n'a pas encore d'ID ET renvoie success */
			if ($scope.objective.Objective_ID == 0 && $scope.objective.type == "success") {
				/* User connecté */
				$rootScope.user = true;
				/* Redirection vers page objectif */
				$location.path('/core/objective');

			}
			/* Si l'objectif a un ID correct ET renvoie success */
			else if ($scope.objective.Objective_ID != 0 && $scope.objective.type == "success") {
				/* User connecté */
				$rootScope.user = true;
				/* Redirection vers dashboard */
				$location.path('/core/dashboard');

			}
			/* Si renvoie erreur */
			else if ($scope.objective.type == "error") {

				/* Alerte avec message d'erreur */
				alert($scope.objective.message);
				/* User déconnecté */
				$rootScope.user = false;

			}

		})
		.catch(function(error){

			alert('error');

		});

	}

	// Changement de classe pour les icons navbar pour income
	$scope.locIncome = function(){

		$('#home_nav').removeClass('active_nav');
		$('#spend_nav').removeClass('active_nav');
		$('#inc_nav').addClass('active_nav');
		$location.path('/core/income');

	}
	
	// Changement de classe pour les icons navbar pour home
	$scope.locHome = function(){

		$('#home_nav').addClass('active_nav');
		$('#spend_nav').removeClass('active_nav');
		$('#inc_nav').removeClass('active_nav');
		$location.path('/core/dashboard');

	}

	// Changement de classe pour les icons navbar pour spend
	$scope.locSpend = function(){

		$('#home_nav').removeClass('active_nav');
		$('#spend_nav').addClass('active_nav');
		$('#inc_nav').removeClass('active_nav');
		$location.path('/core/spend');

	}

}]);
