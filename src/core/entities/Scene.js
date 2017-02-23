import Surface from "../lib/surface";
import Actor from "./Actor";
import Sprite from "./Sprite";

export default class Scene {
  constructor() {
    this.instances = [];
    this.viewports = [];
    this.height = 480;
    this.width = 640;
    this.activeInstances = [];

    console.info('[jGame] New scene created:', this);
  }

  create = () => {
    let roomSurface = new Surface({
      insert: true,
      width: this.width,
      height: this.height,
    });

    this.surface = roomSurface.context;

    this.activeInstances = this.instances.map(definition => {
      let instance = new definition.type();
      instance.x = definition.x;
      instance.y = definition.y;
      return instance;
    });
  }

  step = () => {
    this.activeInstances.map(instance => {
      instance.innerStep();
      return instance;
    });
  }

  draw = () => {
    let { surface } = this;
    surface.clearRect(0, 0, this.width, this.height);
    this.activeInstances.map(instance => {
      surface.save();
      surface.translate(instance.x, instance.y);
      surface.rotate(instance.image_angle * Math.PI / 180);
      surface.scale(instance.xscale, instance.yscale);
      surface.fillStyle = instance.color;
      surface.strokeStyle = instance.color;
      surface.fillRect(0, 0, instance.width, instance.height);

      let { sprite_index } = instance;
      if (sprite_index && sprite_index instanceof Sprite && sprite_index.isReady) {

        // do some math to calculate current x and y position based on image index from instance
        let image_xindex = 0; // horizontal tile position
        let image_yindex = 0; // vertical tile position
        let counter = 0; // helper variable

        // if image index exceed the number of frames, resets it
        if (instance.image_index >= sprite_index.image_number) instance.image_index = 0;
        if (instance.image_index < 0) instance.image_index = sprite_index.image_number - 1;

        // a dangerous while to do it fast
        while(counter < Math.round(instance.image_index)) {
          image_xindex ++;
          if (image_xindex >= sprite_index.h_frames) {
            image_xindex = 0;
            image_yindex ++;
          }
          counter ++;
        }

        // get variables from sprite
        let { offset_bottom, offset_left, offset_right, offset_top, frame_width, frame_height } = sprite_index;

        // draw the sprite animated
        surface.drawImage(
          sprite_index.img,

          // crop image according to frame height, frame width and image index
          (image_xindex * frame_width) + offset_left, // x in source
          (image_yindex * frame_height) + offset_top, // y in source
          frame_width - (offset_right + offset_left), // width in source
          frame_height - (offset_top + offset_bottom), // height in source

          // box in the scene
          -sprite_index.x_origin, -sprite_index.y_origin, frame_width - (offset_left + offset_right), frame_height - (offset_top + offset_bottom) // box on the room
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
}
