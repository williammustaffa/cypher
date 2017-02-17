import Room from "../utils/room";
import gameObject from "../utils/object";

/* object creation function */
export function object_create(config) {
  const options = {
    create() {

    },
    step() {

    },
    draw() {

    },
    ...config,
  }

  return new gameObject(options);
}
/* room creation function */
export function room_add(opt) {
  var new_room = new Room(opt);
  new_room.id = `room-${this.rooms.length}`;
  var ind = this.rooms.push(new_room);
  new_room.index = ind - 1;
  return new_room;
}

export function room_goto( room ) {
  if ( typeof room != "number" ) {
    room = room.index;
  }
  console.log("ASDasdasd", this.rooms);
  this.current_room = {...this.rooms[room]};
  this.current_room.start();
}

/* Sprites Functions */
export function sprite_add( path , w_frame_number , h_frame_number , xOrig , yOrig){
    var img = new Image();
    var index = this.sprites.length;
    this.sprites[index] = {};
    var Obj = this.sprites[index];
    img.src = path;
    Obj.image = img;
    Obj.image_number = w_frame_number*h_frame_number;
    Obj.wFrames = w_frame_number;
    Obj.hFrames = h_frame_number;
    Obj.xOrigin = xOrig;
    Obj.yOrigin = yOrig;
    Obj.ready = 0;
    img.onload = function() {
        Obj.frameWidth = this.width/Obj.wFrames;
        Obj.frameHeight = this.height/Obj.hFrames;
        Obj.height = this.width/Obj.wFrames;
        Obj.width = this.height/Obj.hFrames;
        if (xOrig == 'center') Obj.xOrigin = Obj.frameWidth/2;
        if (yOrig == 'center') Obj.yOrigin = Obj.frameHeight/2;
        Obj.ready = true;
    };
    return Obj;
}
