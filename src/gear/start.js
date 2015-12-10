/* GAME RUN SETUP */
this.start = function() {
  /* variables */
  var Error = false;
  var game_instance = this;
  if  ( this.debug ) {
    console.log("UPDATED:")
    console.log( game_instance );
  }
  /* run gear */
  game_instance.step();
  game_instance.draw();
  game_instance.keyboard.reset();
  /* if there is no error, we do the animation */
  setTimeout( function() {
    game_instance.start();
  } , 2000);
}
/* init events organizer */
this.run = function() {
  /* unique settings */
  this.keyboard = new Keyboard();
  this.start();
}
