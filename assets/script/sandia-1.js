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
        x_speed: 0,
        y_speed: 0,
        y_acceleration: 0.2,
        roate_angle: 0,
        isActivate: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.x_speed = 4 * Math.random() + 1,
        this.roate_angle = -150 * Math.random() - 50,
        cc.log(this.x_speed),
        cc.log(this.roate_angle),
        this.node.runAction(cc.rotateBy(1.5,this.roate_angle));
    },

    start () {

    },

    update (dt) {
        // cc.log('yes');
        this.node.x -= this.x_speed;
        this.y_speed += this.y_acceleration;
        this.node.y -= this.y_speed;
    },
});
