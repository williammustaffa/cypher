/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/

function Jgame( config ) {

  /* OBJECT */
  include("objects/keyboard.js")
  include("objects/object.js")
  include("objects/room.js")

  /* VARIABLES */
  this.rooms = [];
  this.sorcery = { fake_room: false, current_room: -1 };
  this.ready = false;

  /* GAME FUNCTIONS */
  include("lib/functions.js")

  /* GEAR */
  include("gear/start.js")
  include("gear/step.js")
  include("gear/draw.js")

  /* RETURN THE GAME OBJECT */
  return this;
}
