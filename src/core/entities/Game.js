import Keyboard from "../lib/keyboard";
import Surface from "../lib/surface";

export default class Game {
  constructor() {
    this.current_room = null;
    this.scenes = [];
    this.assets = [];

    let window = new Surface({
      insert: true,
      height: 640,
      width: 480,
    });
    this.ctx = window.context;
    console.log("[jGame] New game generated", this);
  }

  addAsset = asset => {
    this.assets.push(asset);
  }

  addScene = scene => {
    this.scenes.push(scene);
  }

  init = () => {
    this.keyboard = new Keyboard();
    this.create()
    this.step();
  }

  create = () => {
    
  }

  step = () => {
    window.requestAnimationFrame(this.step);
  }

  draw = () => {
  
  }
}