import uuid from 'uuid';
import { ConstructorFor } from '@core/interfaces';
import { Cypher, EngineUtilsInferface } from './Cypher';
import { Sprite } from './Sprite';

export interface ActorPropsInterface {
  x: number,
  y: number,
  engine: Cypher
}

export abstract class Actor {
  id: string;
  x: number = 0;
  y: number = 0;
  xScale: number = 1;
  yScale: number = 1;
  xOffset: number = 0;
  yOffset: number = 0;
  solid: boolean = false;
  vspeed: number = 0;
  hspeed: number = 0;
  speed: number = 0;
  direction: number = 0;
  gravity: number = 0;
  gravityDirection: number = 270;
  imageIndex: number = 0;
  imageSpeed: number = 0;
  imageAngle: number = 0;
  color: string = 'transparent';
  sprite: ConstructorFor<Sprite>;
  spriteInstance: Sprite;

  abstract create(utils?: EngineUtilsInferface): void;
  abstract step(utils?: EngineUtilsInferface): void;
  abstract draw(utils?: EngineUtilsInferface): void;

  private engine: Cypher;
  private defaultHeight: number;
  private defaultWidth: number;

  constructor(props: ActorPropsInterface) {
    this.id = uuid.v4();
    this.x = props.x;
    this.y = props.y;

    this.engine = props.engine;

    console.info('[Cypher] New actor created:', this);
  }

  get imageNumber() {
    if (this.spriteInstance) {
      return this.spriteInstance.horizontalFrames * this.spriteInstance.verticalFrames;
    }

    return 0;
  }

  get height() {
    if (this.spriteInstance) {
      return this.spriteInstance.frameHeight - (this.spriteInstance.offsetTop + this.spriteInstance.offsetBottom);
    }

    return this.defaultHeight;
  }

  get width() {
    if (this.spriteInstance) {
      return this.spriteInstance.frameWidth - (this.spriteInstance.offsetLeft + this.spriteInstance.offsetRight);
    }

    return this.defaultWidth;
  }

  innerCreate = () => {
    if (typeof this.create === 'function') {
      this.create.call(this, this.engine.utils);
    }

    // TODO: movie assets loading to initial game loading
    if (this.sprite) {
      const SpriteInstance = this.sprite;
      this.spriteInstance = new SpriteInstance();
      this.spriteInstance.load();
    }
  }

  innerStep = () => {
    this.vspeed -= this.gravity * (Math.sin(this.gravityDirection * Math.PI / 180));
    this.hspeed += this.gravity * (Math.cos(this.gravityDirection * Math.PI / 180));

    if (typeof this.step === 'function') {
      this.step.call(this, this.engine.utils);
    }

    this.y += this.vspeed + (this.speed * Math.sin(this.direction * Math.PI / 180));
    this.x += this.hspeed + (this.speed * Math.cos(this.direction * Math.PI / 180));
  }

  innerDraw = () => {
    if (typeof this.draw === 'function') {
      this.draw.call(this, this.engine.utils);
    }
  }
}
