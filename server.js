// set up ========================
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    app = express();
    http = module.exports = require('http').Server(app),
    io =  require('socket.io')(http),
    race = require('./server_modules/race');

// configuration =================
app.configure(function() {
	app.use('/public', express.static(__dirname + '/public'));
    app.use('/assets', express.static(__dirname + '/apidocs/assets'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

// routes ======================================================================
// get home
app.get('/', function(req, res) {
	res.sendfile('./front-app/index.html');
});

app.get('/api', function(req, res) {
    res.sendfile('./apidocs/index.html');
});


// socket actions ======================================================================
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
        race.race_controller.stop_race();
    });

    socket.on('start_race', function(msg){
        console.log(msg);
        race.race_controller.start_race();
    });

    socket.on('stop_race', function(msg){
        console.log(msg);
        race.race_controller.stop_race();
    });

    socket.on('client_horse_movement', function(msg){
        console.log(msg);
    });
  
});
