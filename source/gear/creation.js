this.start = function() {
  /* variables */
  var Error = false;
  /* run check */
  if ( this.ready == true ) {
    this.step();
    this.draw();
  } else {
    if ( this.sorcery.current_room >= 0 ) {
      if ( Room.prototype.isPrototypeOf( this.rooms[ this.sorcery.current_room ] ) ) {
        this.ready = true;
        this.sorcery.fake_room = this.rooms[ this.sorcery.current_room ];
      } else {
        Error = "[jGame] Invalid room object";
      }
    } else {
      Error = "[Jgame] You have to create at least one room";
    }
  }
  /* if there is no error, we do the animation */
  if ( Error == false ) {
    var me = this;
    setTimeout( function() {
      me.start();
    }, 1000/30);
  } else {
    console.log( Error );
  }
}
