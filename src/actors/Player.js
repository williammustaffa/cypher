import Actor from 'entities/Actor';

export default class Player extends Actor {
  constructor(props) {
    super(props);
    this.solid = true;
    this.image_speed = 0;
    this.sprite_index = 'SprPlayer';
    this.gravity_direction = 270;
  }

  step({ keyboard }) {
    let canJump = false;
    if (keyboard.check(keyboard.constants.left)) {
      this.x--;
      this.xscale = -1;
    }

    if (keyboard.check(keyboard.constants.right)) {
      this.x++;
      this.xscale = 1;
    }

    if (this.y + (this.height / 2) > this.room.height + 1) {
      this.vspeed = 0;
      this.gravity = 0;
      canJump = true;
    } else {
      this.gravity = 0.5;
    }

    if (keyboard.pressed(keyboard.constants.space) && canJump) this.vspeed = -10;
  }
}