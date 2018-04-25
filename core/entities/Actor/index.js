import Sprite from "entities/Sprite";
import Constants from "utils/Constants";

/* Actors */
export default class Actor {
  /**
   * Define class group
   */
  group_identifier = Constants.ACTOR;

  constructor(attributes = {}) {
    /* handle attributes */
    let { create, step, draw } = attributes;
    if (!create) create = this.emptyFunction;
    if (!step) step = this.emptyFunction;
    if (!draw) draw = this.emptyFunction;

    /* Instance local variables */
    this.id = null;
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
    this.sprite_index = attributes.sprite_index || null;
    this.image_index = attributes.image_index || 0;
    this.image_speed = typeof attributes.image_speed == 'number' ? attributes.image_speed : 1;
    this.image_number = 0;
    this.image_angle = 0;
    this.color = attributes.color || 'transparent';
  
    /* Object events */
    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);

    console.info('[jGame] New actor created:', this);
  }

  get height() {
    if (Object.keys(this.room.sprites).includes(this.sprite_index)) {
      const { frame_height, offset_top, offset_bottom} = this.room.sprites[this.sprite_index];
      return frame_height - (offset_top + offset_bottom);
    }
    return this.def_height;
  }

  get width() {
    if (Object.keys(this.room.sprites).includes(this.sprite_index)) {
      const { frame_width, offset_left, offset_right} = this.room.sprites[this.sprite_index];
      return frame_width - (offset_left + offset_right);
    }
    return this.def_width;
  }

  innerCreate = () => {
    this.create();
  }

  innerStep = () => {

    this.vspeed -= this.gravity * (Math.sin(this.gravity_direction * Math.PI / 180));
    this.hspeed += this.gravity * (Math.cos(this.gravity_direction * Math.PI / 180));

    this.step();

    this.y += this.vspeed + ( this.speed * Math.sin( this.direction * Math.PI / 180));
    this.x += this.hspeed + ( this.speed * Math.cos( this.direction * Math.PI / 180));

  }

  innerDraw = context => {
    this.draw();
  }

  emptyFunction() {
    /* no-function handler */
  }
}
