/* Objects */
function ObjectJG() {
  /* Instance local variables */
  this.id = undefined;
  this.class = undefined;
  this.place_free = function() {};
  this.solid = 0;
  this.width = 32;
  this.height = 32;
  /* Transform variables */
  this.x = 0;
  this.y = 0;
  this.xscale = 1;
  this.yscale = 1;
  /* Positional variables */
  this.vspeed = 0;
  this.hspeed = 0;
  this.gravity = 0;
  this.gravity_direction = 270;
  this.direction = 0;
  this.speed = 0;
  /* Sprite control variables */
  this.mask_index = 0;
  this.xOffset = 16;
  this.yOffset = 16;
  this.sprite_index = 0;
  this.image_index = 0;
  this.image_speed = 1;
  this.image_number = 0;
  this.image_angle = 0;
  this.color = "#FFFFFF";
  /* Instance step functions */
  this.create = function( func ) {};
  this.step = function( func ) {};
  this.draw = function( func ) {};
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var me = this;
    var obj_clone =  Object.assign({}, me);
    return obj_clone;
  };
  /* Return object */
  return this;
}
