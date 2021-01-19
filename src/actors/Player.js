import { Actor } from '@core';
import SprPlayer from '@sprites/SprPlayer';

export default class Player extends Actor {
  create() {
    this.solid = true;
    this.image_speed = 0;
    this.sprite = SprPlayer;
    this.gravity_direction = 270;
  }

  step({ game, room, keyboard }) {
    let canJump = false;
    if (this.y + (this.height / 2) > room.height + 1) {
      this.vspeed = 0;
      this.gravity = 0;
      canJump = true;
    } else {
      this.gravity = 0.5;
    }

    if (keyboard.check('ArrowLeft')) {
      this.x--;
      this.xscale = -1;
    }

    if (keyboard.check('ArrowRight')) {
      this.x++;
      this.xscale = 1;
    }

    if (keyboard.check('ArrowDown') && canJump) {
      if (this.image_index < this.image_number - 1) {
        this.image_index ++;
      }
    } else {
      if (this.image_index > 0) this.image_index --;
    }

    if (keyboard.pressed('Space') && canJump) this.vspeed = -10;

    if (keyboard.pressed('Escape')) {
      game.set_scene(1);
    }
  }
}