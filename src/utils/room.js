/* Rooms */
export default class Room {
  constructor(config) {
    const defaults = {
      width: 640,
      height: 480,
      view_width: 640,
      view_height: 480
    }
    let configuration ={...defaults, ...config};
    this.id = null;
    this.name = "unknown";
    this.width = configuration.width;
    this.height = configuration.height;
    this.view_width = configuration.view_width;
    this.view_height = configuration.view_height;
    this.viewports = [];
    this.objects = [];
    this.instances = [];
    /* add a default viewport */
    this.add_viewport({ active: true });
    this.start = this.start.bind(this);
    this.instance_create = this.instance_create.bind(this);
    this.add_viewport = this.add_viewport.bind(this);
    this.clone = this.clone.bind(this);
  }
  instance_create(obj, x, y ) {
    var new_instance = obj.clone();
    new_instance.x = x;
    new_instance.y = y;
    new_instance.id = `object-${this.objects.length}`;
    var index = this.objects.push(new_instance);
    /* return array */
    return new_instance;
  }
  start() {
    // this is not wooorking
    var newInstances = this.objects.map(( index, value ) => {
      var instance_copy = {...index};
      instance_copy.create();
      return instance_copy;
    });
    this.instances = newInstances;
  }
  add_viewport(options) {
    var def = { width: this.width, height: this.height, x: 0, y: 0 , destinationX: 0, destinationY: 0, active: false };
    for(var key in options){
      if (def.hasOwnProperty(key)) def[key] = options[key];
    }
    var index = this.viewports.push( def );
    return this.viewports[ index - 1 ]
  }
  /* Cloning function, there is some kind of sorcery here */
  clone() {
    return {...this};
  };
}
