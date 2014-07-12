var soundtrack = new buzz.sound( "/public/sounds/soundtrack.mp3" );

$(document).ready(function() {
	setTimeout(function(){
		soundtrack.play();
		$('#intro-wrapper').fadeOut('slow', function() {
			$('#race-wrapper').fadeIn('fast');
		});
	}, 2000);	
});
