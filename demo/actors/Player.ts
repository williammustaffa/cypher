import { Actor, EngineUtilsInferface } from '@core/entities';
import SprPlayer from '@sprites/SprPlayer';


export default class Player extends Actor {
  create() {
    this.solid = true;
    this.imageSpeed = 0;
    this.sprite = SprPlayer;
    this.gravityDirection = 270;
  }

  step({ scene, keyboard, setScene }: EngineUtilsInferface) {
    let canJump = false;
    if (this.y + (this.height / 2) > scene.height + 1) {
      this.vspeed = 0;
      this.gravity = 0;
      canJump = true;
    } else {
      this.gravity = 0.5;
    }

    if (keyboard.check('ArrowLeft')) {
      this.x--;
      this.xScale = -1;
    }

    if (keyboard.check('ArrowRight')) {
      this.x++;
      this.xScale = 1;
    }

    if (keyboard.check('ArrowDown') && canJump) {
      if (this.imageIndex < this.imageNumber - 1) {
        this.imageIndex++;
      }
    } else {
      if (this.imageIndex > 0) this.imageIndex --;
    }

    if (keyboard.pressed('Space') && canJump) this.vspeed = -10;

    if (keyboard.pressed('Escape')) {
      setScene(1);
    }
  }

  draw() {

  }
}