import { Actor, Scene, Sprite, Game } from "./core/entities";
import { CONSTANTS } from "./core/utils";

let gameEntity = new Game();

let sprPlayer = new Sprite({
  src: './assets/sprites/sprite2.png',
  h_frames: 7,
  v_frames: 2,
  x_origin: CONSTANTS.center,
  y_origin: CONSTANTS.center,
});

gameEntity.addAsset(sprPlayer);

let actorPlayer = new Actor({
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

let sceneDemo = new Scene({
  viewports: [
    { x: 0, y: 0, width: 640, height: 480}, // this is the default
  ],
  instances: [
    { type: actorPlayer, x: 16, y: 16 },
    { type: actorPlayer, x: 56, y: 32 },
  ]
});

gameEntity.addScene(sceneDemo);

// Init the game
gameEntity.init();