import Keyboard from "lib/keyboard";
import { Constants, Surface, FpsManager } from "utils";
 
import uuid from 'uuid';

export default class Game {
  /**
   * Define class group
   */
  group_identifier = Constants.GAME;

  constructor(attributes) {
    this.id = uuid.v4();

    this.debug = true;
    this.fps = attributes.fps || 60;
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];
    this.width = attributes.width || 640;
    this.height = attributes.height || 480;

    // Create keyboard instance
    if (!window.keyboard) window.keyboard = [];
    this.keyboard = window.keyboard[this.id] = new Keyboard();

    // Create fps manager instance
    this.fps_manager = new FpsManager({
      fps: this.fps,
      loop: this.loop.bind(this),
    });

    console.info("[jGame] New game generated", this);
  }

  init() {
    this.current_room = new this.scenes[0](this);
    this.current_room.create();
    this.fps_manager.play();
  }

  loop() {
    this.current_room.step();
    this.current_room.draw();

    // resets keyboard status
    this.keyboard.reset();
  }
}