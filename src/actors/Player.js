import Actor from 'entities/Actor';
import Constants from 'utils/Constants';

export default class Player extends Actor {
  constructor(props) {
    super(props);
    this.solid = true;
    this.image_speed = 0.1;
    this.image_index = 13;
    this.sprite_index = 'SprPlayer';
    this.color = '#ff0000';
    this.gravity_direction = 270;
  }

  step() {
    let canJump = false;

    if (keyboard.check(Constants.left)) this.x--;
    if (keyboard.check(Constants.right)) this.x++;

    if (this.y + (this.height) > this.room.height) {
      this.vspeed = 0;
      this.gravity = 0;
      canJump = true;
    } else {
      this.gravity = 0.5;
    }

    if (keyboard.pressed(Constants.space) && canJump) this.vspeed = -10;
  }

  draw() {
    /* empty action */
  }
}