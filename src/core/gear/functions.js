import Room from "utils/room";
import gameObject from "utils/object";

/* object creation function */
export function object_create(config) {
  const options = { create() {}, step() {}, draw() {}, ...config };
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
  let nextRoom = this.rooms[room];
  this.current_room = { ...nextRoom };
  this.current_room.start();
}
