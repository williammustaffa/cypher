import Keyboard from '../utils/keyboard';
import Stats from 'stats-js';
/* stats to check fps */
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms 
 
// Align top-left 
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
 
document.body.appendChild( stats.domElement );

/* GAME RUN SETUP */
export function start() {
  stats.begin();

  /* variables */
  let Error = false;

  /* run gear */
  this.step();
  this.draw();
  this.keyboard.reset();

  /* if there is no error, we do the animation */
  window.requestAnimationFrame(this.start);
  stats.end();
}

/* init events organizer */
export function run() {
  /* setting current room */
  console.log(this.current_room);
  console.log(this.rooms);
  if (!this.current_room && this.rooms.length > 0) {
    this.current_room = this.rooms[0];
  }
  /* init settings */
  this.keyboard = new Keyboard();
  this.current_room.start();
  this.start();
}
