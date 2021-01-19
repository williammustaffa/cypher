import Constants from 'utils/Constants';
import uuid from 'uuid';

/* Actors */
export default class Actor {
  /**
   * Define class group
   */
  group_identifier = Constants.ACTOR;

  constructor(props = {}) {
    this.id = uuid.v4();
    this.solid = props.solid || 0;
    this.def_width = props.width || 0;
    this.def_height = props.height || 0;

    // Transform variables
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.xscale = props.xscale || 1;
    this.yscale = props.yscale || 1;

    // Physics variables
    this.vspeed = props.vspeed || 0;
    this.hspeed = props.hspeed || 0;
    this.gravity = props.gravity || 0;
    this.gravity_direction = props.gravity_direction || 270;
    this.direction = props.direction || 0;
    this.speed = props.speed || 0;

    // Sprite variables
    this.xOffset = props.xOffset || 0;
    this.yOffset = props.yOffset || 0;
    this.sprite = props.sprite || null;
    this.image_index = props.image_index || 0;
    this.image_speed = typeof props.image_speed == 'number' ? props.image_speed : 1;
    this.image_angle = 0;
    this.color = props.color || 'transparent';

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
    if (this.sprite && !this.sprite.load) {
      this.sprite = new this.sprite();
      this.sprite.load();
    }

    if (typeof this.create === 'function') {
      this.create.call(this, this.tools);
    }
  }

  inner_step = () => {
    this.vspeed -= this.gravity * (Math.sin(this.gravity_direction * Math.PI / 180));
    this.hspeed += this.gravity * (Math.cos(this.gravity_direction * Math.PI / 180));

    console.log("PRAIA this", this);
    if (typeof this.step === 'function') {
      this.step.call(this, this.tools);
    }

    this.y += this.vspeed + ( this.speed * Math.sin( this.direction * Math.PI / 180));
    this.x += this.hspeed + ( this.speed * Math.cos( this.direction * Math.PI / 180));
  }

  inner_draw = () => {
    if (typeof this.draw === 'function') {
      this.draw.call(this, this.tools);
    }
  }
}
