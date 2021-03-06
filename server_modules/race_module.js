var http = require('../server.js');
var io = require('socket.io')(http);

/**
 * Provides the base Widget class...
 *
 * @class node_race_module
 * @main node_race_module
 */
var race_module = {
    /**
     * Description
     * @method start_race
     * @return 
     */
    start_race : function(){
        this.isOver = false;
        this.random_horse_movement();
        console.log("race started");
    },
    /**
     * Description
     * @method stop_race
     * @return 
     */
    stop_race : function(){
        this.isOver = true;
        console.log("race finished");
        this.clear_horse_interval();
    },
    isOver : null,
    horse_interval : null,
    room: null,
    /**
     * Description
     * @method random_horse_movement
     * @return 
     */
    random_horse_movement : function(){
        var isOver = this.isOver;
        var room = this.room;
        var socket = this.socket;
        var send_horse_movement = this.send_horse_movement;

        this.horse_interval = setInterval(function(){
            var isMove = Math.random() < 0.5 ? true : false;
            if(isMove && !isOver){
                socket.emit('cpu_horse_movement');
                send_horse_movement(room);
            }
        }, 400);
    },
    /**
     * Description
     * @method send_horse_movement
     * @param {} id
     * @return 
     */
    send_horse_movement: function(room){
        console.log(room);
        //this.socket.emit('cpu_horse_movement');
        //io.sockets.in(room).emit('cpu_horse_movement', room);
    },
    /**
     * Description
     * @method clear_horse_interval
     * @return 
     */
    clear_horse_interval : function(){
      clearInterval(this.horse_interval);
    }
};

module.exports = race_module;
