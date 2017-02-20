import { Actor, Scene, Sprite } from './entities';

const CONSTANTS = {
  center: "center",
};

let spr_player = new Sprite({
  src: './assets/images/player.src',
  h_frames: 7,
  v_frames: 2,
  x_origin: CONSTANTS.center,
  y_origin: CONSTANTS.center,
})

let player = new Actor({
  class: 'obj_player',
  solid: true,
  create() {
    console.log("create event");
  },
  step() {
    console.log("step event");
  },
  draw() {
    console.log("draw_event");
  }
});

let scene = new Scene({
  viewports: [
    { x: 0, y: 0, width: 640, height: 480}, // this is the default
  ],
  instances: [
    { type: player, x: 16, y: 16 },
    { type: player, x: 56, y: 32 },
  ]
});
