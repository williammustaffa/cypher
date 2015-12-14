/*  TEST AREA */
/* You do have to follow this order of creation jGame, rooms, objects, instances */
var Game = new Jgame();
/* room creation */
var room_1 = Game.room_add();
var room_2 = Game.room_add();

/* object creation */
var obj_player = Game.object_create();

obj_player.create = function() {
  this.incognita = random(100);
};
obj_player.step = function() {
  if (Game.keyboard.check("right")) {
    this.x += 5;
  }
  if (Game.keyboard.check("left")) {
    this.x -= 5;
  }
  if (Game.keyboard.check("up")) {
    this.y -= 5;
  }
  if (Game.keyboard.check("down")) {
    this.y += 5;
  }
};

obj_player.draw = function() {
  Game.draw_text(this.incognita, this.x, this.y);
  Game.current_room.viewports[0].x = this.x;
  Game.current_room.viewports[0].y = this.y;
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
