import Keyboard from '../utils/keyboard';
/* GAME RUN SETUP */
export function start() {
  /* variables */
  var Error = false;
  var game_instance = this;
  /* run gear */
  game_instance.step();
  game_instance.draw();
  game_instance.keyboard.reset();
  /* if there is no error, we do the animation */
  setTimeout( function() {
    game_instance.start();
  } , 1000/30); // 30 steps in one second
}
/* init events organizer */
export function run() {
  /* unique settings */
  this.keyboard = new Keyboard();
  this.current_room.start();
  this.start();
}
