/*  TEST AREA */
var Game = new Jgame();

/* object creation */
var obj_player = Game.object_create();
obj_player.create( function() {
  this.incognita = random(100);
});
obj_player.step(function() {

})
obj_player.draw(function() {
  drwa_set_color("#fff")
  draw_text(this.incognita, this.x, this.y);
});
console.log( "Object creation test:" );
console.log( obj_player );

/* room creation */
var room_1 = Game.room_add();
console.log( "Room creation test:" );
console.log( room_1 );

/* instance creation */
var instance = room_1.instance_create( obj_player, 60, 60);
console.log( "Intance creation test:" );
console.log( instance );

/* game start */
Game.run();
