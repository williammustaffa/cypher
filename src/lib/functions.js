/* object creation function */
this.object_create = function() {
  var new_object = new Object();
  return new_object;
}
/* room creation function */
this.room_add = function() {
  var new_room = new Room();
  if ( !this.current_room ) {
    this.current_room = new_room;
  }
  return new_room;
}
