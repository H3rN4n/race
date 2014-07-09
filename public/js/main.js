var raceHorsesApp = angular.module('raceHorsesApp', [])

.controller('MainCtrl', ['$scope', function ($scope) {

	$scope.params = {
		aceleration : 100,
		raceStatus : false
	}

	$scope.startRace = function(){
		$element = $(".btn-start");
		$element.addClass('animated bounceIn expanded');
		$element.text("Pulsa -> repetidamente");
		$scope.params.raceStatus = true;
		$scope.socketActions.startRace();
		$scope.rightKeyEventListener();
		$scope.finishLineListener();
	};

	$scope.stopRace = function(){
		$scope.showTheWinnerHorse();
		$scope.params.raceStatus = false;
	};

	$scope.showTheWinnerHorse = function(){
		$winner = $('.winner');
		var winner_name = $winner.data('horse-number');

		var btn = $(".btn-start");
		btn.text("Ganó el " + winner_name +"!");
	},

	$scope.socket = io();
	$scope.socket.on('cpu_horse_movement', function(msg){
		console.log('cpu_horse_movement');
		$scope.horseMovement('horse_1');
	});

	$scope.socketActions = {
		startRace : function(){
			$scope.socket.emit('raceStart', 'START RACE');
		}
	};

	$scope.rightKeyEventListener = function(){
		$(document).on('keydown', function(event) {
			if(event.keyCode == 39) { // right
				if($scope.params.raceStatus){
					$scope.horseMovement('horse_2');
					$scope.socket.emit('client_horse_movement');	
				}
			}
		});
	};


	$scope.horseMovement = function(horseId){
		$horse = $('.'+horseId);
		var currentPos = parseInt($horse.css('left'));
		var nextPos = (currentPos + $scope.params.aceleration);

		$horse.css({ 'left' : nextPos });
	};

	$scope.finishLineListener = function(){
		//finish at 650px
		var check_interval = setInterval(function(){
			$horses = $('.horse');
			$horses.each(function() {
				var $horse = $( this );
				var currentPos = parseInt($horse.css('left'));

				if(currentPos >= 650){
					$horse.addClass( "winner" );
					$scope.stopRace();
					clearInterval(check_interval);
				}

			});
		}, 500);
	};
	
}])

.directive('startButton', [function () {
	return {
		restrict: 'E',
		template: '<button class="btn btn-start" data-ng-click="startRace()">Comenzar</button>'
	};
}]);