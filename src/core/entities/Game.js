import Keyboard from "../lib/keyboard";
import Surface from "../lib/surface";

export default class Game {
  constructor(attributes) {
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];

    this.current_room = this.scenes[0];

    let window = new Surface({
      insert: true,
      width: attributes.width || 640,
      height: attributes.height || 480,
    });

    this.ctx = window.context;
    console.info("[jGame] New game generated", this);
  }

  init = () => {
    if (this.scenes.length == 0) {
      console.error("[jGame] The game must have at least 1 room.");
      return false;
    }
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
    this.current_room.instances.map(instance => {
      instance.type.innerCreate();
    });
  }

  step = () => {
    this.current_room.instances.map(instance => {
      instance.type.innerStep();
    });
  }

  draw = () => {
    this.current_room.instances.map(instance => {
      instance.type.innerDraw(this.ctx);
    });
  }
}