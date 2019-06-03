import Constants from 'utils/Constants';
import uuid from 'uuid';

/* Actors */
export default class Actor {
  /**
   * Define class group
   */
  group_identifier = Constants.ACTOR;

  constructor(attributes = {}) {
    /* Instance local variables */
    this.id = uuid.v4();
    this.room = attributes.room;
    this.solid = attributes.solid || 0;
    this.def_width = attributes.width || 0;
    this.def_height = attributes.height || 0;

    /* Transform variables */
    this.x = attributes.x || 0;
    this.y = attributes.y || 0;
    this.xscale = attributes.xscale || 1;
    this.yscale = attributes.yscale || 1;

    /* Physics variables */
    this.vspeed = attributes.vspeed || 0;
    this.hspeed = attributes.hspeed || 0;
    this.gravity = attributes.gravity || 0;
    this.gravity_direction = attributes.gravity_direction || 270;
    this.direction = attributes.direction || 0;
    this.speed = attributes.speed || 0;

    /* Sprite control variables */
    this.xOffset = attributes.xOffset || 0;
    this.yOffset = attributes.yOffset || 0;
    this.sprite = attributes.sprite || null;
    this.image_index = attributes.image_index || 0;
    this.image_speed = typeof attributes.image_speed == 'number' ? attributes.image_speed : 1;
    this.image_angle = 0;
    this.color = attributes.color || 'transparent';

    /* Object events */
    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);

    console.info('[jGame] New actor created:', this);
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

  inner_create() {
    if (this.sprite && !this.sprite.load) {
      this.sprite = new this.sprite();
      this.sprite.load();
    }

    this.create(this.room.tools);
  }

  inner_step() {
    this.vspeed -= this.gravity * (Math.sin(this.gravity_direction * Math.PI / 180));
    this.hspeed += this.gravity * (Math.cos(this.gravity_direction * Math.PI / 180));

    this.step(this.room.tools);

    this.y += this.vspeed + ( this.speed * Math.sin( this.direction * Math.PI / 180));
    this.x += this.hspeed + ( this.speed * Math.cos( this.direction * Math.PI / 180));
  }

  inner_draw() {
    this.draw(this.room.tools);
  }

  create() { /* user access */ }

  step() { /* user access */ }

  draw() { /* user access */ }
}
