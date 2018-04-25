import Stats from 'stats-js';
import Keyboard from "lib/keyboard";
import { Constants, Surface } from "utils";

/* stats to check fps */
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms 
 
// Align top-left 
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
 
document.body.appendChild( stats.domElement );
import uuid from 'uuid';

export default class Game {
  /**
   * Define class group
   */
  group_identifier = Constants.GAME;

  constructor(attributes) {
    this.id = uuid.v4();
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];
    this.width = attributes.width || 640;
    this.height = attributes.height || 480;
    console.info("[jGame] New game generated", this);

    // we don't want to mess with other keyboards
    // from this game engine if more than one
    // game runs at the same time
    if (!window.keyboard) window.keyboard = [];
    this.keyboard = window.keyboard[this.id] = new Keyboard();
  }

  init() {
    this.current_room = new this.scenes[0](this);

    this.create();
    this.loop();

    return this;
  }

  loop() {
    stats.begin();
    this.step();
    this.draw();
    this.keyboard.reset();
    stats.end();
    window.requestAnimationFrame(this.loop.bind(this), 30);
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