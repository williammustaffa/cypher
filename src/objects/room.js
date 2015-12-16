/* Rooms */
function Room( opt ) {
  this.default = {
    width: 640,
    height: 480,
    view_width: 640,
    view_height: 480
  }
  this.default = Object.assign(this.default, opt);
  this.id = null;
  this.name = null;
  this.width = this.default.width;
  this.height = this.default.height;
  this.view_width = this.default.view_width;
  this.view_height = this.default.view_height;
  this.viewports = [];
  /* viewport settings */
  this.add_viewport = function( options ) {
    var def = { width: this.width, height: this.height, x: 0, y: 0 , destinationX: 0, destinationY: 0, active: false };
    for(var key in options){
      if (def.hasOwnProperty(key)) def[key] = options[key];
    }
    var index = this.viewports.push( def );
    return this.viewports[ index - 1 ]
  }
  this.objects = [];
  this.instances = [];
  /* room function */
  this.instance_create = function( obj, x, y ) {
    var new_instance = obj.clone();
    new_instance.x = x;
    new_instance.y = y;
    var index = this.objects.push( new_instance );
    /* return array */
    return new_instance;
  }
  this.start = function() {
    var newInstances = [];
    this.objects.forEach(function( index, value ) {
      var instance_copy = Object.assign({}, index);
      instance_copy.create();
      newInstances.push( instance_copy );
    });
    this.instances = newInstances;
  }
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var me = this;
    var obj_clone =  Object.assign({}, me);
    return obj_clone;
  };
  /* add a default viewport */
  this.add_viewport({active: true});

  /* return room object */
  return this;
}
