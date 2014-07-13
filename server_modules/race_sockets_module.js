var http = require('../server.js');
var race_module = require('./race_module');
var moniker = require('moniker');
var io = require('socket.io')(http);

// socket actions ======================================================================

var users = [];

io.on('connection', function(socket){
    console.log('a user connected');

    var random_name = moniker.choose();
    socket.emit('login', {'room' :random_name, 'id': socket.id});

    race_module.id = socket.id;
    race_module.room = random_name;
    race_module.socket = socket;

    users[socket.id] = race_module;

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('create_room', function(room) {
        //socket.join(room);
        console.log("@todo: room creation");
    });

    socket.on('start_race', function(data){
        console.log(data);
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