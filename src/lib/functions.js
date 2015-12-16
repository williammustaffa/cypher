/* object creation function */
this.object_create = function() {
  var new_object = new ObjectJG();
  return new_object;
}
/* room creation function */
this.room_add = function( opt ) {
  var new_room = new Room( opt );
  if ( !this.current_room ) {
    this.current_room = new_room.clone();
  }
  var ind = this.rooms.push( new_room );
  new_room.index = ind-1;
  return new_room;
}

this.room_goto = function( room ) {
  if ( typeof room != "number" ) {
    room = room.index;
  }
  this.current_room = this.rooms[ room ].clone();
  this.current_room.start();
}
