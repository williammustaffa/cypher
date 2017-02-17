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
  }

  instance_create(obj, x, y ) {
    var new_instance = {...obj, x, y, id: `object-${this.objects.length}`};
    this.objects = [...this.objects, new_instance];
    /* return array */
    return new_instance;
  }

  instance_destroy({ id }) {
    // this.instances = this.instances.filter((inst) => {
    //   if (inst.id == id) return false;
    // });
  }

  start() {
    this.instances = this.objects.map(( index, value ) => {
      console.log("STARTING ROOM")
      var instance_copy = {...index};
      instance_copy.create();
      return instance_copy;
    });
  }

  add_viewport(config) {
    var options = {
      width: this.width,
      height: this.height,
      x: 0,
      y: 0 ,
      destinationX: 0,
      destinationY: 0,
      active: false,
      ...config,
    };

    var index = this.viewports.push(options);
    return this.viewports[index - 1]
  }
}
