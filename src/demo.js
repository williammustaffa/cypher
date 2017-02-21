import { Actor, Scene, Sprite, Game } from "./core/entities";
import { CONSTANTS } from "./core/utils";

let sprPlayer = new Sprite({
  src: './assets/sprites/sprite2.png', // sprite source
  h_frames: 7, // number of horizontal frames to be splited
  v_frames: 2, // number of vertical frames to be splited
  x_origin: CONSTANTS.center, // center sprite on actor x coordinate
  y_origin: CONSTANTS.center, // center sprite on actor y coordinate
});

let actorPlayer = new Actor({
  class: 'obj_player',
  solid: true,
  sprite_index: sprPlayer,
  image_xscale: -1,
  create() {
    console.log("create event");
  },
  step() {
    // console.log("step event");
  },
  draw() {
    // console.log("draw_event");
  },
});

let sceneDemo = new Scene({
  width: 1200, // scene width
  height: 480, // scene height
  viewports: [
    {
      x: 0, // point x on scene
      y: 0, // point y on scene
      width: 640, // viewport width in scene
      height: 480, // viewport height in scene
      window_x: 0, // point x in game window
      window_y: 0, // point y in game window
      window_w: 640, // width in game window
      window_h: 480, // height in game window
    },
  ],
  instances: [
    {
      type: actorPlayer, // instance type
      x: 16, // instance start position x
      y: 16, // instance start position y
    },
  ],
});

let gameEntity = new Game({
  width: 640, // window(canvas) width
  height: 480, // window height
  assets: [
    sprPlayer, // add asset to the loader
  ],
  scenes: [
    sceneDemo, // add scene on the game
  ],
}).init();