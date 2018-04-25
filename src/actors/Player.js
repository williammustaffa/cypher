import Actor from 'entities/Actor';

export default class Player extends Actor {
  constructor(props) {
    super(props);
    this.solid = true;
    this.image_speed = 0.1;
    this.image_index = 13;
    this.sprite_index = 'SprPlayer';
    this.gravity_direction = 270;
  }

  step({ keyboard }) {
    let canJump = false;

    if (keyboard.check(keyboard.constants.left)) this.x--;
    if (keyboard.check(keyboard.constants.right)) this.x++;

    if (this.y + (this.height / 2) > this.room.height) {
      this.vspeed = 0;
      this.gravity = 0;
      canJump = true;
    } else {
      this.gravity = 0.5;
    }

    if (keyboard.pressed(keyboard.constants.space) && canJump) this.vspeed = -10;
  }

  draw() {
    /* empty action */
  }
}