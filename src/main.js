/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
include("lib/math.js")
function Jgame( config ) {
  /* CONFIG SETUP */
  this.def = {
    canvas: {},
    viewport: {
      width: 640,
      height: 480
    }
  }
  var CS = Object.assign(this.def.canvas, config);
  /* VARIABLES */
  this.rooms = [];
  this.current_room = false;
  this.ready = true;
  this.debug = false;
  this.keyboard = false;
  this.viewport = this.def.viewport;
  var VP = {
    width: this.viewport.width,
    height: this.viewport.height,
    style: "background: #5555FF;"
  };
  /* BASE */
  include("lib/base.js")

  /* OBJECT */
  include("objects/keyboard.js")
  include("objects/object.js")
  include("objects/room.js")

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
