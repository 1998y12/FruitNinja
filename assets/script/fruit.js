// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        fruit_type: null,
        position_x: null,
        position_y: null,
        fruit_per_roate: 0,
        fruit_all: {
            default: null,
            type: cc.Prefab
        },
        fruit_apart_1: {
            default: null, 
            type: cc.Prefab
        },
        fruit_apart_2: {
            default: null,
            
            type: cc.Prefab
        },
        fruit_all_curent_angle: 0,
        fruit_all_per_roate_angle: 0,
        fruit_all_x_speed: 0,
        fruit_all_y_speed: 0,
        fruit_all_y_acc: 0.15,

        fruit_apart_x_speed: 0,
        fruit_apart_y_speed: 0,
        fruit_apart_y_acc: 0.17,
        fruit_apart_roate_angle: 150,
 
        isBroken: false,

        isActivate: true,
        isAvailable: true,

        game_manager: null,

    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    reset_all_properties(){
        this.fruit_type = null;
        this.position_x = null;
        this.position_y = null;
        this.fruit_per_roate = 0;
        this.fruit_all = null;
        this.fruit_apart_1 = null;
        this.fruit_apart_2 = null;
        this.fruit_all_curent_angle= 0;
        this.fruit_all_per_roate_angle = 0;
        this.fruit_all_x_speed = 0;
        this.fruit_all_y_speed = 0;
        this.fruit_all_y_acc = 0.15;

        this.fruit_apart_x_speed = 0;
        this.fruit_apart_y_speed = 0;
        this.fruit_apart_y_acc = 0.17;
        this.fruit_apart_roate_angle = 150;
 
        this.isBroken = false;

        this.isActivate = true;
        
    },

    set_properties(fruit_type,fruit_all,fruit_apart_1,fruit_apart_2,fruit_all_per_roate_angle,position_x,position_y,fruit_all_x_speed,fruit_all_y_speed){
        
        // this.reset_all_properties();

        this.fruit_type = fruit_type;
        this.fruit_all = fruit_all;
        this.fruit_apart_1 = fruit_apart_1;
        this.fruit_apart_2 = fruit_apart_2;
        this.fruit_apart_roate_angle = -150 * Math.random() - 50,
        this.fruit_all_per_roate_angle = fruit_all_per_roate_angle;
        this.position_x = position_x;
        this.position_y = position_y;
        this.fruit_all_x_speed = fruit_all_x_speed;
        this.fruit_all_y_speed = fruit_all_y_speed;
        if(this.position_x && this.position_y){
            this.fruit_all.x = this.position_x;
            this.fruit_all.y = this.position_y;
            
        }
        if(this.fruit_type == "boom"){

            this.game_manager.boom_flame_schedule = function(){

                if(Math.random() < 0.9)
                {
                    let bf = this.game_manager.getPooledBoomFlame(this.game_manager.gid++,0.2 + 0.5 * Math.random(),[this.fruit_all.x + this.game_manager.node_w/2 - this.game_manager.boom.width/2+3,this.fruit_all.y + this.game_manager.node_h/2 + this.game_manager.boom.height/2-3],Math.PI * 2 * Math.random(),60,this.game_manager.global_timer,cc.instantiate(this.game_manager.paint));
                    
                    this.game_manager.node.addChild(bf.paint);
                }
                    
                for (var i in this.game_manager.pooled_boom_flame){
    
                    if(this.game_manager.pooled_boom_flame[i].active == false){
                        
                        this.game_manager.pooled_boom_flame[i].elapse = this.game_manager.global_timer - this.game_manager.pooled_boom_flame[i].create_time;
                        
                        this.game_manager.pooled_boom_flame[i].update_boom_flame(this.game_manager.drawLine.bind(this.game_manager));
                    
                    }
                }
            }
    
            this.schedule(this.game_manager.boom_flame_schedule.bind(this), 0.04);
        }
        
        this.game_manager.node.addChild(this.fruit_all);
        
    },

    fruit_up_down(){
        this.fruit_all.x += this.fruit_all_x_speed;
        this.fruit_all_y_speed -= this.fruit_all_y_acc;
        this.fruit_all.y += this.fruit_all_y_speed;
    },

    apart(){
        this.isBroken = true;

        if(this.fruit_type != "boom"){
            cc.log('apart');
            this.fruit_apart_1.x = this.fruit_all.x;
            this.fruit_apart_1.y = this.fruit_all.y;
            this.fruit_apart_2.x = this.fruit_all.x;
            this.fruit_apart_2.y = this.fruit_all.y;
            
            this.fruit_apart_1.angle = this.fruit_all.angle;
            this.fruit_apart_2.angle = this.fruit_all.angle;

            let direction = Math.sign((this.fruit_all_curent_angle - 90) * (270 - this.fruit_all_curent_angle%360)+1e-10);
            this.fruit_apart_x_speed = (1.5 * Math.random() + 3.5) * direction;
            this.fruit_apart_roate_angle = (150 * Math.random() + 50) * direction;
            
            this.fruit_all.parent.removeChild(this.fruit_all);
            this.fruit_all = null;
            
            this.fruit_apart_1.runAction(cc.rotateBy(1,this.fruit_apart_roate_angle));
            this.fruit_apart_2.runAction(cc.rotateBy(1,-this.fruit_apart_roate_angle));
            
            this.game_manager.node.addChild(this.fruit_apart_1);
            this.game_manager.node.addChild(this.fruit_apart_2);
           
        }
        
        

    },

    update (dt) {
        if(!this.isBroken)
        {
            this.fruit_up_down();
            if(this.fruit_type != "boom")
            {
                this.fruit_all.angle += this.fruit_all_per_roate_angle;
                this.fruit_all_curent_angle = Math.abs(this.fruit_all.angle) % 360;
            }
            
        }
        else{
            
            if(this.fruit_type != "boom"){
                this.fruit_apart_1.x += this.fruit_apart_x_speed;
                this.fruit_apart_y_speed += this.fruit_apart_y_acc;
                this.fruit_apart_1.y -= this.fruit_apart_y_speed;
                
                this.fruit_apart_2.x -= this.fruit_apart_x_speed;
                this.fruit_apart_y_speed += this.fruit_apart_y_acc;
                this.fruit_apart_2.y -= this.fruit_apart_y_speed;
            }
            
            
        }
        

        this.isActivate = !this.is_out_canvas();
            
    },

    is_out_canvas(){
        if(!this.isBroken){
            return this.fruit_all.y < (this.game_manager.background.y - this.game_manager.node_h/2) ? true: false;
        }
        else
        {
            if(this.fruit_type!="boom")
                return (this.fruit_apart_1.y < (this.game_manager.background.y - this.game_manager.node_h/2) ? true: false) && (this.fruit_apart_2.y < (this.game_manager.background.y - this.game_manager.node_h/2) ? true: false);
        }
    },

    fruit_destroy(){
        
        if(this.fruit_type=="boom"){
            this.game_manager.removePooledBoomFlame();
            this.unscheduleAllCallbacks();
            this.fruit_all.parent.removeChild(this.fruit_all);
        }
        else{
            if(!this.isBroken){
            
                this.fruit_all.parent.removeChild(this.fruit_all);
            }
            else{
                this.fruit_apart_1.parent.removeChild(this.fruit_apart_1);
                this.fruit_apart_2.parent.removeChild(this.fruit_apart_2);
            }
        }
        
    }

});
