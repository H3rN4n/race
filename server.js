// set up ========================
var application_root = __dirname;
var express = require('express');
var path = require('path');
var app = express();
var http = module.exports = require('http').Server(app);
var race_module = require('./server_modules/race_module');
var moniker = require('moniker');
var io =  require('socket.io')(http);

console.log(race_module);
// configuration =================
app.configure(function() {
	app.use('/public', express.static(__dirname + '/public'));
    app.use('/api/assets', express.static(__dirname + '/apidocs/assets'));
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

app.get('/api/:type/:gender', function(req, res) {
    var type = req.params.type;
    var gender = req.params.gender;
    
    var route = './apidocs/' + type + '/' + gender;

    console.log(route);
    res.sendfile(route);

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
