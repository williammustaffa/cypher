/* Objects */
export default class Actor {
  constructor(attributes = {}) {
    /* handle attributes */
    let { create, step, draw } = attributes;
    if (!create) create = this.emptyFunction;
    if (!step) step = this.emptyFunction;
    if (!draw) draw = this.emptyFunction;

    /* Instance local variables */
    this.id = null;
    this.class = attributes.class || 'generic';
    this.solid = attributes.solid || 0;
    this.width = attributes.width || 0;
    this.height = attributes.height || 0;
  
    /* Transform variables */
    this.x = 0;
    this.y = 0;
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
    this.image_speed = attributes.image_speed || 1;
    this.image_number = 0;
    this.image_angle = 0;
    this.color = attributes.color || "#FFFFFF";
  
    /* Object events */
    this.create = create.bind(this);
    this.step = step.bind(this);
    this.draw = draw.bind(this);

    console.info('[jGame] New actor created:', this);
  }

  innerCreate = () => {
    this.create();
  }

  innerStep = () => {
    this.vspeed += this.gravity * ( Math.sin( this.gravity_direction * Math.PI / 180 ) );
    this.hspeed += this.gravity * ( Math.cos( this.gravity_direction * Math.PI / 180 ) );
    this.y += this.vspeed + ( this.speed * Math.sin( this.direction * Math.PI / 180 ) );
    this.x += this.hspeed + ( this.speed * Math.cos( this.direction * Math.PI / 180 ) );
    this.step();
  }

  innerDraw = context => {
    this.draw();
  }

  emptyFunction() {
    /* no-function handler */
  }
}
