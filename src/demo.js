import { Actor, Scene, Sprite, Game } from "./core/entities";
import { CONSTANTS } from "./core/utils";

let SprPlayer = new Sprite({
  src: './assets/sprites/sprite2.png', // sprite source
  h_frames: 7, // number of horizontal frames to be splited
  v_frames: 2, // number of vertical frames to be splited
  offset_left: 5,
  offset_right: 3,
  offset_top: 5,
  offset_bottom: 0,
  x_origin: CONSTANTS.center, // center sprite on actor x coordinate
  y_origin: CONSTANTS.center, // center sprite on actor y coordinate
});

class Player extends Actor {
  constructor(props) {
    super(props);
    this.solid = true;
    this.image_speed = 0.1;
    this.image_index = 13;
    this.sprite_index = SprPlayer;
    this.gravity = 0.5;
    this.gravity_direction = 270;
  }

  step() {
    let canJump = false;

    if (keyboard.check(CONSTANTS.left)) this.x--;
    if (keyboard.check(CONSTANTS.right)) this.x++;

    if (this.y + (this.sprite_index.frame_height / 2) > this.room.height) {
      this.vspeed = 0;
      canJump = true;
    }

    if (keyboard.pressed(CONSTANTS.space) && canJump) this.vspeed = -10;
  }

  draw() {
    /* empty action */
  }
}

class DemoStage extends Scene {
  constructor() {
    super();
    this.set_height(640);
    this.set_width(480);
    this.add_viewport(0, 0, 640, 480, 0, 0, 640, 480);
    this.add_instance(Player, 240, 240);
  }
};

new Game({
  width: 640, // window width
  height: 480, // window height
  assets: [SprPlayer],
  scenes: [DemoStage],
}).init();