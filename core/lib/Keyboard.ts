import { DynamicObject } from '@core/interfaces';

export class Keyboard {
  keyPressed: DynamicObject<boolean> = {};
  keyReleased: DynamicObject<boolean> = {};
  keyPress: DynamicObject<boolean> = {};

  constructor() {
    window.addEventListener('keydown', this.onkeydown);
    window.addEventListener('keyup', this.onkeyup);
  }

  private onkeydown = (e: KeyboardEvent) => {
    const code = e.code;
    this.keyPressed[code] = true;
    this.keyPress[code] = true;
  }

  private onkeyup = (e: KeyboardEvent) => {
    const code = e.code;
    this.keyReleased[code] = true;
    delete this.keyPress[code];
  }

  update(): void {
    this.keyPressed = {};
    this.keyReleased = {};
  }

  pressed(key: string): boolean {
    return this.keyPressed[key];
  }

  released(key: string): boolean {
    return this.keyReleased[key];
  }

  check(key: string): boolean {
    return this.keyPress[key];
  }
}