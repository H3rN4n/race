// set up ========================
var application_root = __dirname;
var express = require('express');
var path = require('path');
var app = express();
var http = module.exports = require('http').Server(app);
var race_module = require('./server_modules/race_module');
var race_sockets_module = require('./server_modules/race_sockets_module');
/*var moniker = require('moniker');
var io = require('socket.io')(http);*/

// configuration =================

//app.get('./public', express.static(__dirname + './public'));
//app.use('./api/assets', express.static(__dirname + './apidocs/assets'));
var env = process.env.NODE_ENV || 'development';
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));

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