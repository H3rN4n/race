//race controller
var race_controller = module.exports.race_controller = {
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
        this.clear_horse_interval();
    },
    isOver : null,
    horse_interval: null,
    /**
     * Description
     * @method random_horse_movement
     * @return 
     */
    random_horse_movement : function(){
        this.horse_interval = setInterval(function(){
            console.log('check');
            var isMove = Math.random() < 0.5 ? true : false;
            if(isMove && race_controller.isOver == false){
                io.emit('cpu_horse_movement');
            }
        }, 500);
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
