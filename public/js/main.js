/**
 * Provides the base Widget class...
 *
 * @class front_raceHorsesApp
 * 
 */
var raceHorsesApp = angular.module('raceHorsesApp', [])

.controller('MainCtrl', ['$scope', function ($scope) {

	$scope.params = {
		aceleration : 100,
		raceStatus : false,
		username: null,
		userid: null
	};

	/**
	 * Description
	 * @method startRace
	 * @return 
	 */
	$scope.startRace = function(){
		$element = $(".btn-start");
		if(!$element.hasClass('started')){
			$element.addClass('animated bounceIn expanded started');
			$element.text("Pulsa -> repetidamente");
			$scope.params.raceStatus = true;
			$scope.socketActions.startRace();
			$scope.rightKeyEventListener();
			$scope.finishLineListener();
		}
	};

	/**
	 * Description
	 * @method stopRace
	 * @return 
	 */
	$scope.stopRace = function(){
		$scope.showTheWinnerHorse();
		$scope.params.raceStatus = false;
	};

	/**
	 * Description
	 * @method showTheWinnerHorse
	 * @return 
	 */
	$scope.showTheWinnerHorse = function(){
		$winner = $('.winner');
		var winner_name = $winner.data('horse-number');

		var $btn = $(".btn-start");
		$btn.text("Ganó el " + winner_name +"!");

		//send socket message
		$scope.socketActions.stopRace();
	};

	//sockets actions
	$scope.socket = io();

	$scope.socket.on('login_as', function(data){
		console.log('login_as ' + data.username);
		console.log('login_id ' + data.id);
		$scope.params.username = data.username;
		$scope.params.userid = data.id;
	});

	$scope.socket.on('cpu_horse_movement', function(msg){
		console.log('cpu_horse_movement');
		$scope.horseMovement('horse_1');
	});

	$scope.socketActions = {
		/**
		 * Description
		 * @method startRace
		 * @return 
		 */
		startRace : function(){
			$scope.socket.emit('start_race', { 'username': $scope.params.username, 'id': $scope.params.userid });
		},
		/**
		 * Description
		 * @method stopRace
		 * @return 
		 */
		stopRace : function(){
			$scope.socket.emit('stop_race', { 'username': $scope.params.username, 'id': $scope.params.userid });
		}
	};

	/**
	 * Description
	 * @method rightKeyEventListener
	 * @return 
	 */
	$scope.rightKeyEventListener = function(){
		$(document).on('keydown', function(event) {
			if(event.keyCode == 39) {
				if($scope.params.raceStatus){
					$scope.horseMovement('horse_2');
					$scope.socket.emit('client_horse_movement', 'client_horse_movement');
				}
			}
		});
	};

	/**
	 * Description
	 * @method counterAction
	 * @return 
	 */
	$scope.counterAction = function(){
		var $counter = $('.counter');
		var i = 3;

		var interval = setInterval(function(){
			if(i == 0){
				$counter.text('YA!');
				$scope.startRace();
				setTimeout(function(){
					$counter.fadeOut('fast', function() {
						
					});
				}, 1000)
				clearInterval(interval);
			}else{
				$counter.text(i);
				i--;
			}

		}, 1000);
	};

	/**
	 * Description
	 * @method horseMovement
	 * @param {} horseId
	 * @return 
	 */
	$scope.horseMovement = function(horseId){
		$horse = $('.'+horseId);
		var currentPos = parseInt($horse.css('left'));
		var nextPos = (currentPos + $scope.params.aceleration);

		$horse.css({ 'left' : nextPos });
	};

	/**
	 * Description
	 * @method finishLineListener
	 * @return 
	 */
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
		template: '<button class="btn btn-start" data-ng-click="counterAction()">Comenzar</button>'
	};
}]);