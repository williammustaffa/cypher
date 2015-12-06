/* object creation function */
this.object_create = function() {
  var new_object = new Object();
  return new_object;
}
/* room creation function */
this.room_add = function() {
  var new_room = new Room();
  var index = this.rooms.push( new_room ) - 1;
  if ( this.sorcery.current_room == -1 ) {
    this.sorcery.current_room = index;
  }
  return this.rooms[ index ];
}
