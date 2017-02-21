import Keyboard from '../utils/keyboard';

/* GAME RUN SETUP */
export default function start() {
  stats.begin();

  /* run gear */
  this.step();
  this.draw();
  this.keyboard.reset();

  /* if there is no error, we do the animation */
  window.requestAnimationFrame(this.start);
  stats.end();
}

/* init events organizer */
export function init() {

  /* setting current room */
  if (!this.current_room) {
    if (this.rooms.length > 0) {
      let firstRoom = this.rooms[0];
      console.log(this.rooms);
      console.log(this.rooms[0]);
      this.current_room = { ...firstRoom };
    } else {
      return false;
    }
  }

  /* init settings */
  this.keyboard = new Keyboard();
  this.current_room.start();
  this.start();
}
