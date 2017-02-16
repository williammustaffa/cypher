import keys from "../lib/keymap";

/*  KEYBOARD */
export default class Keyboard {
  constructor() {
    /* Variables */
    this.keyPressed = [];
    this.keyPress = [];
    this.keyReleased = [];

    /* Initial setup */
    for (var prop in keys) {
      if (keys.hasOwnProperty(prop)) {
        this.keyPressed[prop]=0;
        this.keyPress[prop]=0;
        this.keyReleased[prop]=0;
      }
    }

    /* Events from window */
    window.addEventListener('keydown', e => {
      var Key = e.keyCode;
      for (var prop in keys) {
        if ( keys.hasOwnProperty(prop) ) {
          if (keys[prop] == Key && !this.keyPress[prop]) {
            this.keyPressed[prop] = 1;
            this.keyPress[prop] = 1;
          }
        }
      }
    });
    window.addEventListener('keyup', e => {
      var Key = e.keyCode;
      for (var prop in keys) {
        if (keys.hasOwnProperty(prop)) {
          if (keys[prop] == Key && this.keyPress[prop]) {
            this.keyReleased[prop] = 1;
            this.keyPress[prop] = 0;
          }
        }
      }
    });
  }
  reset() {
    for (var prop in keys){
      if (keys.hasOwnProperty(prop)) {
        this.keyPressed[prop] = 0;
        this.keyReleased[prop] = 0;
      }
    }
  }
  pressed(key) {
    return this.keyPressed[key];
  }
  released(key) {
    return this.keyReleased[key];
  }
  check(key) {
    return this.keyPress[key];
  }
}
