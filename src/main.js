/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
function Jgame( config ) {
  /* BASE */
  include("lib/base.js")

  /* OBJECT */
  include("objects/keyboard.js")
  include("objects/object.js")
  include("objects/room.js")

  /* VARIABLES */
  this.rooms = [];
  this.current_room = false;
  this.ready = true;
  this.debug = true;
  this.keyboard = false;
  this.context = new_canvas();

  /* GAME FUNCTIONS */
  include("lib/functions.js")
  include("lib/math.js")

  /* DRAWING FUNCTIONS */
  include("lib/surface.js")

  /* GEAR */
  include("gear/step.js")
  include("gear/draw.js")
  include("gear/start.js")

  /* RETURN THE GAME OBJECT */
  return this;
}
