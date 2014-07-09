// set up ========================
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    app = module.exports = express();
    http = require('http').Server(app),
	io = require('socket.io')(http);
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

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('start_race', function(msg){
     console.log('message: ' + msg);
     race_controller.start_race();
  });

  socket.on('stop_race', function(msg){
     console.log('message: ' + msg);
     race_controller.stop_race();
  });

  socket.on('client_horse_movement', function(){
    //race_controller.random_horse_movement();
  });
  
});

//horse controller
var race_controller = {
    start_race : function(){
        this.horse_interval = setInterval(this.random_horse_movement(), 500);
    },
    stop_race : function(){
        clearInterval(this.horse_interval);
    },
    random_horse_movement : function(){
        var isMove = Math.random() < 0.5 ? true : false;
        if(isMove){
            io.emit('cpu_horse_movement');
        }
    },
    clear_horse_interval : function(){
        clearInterval(this.random_horse_movement);
    },
    horse_interval : null,
};

// listen (start app with node server.js) ======================================
// config
//var port = 3250;
//http.listen(port);
//console.log("server listening on port " + port);