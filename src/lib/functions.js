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
/* Sprites Functions */
this.sprite_add = function( path , w_frame_number , h_frame_number , xOrig , yOrig){
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
