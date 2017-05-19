import Keyboard from "../lib/keyboard";
import Surface from "../lib/surface";
import Stats from 'stats-js';

/* stats to check fps */
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms 
 
// Align top-left 
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
 
document.body.appendChild( stats.domElement );

export default class Game {
  constructor(attributes) {
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];
    this.width = attributes.width || 640;
    this.height = attributes.height || 480;
    console.info("[jGame] New game generated", this);
    if (!window.keyboard) window.keyboard = new Keyboard();
  }

  init() {
    this.current_room = new this.scenes[0]();

    let window = new Surface({
      insert: false,
      width: this.width,
      height: this.height,
      style: "background: #f5f5f5",
    });

    this.ctx = window.context;

    this.create();
    this.loop();
  }

  loop() {
    stats.begin();
    this.step();
    this.draw();
    keyboard.reset();
    stats.end();
    window.requestAnimationFrame(this.loop.bind(this));
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