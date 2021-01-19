import { Constants } from 'utils';
import uuid from 'uuid';

export default class Scene {
  group_identifier = Constants.SCENE;

  instances = [];
  viewports = [];
  backgrounds = [];
  sounds = [];
  height = 480;
  width = 640;

  constructor(game) {
    this.id = uuid.v4();
    this.game = game;
    this.keyboard = game.keyboard;
    this.active_instances = [];
    console.info('[Cypher] New scene created:', this);
  }

  get tools() {
    return {
      keyboard: this.keyboard,
      game: this.game,
      room: this
    }
  }

  /**
   * create event
   * generates room surface for renderization
   */
  create() {
    const instances = this.instances.map(({ type: Instance, x, y }) => {
      const instance = new Instance({ x, y, room: this });
      instance.inner_create();
      return instance;
    });

    this.active_instances = instances;
  }

  step() {
    this.active_instances.map(instance => {
      instance.inner_step();
    });
  }

  draw() {
    this.active_instances.map(instance => {
      instance.inner_draw();
    });
  }

  /**
   * add viewport to scene viewport list
   * @param {number} x position x of viewport in the scene
   * @param {number} y position y of viewport in the scene
   * @param {number} width width of the viewport from point xy in the scene
   * @param {number} height height of the viewport from point xy in the scene
   * @param {number} window_x projection of x in the window
   * @param {number} window_y projection of y in the window
   * @param {number} window_w width of the viewport projection in the screen
   * @param {number} window_h height of the viewport projection in the screen
   */
  add_viewport(x, y, width, height, window_x, window_y, window_w, window_h) {
    this.viewports.push({ x, y, width, height, window_x, window_y, window_w, window_h });
  }

  /**
   * add instance to scene instance list
   * @param {Actor} type actor class extended from Cypher.Actor
   */
  add_instance(type, x = 0, y = 0) {
    this.instances.push({ type, x, y });
  }

  /**
   * set scene height
   */
  set_height(height) {
    this.height = height;
  }

  /**
   * set background
   */
  set_background(style) {
    this.background = style;
  }

  /**
   * set scene width
   */
  set_width(width) {
    this.width = width;
  }

  /**
   * get scene height
   */
  get_height() {
    return this.height;
  }

  /**
   * get scene width
   */
  get_width() {
    return this.width;
  }
}
