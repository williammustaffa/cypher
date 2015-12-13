/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
include("lib/math.js")
function Jgame( config ) {
  /* CONFIG SETUP */
  var def = {width: 640, height: 480}
  var CS = Object.assign(def, config);
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
  this.debug = false;
  this.keyboard = false;
  /* canvas setup */
  this.context = new Canvas(CS.width, CS.height);

  /* GAME FUNCTIONS */
  include("lib/functions.js")

  /* DRAWING FUNCTIONS */
  include("lib/surface.js")

  /* GEAR */
  include("gear/step.js")
  include("gear/draw.js")
  include("gear/start.js")

  /* RETURN THE GAME OBJECT */
  return this;
}
