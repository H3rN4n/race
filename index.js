// set up ========================
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    app = express();
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

  socket.on('raceStart', function(msg){
     console.log('message: ' + msg);
  });

  socket.on('client_horse_movement', function(){
    horse_controller.random_horse_movement();
  });
  
});

//horse controller
var horse_controller = {
  random_horse_movement : function(){
    var isMove = Math.random() < 0.5 ? true : false;
    if(isMove){
      io.emit('cpu_horse_movement');
    }
  }
};

// listen (start app with node server.js) ======================================
// config
var port = 3250;
http.listen(port);
console.log("http listening on port " + port);