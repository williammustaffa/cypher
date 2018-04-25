import Actor from "entities/Actor";
import Sprite from "entities/Sprite";
import { Constants, Surface } from "utils";

export default class Scene {
  /**
   * Define class group
   */
  group_identifier = Constants.SCENE;

  /**
   * instances array
   */
  instances = [];

  /**
   * sprites array
   */
  sprites = [];

  /**
   * viewports array
   */
  viewports = [];

  /**
   * scene height
   */
  height = 480;

  /**
   * scene width
   */
  width = 640;

  /**
   * room background
   */
  background = '#000';

  /**
   * current instances in the scene
   */
  active_instances = [];

  /**
   * simple constructor
   */
  constructor() {
    console.info('[jGame] New scene created:', this);
  }

  /**
   * create event
   * generates room surface for renderization
   */
  create = () => {
    this.surface = Surface.create({
      insert: true,
      width: this.width,
      height: this.height,
    }).context;

    this.active_instances = this.instances.map(instance => {
      return new instance.type({
        x: instance.x,
        y: instance.y,
        room: this,
      });
    });
  }

  step = () => {
    this.active_instances.map(instance => instance.innerStep());
  }

  draw = () => {
    let { surface } = this;
    surface.fillStyle = this.background;
    surface.strokeStyle = this.background;
    surface.clearRect(0, 0, this.width, this.height);
    surface.fillRect(0, 0, this.width, this.height);

    this.active_instances = this.active_instances.map(instance => {
      surface.save();
      surface.translate(instance.x, instance.y);
      surface.rotate(instance.image_angle * Math.PI / 180);
      surface.scale(instance.xscale, instance.yscale);
      surface.fillStyle = instance.color;
      surface.strokeStyle = instance.color;
      surface.fillRect(0, 0, instance.width, instance.height);

      let { sprite_index } = instance;
      if (sprite_index && Object.keys(this.sprites).includes(sprite_index)) {
        const image_src = this.sprites[sprite_index];

        // do some math to calculate current x and y position based on image index from instance
        let image_xindex = 0; // horizontal tile position
        let image_yindex = 0; // vertical tile position
        let counter = 0; // helper variable

        // if image index exceed the number of frames, resets it
        if (instance.image_index >= image_src.image_number) instance.image_index = 0;
        if (instance.image_index < 0) instance.image_index = image_src.image_number - 1;

        // a dangerous while to do it fast
        while(counter < Math.round(instance.image_index)) {
          image_xindex ++;
          if (image_xindex >= image_src.h_frames) {
            image_xindex = 0;
            image_yindex ++;
          }
          counter ++;
        }

        // get variables from sprite
        let { offset_bottom, offset_left, offset_right, offset_top, frame_width, frame_height } = image_src;

        // draw the sprite animated
        surface.drawImage(
          image_src.img,

          // crop image according to frame height, frame width and image index
          (image_xindex * frame_width) + offset_left, // x in source
          (image_yindex * frame_height) + offset_top, // y in source
          frame_width - (offset_right + offset_left), // width in source
          frame_height - (offset_top + offset_bottom), // height in source

          // box in the scene
          -image_src.x_origin,
          -image_src.y_origin,
          frame_width - (offset_left + offset_right),
          frame_height - (offset_top + offset_bottom)
        );

        // Increase image index
        instance.image_index += instance.image_speed;
      }

      // Runs the instance draw and restore the surface
      instance.innerDraw();
      surface.restore();
      return instance;
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
  add_viewport = (x, y, width, height, window_x, window_y, window_w, window_h) => {
    this.viewports.push({
      x,
      y,
      width,
      height,
      window_x,
      window_y,
      window_w,
      window_h,
    });
  }

  /**
   * add instance to scene instance list
   * @param {Actor} type actor class extended from jGame.Actor
   */
  add_instance = (type, x = 0, y = 0) => {
    this.instances.push({
      type, 
      x,
      y,
    });
  }

  /**
   * add a sprite asset
   * @param {Sprite} instance 
   */
  add_sprite(instance) {
    this.sprites[instance.name] = new instance();
    this.sprites[instance.name].load();
  }

  /**
   * set scene height
   */
  set_height = (height) => {
    this.height = height;
  }

  /**
   * set background
   */
  set_background = (style) => {
    this.background = style;
  }

  /**
   * set scene width
   */
  set_width = (width) => {
    this.width = width;
  }

  /**
   * get scene height
   */
  get_height = () => {
    return this.height;
  }

  /**
   * get scene width
   */
  get_width = () => {
    return this.width;
  }
}
