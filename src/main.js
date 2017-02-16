/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
import Canvas from "./lib/canvas";
import gameObject from "./utils/object";
import * as functions from "./lib/functions";
import * as surfaces from "./lib/surface";
import * as startGear from "./gear/start";
import * as stepGear from "./gear/step";
import * as drawGear from "./gear/draw";

export default class Jgame {
  constructor(config) {
    /* CONFIG SETUP */
    const defaults = {
      canvas: {},
      viewport: {
        width: 640,
        height: 480
      }
    }
    var CS = Object.assign(defaults.canvas, config);
    this.rooms = [];
    this.sprites = [];
    this.sounds = [];
    this.current_room = false;
    this.ready = true;
    this.debug = false;
    this.keyboard = false;
    this.viewport = defaults.viewport;
    var VP = {
      width: this.viewport.width,
      height: this.viewport.height,
      style: "background: #5555FF;"
    };
    /* BASE */

    /* room surface setup */
    var surface = new Canvas(0, CS.canvas);
    this.context = surface.context;

    /* view surafce setup */
    this.view = new Canvas(1, VP);
    this.scene = this.view.context;

    /* FUNCTIONS */
    this.object_create = functions.object_create.bind(this);
    this.room_add = functions.room_add.bind(this);
    this.room_goto = functions.room_goto.bind(this);
    this.sprite_add = functions.sprite_add.bind(this);

    /* DRAWING FUNCTIONS */
    this.draw_circle = surfaces.draw_circle.bind(this);
    this.draw_rectangle = surfaces.draw_rectangle.bind(this);
    this.draw_line = surfaces.draw_line.bind(this);
    this.draw_rectangle_color = surfaces.draw_rectangle_color.bind(this);
    this.draw_set_color = surfaces.draw_set_color.bind(this);
    this.draw_sprite = surfaces.draw_sprite.bind(this);
    this.draw_text = surfaces.draw_text.bind(this);
    this.font_style = surfaces.font_style.bind(this);

    /* GEAR */
    this.start = startGear.start.bind(this);
    this.run = startGear.run.bind(this);
    this.step = stepGear.step.bind(this);
    this.draw = drawGear.draw.bind(this);
  }
}
