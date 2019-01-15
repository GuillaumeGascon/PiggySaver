// ROUTING
piggySaver.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('core.spend', {
		url: '/spend',
		controller: 'spendController',
		templateUrl: 'views/spend/spend.html'
	});
});

piggySaver.controller('spendController', ['$rootScope', '$scope', '$location', '$http', '$timeout', function($rootScope, $scope, $location, $http, $timeout) {

  $scope.addSpend = function() {

		var sendSpend = {

			designation: $('input[name="designation"]').val(),
			cost: parseFloat($('input[name="cost"]').val()),
			currency: $('select[name="currency"]').val(),

		}

		/* Requête post pour envoyer le spend et récupérer les données */
		$http.post('https://www.guillaumegascon.eu/PiggySaver/models/spend.php', sendSpend).then(function(data){

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

	/* Fonction pour envoyer la photo et la traiter */
	$scope.picSpend = function(){

		navigator.camera.getPicture(function(fileURL) {
			var fileTransfer = new FileTransfer(),
					options = new FileUploadOptions();

			options.fileKey = 'spendPic';
			options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
			options.mimeType = 'image/jpeg';

			var params = new Object();

      	options.params = params;
      	options.chunkedMode = false;

			$scope.uploadingPicture = true;

			fileTransfer.upload(fileURL, encodeURI('https://www.guillaumegascon.eu/PiggySaver/models/uploadsSpend.php'), function(result) {
				$timeout(function() {

					$location.path('/core/awsSpend/'+result.response);

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
