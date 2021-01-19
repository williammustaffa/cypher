import Keyboard from 'lib/keyboard';
import { Constants, Surface, FpsManager } from 'utils';

import uuid from 'uuid';

export default class Game {
  group_identifier = Constants.GAME;
  current_scene = null;
  current_scene_index = 0;
  constructor(attributes) {
    this.id = uuid.v4();

    this.debug = true;
    this.fps = attributes.fps || 60;
    this.scenes = attributes.scenes || [];
    this.assets = attributes.assets || [];
    this.width = attributes.width || 640;
    this.height = attributes.height || 480;
    this.container = attributes.container || 'body';

    // Create keyboard instance
    if (!window.keyboard) window.keyboard = [];
    this.keyboard = window.keyboard[this.id] = new Keyboard();

    // Create fps manager instance
    this.fps_manager = new FpsManager(this.fps, this.loop);

    console.info('[Cypher] New game generated', this);
  }

  init() {
    try {
      this.set_scene(0);
      this.create_surface();
      this.fps_manager.play();
    } catch(e) {
      console.warn('[Cypher] Error occurred:', e.message);
    }
  }

  loop = () => {
    if (this.current_scene) {
      this.step_scene();
      this.draw_scene();
    } else {
      throw new Error('Current scene not found.')
    }

    // resets keyboard status
    this.keyboard.reset();
  }

  create_surface = () => {
    const scene = this.current_scene;

    this.surface = Surface.create({
      container: this.container,
      height: scene.height,
      width: scene.width,
      insert: true,
    }).context;
  }

  set_scene = index => {
    this.current_scene_index = index;
    this.init_scene();
  }

  init_scene = () => {
    const TargetScene = this.scenes[this.current_scene_index];

    this.current_scene = new TargetScene(this);
    this.current_scene.create();
  }

  step_scene = () => {
    this.current_scene.step();
  }

  draw_scene = () => {
    const scene = this.current_scene;
    const surface = this.surface;
    const instances = scene.active_instances;

    surface.fillStyle = scene.background;
    surface.strokeStyle = scene.background;
    surface.clearRect(0, 0, scene.width, scene.height);
    surface.fillRect(0, 0, scene.width, scene.height);

    instances.map(this.draw_instance);
  }

  draw_instance = instance => {
    const surface = this.surface;

    surface.save();
    surface.translate(instance.x, instance.y);
    surface.rotate(instance.image_angle * Math.PI / 180);
    surface.scale(instance.xscale, instance.yscale);
    surface.fillStyle = instance.color;
    surface.strokeStyle = instance.color;
    surface.fillRect(0, 0, instance.width, instance.height);

    const image_source = instance.sprite;

    if (image_source) {
      // do some math to calculate current x and y position based on image index from instance
      let image_xindex = 0; // horizontal tile position
      let image_yindex = 0; // vertical tile position
      let counter = 0; // helper variable

      // if image index exceed the number of frames, resets it
      if (instance.image_index > image_source.image_number) instance.image_index = 0;
      if (instance.image_index < 0) instance.image_index = image_source.image_number - 1;

      // a dangerous while to do it fast
      while (counter < Math.round(instance.image_index)) {
        image_xindex ++;
        if (image_xindex >= image_source.h_frames) {
          image_xindex = 0;
          image_yindex ++;
        }
        counter ++;
      }

      // get variables from sprite
      let {
        offset_bottom,
        offset_left,
        offset_right,
        offset_top,
        frame_width,
        frame_height,
      } = image_source;

      // draw the sprite animated
      surface.drawImage(
        image_source.img,

        // crop image according to frame height, frame width and image index
        (image_xindex * frame_width) + offset_left, // x in source
        (image_yindex * frame_height) + offset_top, // y in source
        frame_width - (offset_right + offset_left), // width in source
        frame_height - (offset_top + offset_bottom), // height in source

        // box in the scene
        -image_source.x_origin,
        -image_source.y_origin,
        frame_width - (offset_left + offset_right),
        frame_height - (offset_top + offset_bottom)
      );

      // Increase image index
      instance.image_index += instance.image_speed;
    }

    // Runs the instance draw and restore the surface
    instance.inner_draw();
    surface.restore();
  }
}