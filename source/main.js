/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/

function Jgame( config ) {
  /* Variables */
  this.rooms = [];
  this.sorcery = { fake_room: false, current_room: -1 };
  this.ready = false;

  /* Objects */
  require("./objects/keyboard.js");
  require("./objects/object.js");
  require("./objects/room.js");

  /* Game functions */
  require("./functions/lib.js")

  /* Game steps */
  require("./gear/creation.js");
  require("./gear/gear.js");
  require("./gear/draw.js");
  require("./gear/run.js");

  /* RETURN THE GAME OBJECT */
  return this;
}

/*  TEST AREA */
var Game = new Jgame();

/* object creation */
var obj_player = Game.object_create();
obj_player.create( function() {

});
obj_player.step(function() {

})
obj_player.draw(function() {

});
console.log( "Object creation test:" );
console.log( obj_player );

/* room creation */
var room_1 = Game.room_add();
console.log( "Room creation test:" );
console.log( room_1 );

/* instance creation */
var instance = room_1.instance_create( obj_player, 0, 0);
console.log( "Intance creation test:" );
console.log( instance );

/* game start */
Game.run();
