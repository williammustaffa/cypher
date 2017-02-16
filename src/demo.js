import Jgame from './main';
import { GLOBAL } from './lib/constants';
import { random } from './lib/math';
/*  TEST AREA */
/* You do have to follow this order of creation jGame, rooms, objects, instances */
var Game = new Jgame();
/* assets */
/* path , horizontal , vertical , xOrig , yOrig */
var spr_player = Game.sprite_add("assets/sprites/sprite2.png", 7, 2, GLOBAL.center, GLOBAL.center);
/* room creation */
var room_1 = Game.room_add({height: 240});
/* viewport from room_1 */
room_1.viewports[0].height = room_1.view_height/2;
room_1.add_viewport({height: room_1.view_height/2, destinationY: room_1.view_height/2});
var room_2 = Game.room_add();
/* object creation */
var obj_player = Game.object_create();
obj_player.class = "PLAYER";
obj_player.create = function() {
  this.incognita = random(100);
  this.sprite_index = spr_player;
};
obj_player.step = function() {
  /* gravity test */
  if (this.y < Game.current_room.height-40) {
    this.vspeed += 1;
  } else {
    this.vspeed = 0;
  }
  /* keyboard */
  if (Game.keyboard.check(GLOBAL.right)) {
    this.x += 5;
  }
  if (Game.keyboard.check(GLOBAL.left)) {
    this.x -= 5;
  }
  if (Game.keyboard.check(GLOBAL.up) && this.y >= Game.current_room.height-40) {
    this.vspeed = -16;
  }
};

obj_player.draw = function() {
  Game.draw_set_color("#333388");
  Game.draw_circle(this.x, this.y, 20, 0);
  Game.draw_set_color("#fff");
  Game.draw_text(this.incognita, this.x, this.y);
  Game.current_room.viewports[0].x = this.x - Game.current_room.viewports[0].width/2;
  Game.current_room.viewports[0].y = this.y - Game.current_room.viewports[0].height/2;
};
/* object ground */
var ground = Game.object_create();
ground.draw = function() {
  Game.draw_rectangle_color(this.x, this.y, this.x +32, this.y+32, "red");
}

/* control object */
var control = Game.object_create();
control.step = function() {
  if (Game.keyboard.pressed("enter")) {
    Game.room_goto(room_2);
  }
}
/* instance creation */
var instance = room_1.instance_create( obj_player, 100, 80);
room_1.instance_create( ground, 120, 120);
room_1.instance_create( control, 0, 0);

/* control object */
var control2 = Game.object_create();
control2.step = function() {
  if (Game.keyboard.pressed("enter")) {
    Game.room_goto(room_1);
  }
}
/* instance creation */
var instance = room_2.instance_create( obj_player, 300, 80);
room_2.instance_create( control2, 0, 0);
/* game start */
Game.run();
