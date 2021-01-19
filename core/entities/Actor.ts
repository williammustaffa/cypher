import { ENTITY_TYPES } from '@core/constants/entityTypes';
import { IActor, IActorProps, DEFAULT_PROPS } from './Actor.interfaces';
import uuid from 'uuid';

export class Actor implements IActor {
  group_identifier: string = ENTITY_TYPES.ACTOR;

  id: string;
  x: number = 0;
  y: number = 0;
  xscale: number = 1;
  yscale: number = 1;
  xoffset: number = 0;
  yoffset: number = 0;
  solid: boolean = false;
  vspeed: number = 0;
  hspeed: number = 0;
  speed: number = 0;
  direction: number = 0;
  gravity: number = 0;
  gravity_direction: number = 270;
  image_index: number = 0;
  image_speed: number = 0;
  image_angle: number = 0;
  color: string = 'transparent';
  sprite: any = null;

  create: VoidFunction;
  step: VoidFunction;
  draw: VoidFunction;

  private tools: Object;
  private def_width: number;
  private def_height: number;

  constructor(props: IActorProps = DEFAULT_PROPS) {
    this.id = uuid.v4();
    this.x = props.x;
    this.y = props.y;
    this.tools = props.room.tools;

    console.info('[Cypher] New actor created:', this);
  }

  get image_number() {
    if (this.sprite) {
      const { h_frames, v_frames } = this.sprite;
      return h_frames * v_frames;
    }
    return 0;
  }

  get height() {
    if (this.sprite) {
      const { frame_height, offset_top, offset_bottom } = this.sprite;
      return frame_height - (offset_top + offset_bottom);
    }

    return this.def_height;
  }

  get width() {
    if (this.sprite) {
      const { frame_width, offset_left, offset_right } = this.sprite;
      return frame_width - (offset_left + offset_right);
    }

    return this.def_width;
  }

  inner_create = () => {
    if (typeof this.create === 'function') {
      this.create.call(this, this.tools);
    }

    // TODO: movie assets loading to initial game loading
    if (this.sprite && !this.sprite.load) {
      const SpriteInstance = this.sprite;
      this.sprite = new SpriteInstance();
      this.sprite.load();
    }
  }

  inner_step = () => {
    this.vspeed -= this.gravity * (Math.sin(this.gravity_direction * Math.PI / 180));
    this.hspeed += this.gravity * (Math.cos(this.gravity_direction * Math.PI / 180));

    if (typeof this.step === 'function') {
      this.step.call(this, this.tools);
    }

    this.y += this.vspeed + (this.speed * Math.sin(this.direction * Math.PI / 180));
    this.x += this.hspeed + (this.speed * Math.cos(this.direction * Math.PI / 180));
  }

  inner_draw = () => {
    if (typeof this.draw === 'function') {
      this.draw.call(this, this.tools);
    }
  }
}
