// set up ========================
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    app = express();
    http = module.exports = require('http').Server(app),
	io =  require('socket.io')(http);
// configuration =================

app.configure(function() {
	app.use('/public', express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

// routes ======================================================================
// get home
app.get('/', function(req, res) {
	res.sendfile('./front-app/index.html');
});


// socket actions ======================================================================
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('start_race', function(msg){
    console.log(msg);
    race_controller.start_race();
  });

  socket.on('stop_race', function(msg){
    console.log(msg);
    race_controller.stop_race();
  });

  socket.on('client_horse_movement', function(msg){
    console.log(msg);
  });
  
});
//socket.id para verfigivar el usuario
//io.socket(id).emit
//@todo: almacenar los ids en un array 
//@todo: mandar a middleware
//race controller

var race_controller = {
    start_race : function(){
        this.isOver = false;
        this.random_horse_movement();
        console.log("race started");
    },
    stop_race : function(){
        this.isOver = true;
        this.clear_horse_interval();
    },
    isOver : null,
    horse_interval: null,
    random_horse_movement : function(){
        this.horse_interval = setInterval(function(){
            console.log('check');
            var isMove = Math.random() < 0.5 ? true : false;
            if(isMove && race_controller.isOver == false){
                io.emit('cpu_horse_movement');
            }
        }, 500);
    },
    clear_horse_interval : function(){
      clearInterval(this.horse_interval);
    }
};

//exports.race_controller = race_controller;

// listen (start app with node server.js) ======================================
// config
//var port = 3250;
//http.listen(port);
//console.log("server listening on port " + port);