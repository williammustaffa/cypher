/* Rooms */
function Room() {
  this.id = null;
  this.name = null;
  this.dimensions = { width: 640, height: 480 };
  this.viewports = [];
  /* viewport settings */
  this.add_viewport = function( options ) {
    var def = { width: this.dimensions.width, height: this.dimensions.height, x: 0, y: 0 , active: false };
    for(var key in options){
      if (def.hasOwnProperty(key)) def[key] = options[key];
    }
    var index = this.viewports.push( def );
    return this.viewports[ index - 1 ]
  }
  this.instances = [];
  /* room function */
  this.instance_create = function( obj ) {
    var new_instance = obj.clone();
    var index = this.instances.push( new_instance );
    return this.instances[ index - 1 ];
  }
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var obj_clone = new Room();
    obj_clone.prototype = this;
    return obj_clone;
  };
  /* add a default viewport */
  this.add_viewport({active: true});

  /* return room object */
  return this;
}
