
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values

export class Keyboard {
  constructor() {
    this.keyPressed = [];
    this.keyPress = [];
    this.keyReleased = [];

    window.addEventListener('keydown', e => {
      const code = e.code;
      this.keyPressed[code] = true;
      this.keyPress[code] = true;
    });

    window.addEventListener('keyup', e => {
      const code = e.code;
      this.keyReleased[code] = true;
      delete this.keyPress[code];
    });
  }

  update() {
    this.keyPressed = {};
    this.keyReleased = {};
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