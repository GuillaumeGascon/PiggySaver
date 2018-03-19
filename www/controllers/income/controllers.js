// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.income', {
		url: '/income',
		controller: 'incomeController',
		templateUrl: 'views/income/income.html'
	});
});

piggySaver.controller('incomeController', ['$rootScope', '$scope', '$location', '$http', '$timeout', function($rootScope, $scope, $location, $http, $timeout) {

	$scope.uploadingPicture = false;

  $scope.addIncome = function() {

		var sendIncome = {

			designation: $('input[name="designation"]').val(),
			cost: parseFloat($('input[name="cost"]').val()),
			currency: $('select[name="currency"]').val(),

		}

		/* Requête post pour envoyer l'income et récupérer les données */
		$http.post('https://guillaumegascon.eu/PiggySaver/models/income.php', sendIncome).then(function(data){

			$scope.newIncome = data.data;

			if ($scope.newIncome.type == "error") {

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

	$scope.picIncome = function(){

		navigator.camera.getPicture(function(fileURL) {
			var fileTransfer = new FileTransfer(),
					options = new FileUploadOptions();

			options.fileKey = 'incomePic';
			options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
			options.mimeType = 'image/jpeg';

			var params = new Object();

      options.params = params;
      options.chunkedMode = false;

			$scope.uploadingPicture = true;

			fileTransfer.upload(fileURL, encodeURI('https://guillaumegascon.eu/PiggySaver/models/uploads.php'), function(result) {
				$timeout(function() {

					$location.path('/core/awsIncome/'+result.response);

				});
			},
			function(error) {
				alert('FileTransfer Error:\n\n'+JSON.stringify(error));
			}, options);

		}, function(error) {
			alert('Camera Error:\n\n'+JSON.stringify(error));
		}, {
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA
		});

	}

}]);
