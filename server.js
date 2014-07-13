// set up ========================
var application_root = __dirname;
var express = require('express');
var path = require('path');
var app = express();
var http = module.exports = require('http').Server(app);
var race_module = require('./server_modules/race_module');
var moniker = require('moniker');
var io =  require('socket.io')(http);

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

var users = [];

io.on('connection', function(socket){
    console.log('a user connected');

    var random_name = moniker.choose();
    socket.emit('login_as', {'username' :random_name, 'id': socket.id});
    race_module.id = socket.id;
    race_module.socket = socket;
    users[socket.id] = race_module;

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('start_race', function(data){
        var user_race = users[data.id];
        user_race.start_race();
    });

    socket.on('stop_race', function(data){
        var user_race = users[data.id];
        user_race.stop_race();
    });

    socket.on('client_horse_movement', function(data){
        console.log(data);
        //console.log(username + 'is moving');
    });
  
});
