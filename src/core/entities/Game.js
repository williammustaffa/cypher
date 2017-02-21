import Keyboard from "../lib/keyboard";
import Surface from "../lib/surface";

export default class Game {
  constructor(attributes) {
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];
    this.width = attributes.width || 640;
    this.height = attributes.height || 480;
    console.info("[jGame] New game generated", this);
  }

  init = () => {
    this.current_room = this.scenes[0];

    let window = new Surface({
      insert: true,
      width: this.width,
      height: this.height,
      style: "background: #f5f5f5",
    });

    this.ctx = window.context;

    this.keyboard = new Keyboard();
    this.create();
    this.loop();
  }

  loop = () => {
    this.step();
    this.draw();
    this.keyboard.reset();
    window.requestAnimationFrame(this.loop);
  }

  create = () => {
    this.current_room.create();
  }

  step = () => {
    this.current_room.step();
  }

  draw = () => {
    this.current_room.draw();
  }
}