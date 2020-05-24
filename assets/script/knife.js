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
        color: "#cbd3db",
        life: 0.2,
        isActivate: true,
        width: 10,
        height: 10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.color = new cc.Color().fromHEX(this.color);
        // cc.log(this.node.color);
    },

    start () {
        
    },

    set() {

    },

    resetProperties(){
        this.color = "#cbd3db";
        this.life = 0.2;
        this.isActivate = true,
        this.width = 10;
        this.height = 10;
        this.node.width = this.width;
        this.node.height = this.height;
        this.node.angle = 0;
    },

    update (dt) {

        if(!this.isActivate){
            this.life -= dt;
            if(this.node.width > 0){
                this.node.width -= dt / this.life * this.width;
            }
            
        }
        
    },
});
