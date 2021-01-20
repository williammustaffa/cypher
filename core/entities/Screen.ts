import uuid from 'uuid';
import { EntityTypes } from '@core/constants';
import { Surface, FpsManager, Keyboard, MediaAsset } from '@core/lib';
import { Actor, Scene } from '@core/entities';
import { ConstructorFor } from '@core/interfaces';

export interface ScreenPropsInterface {
  debug?: string,
  fps?: number,
  scenes: ConstructorFor<Scene>[],
  container: string,
}

export class Screen {
  id: string;
  debug: boolean = true;
  fps: number = 60;
  width: number = 640;
  height: number = 480;
  container: string = 'body';
  assets: MediaAsset[] = [];
  scenes: ConstructorFor<Scene>[] = [];
  current_scene: Scene;
  surface: Surface;
  keyboard: Keyboard;

  private fps_manager: FpsManager;
  protected group_identifier: string = EntityTypes.GAME;

  constructor(attributes: ScreenPropsInterface) {
    this.id = uuid.v4();
    this.fps = attributes.fps || 60;
    this.scenes = attributes.scenes || [];
    this.container = attributes.container || 'body';

    this.keyboard = new Keyboard();
    this.fps_manager = new FpsManager(this.fps, this.loop);

    console.info('[Cypher] New game generated', this);
  }

  public init() {
    this.create_surface();
    this.set_scene(0);
    this.fps_manager.play();
  }

  public set_scene = (index: number) => {
    const TargetScene = this.scenes[index];

    this.current_scene = new TargetScene(this);
    this.current_scene.create();
  }

  private loop = () => {
    if (this.current_scene) {
      this.step_scene();
      this.draw_scene();
      this.update_keyboard();
    } else {
      throw new Error('Current scene not found.')
    }
  }

  protected update_keyboard = () => {
    if (this.keyboard) {
      this.keyboard.update();
    }
  }

  protected create_surface = () => {
    this.surface = Surface.create({
      container: this.container,
      height: this.height,
      width: this.width,
      insert: true,
    });
  }

  protected step_scene = () => {
    this.current_scene.step();
  }

  protected draw_scene = () => {
    const { context } = this.surface;

    const scene = this.current_scene;
    const instances = scene.active_instances;

    context.fillStyle = scene.background;
    context.strokeStyle = scene.background;
    context.clearRect(0, 0, scene.width, scene.height);
    context.fillRect(0, 0, scene.width, scene.height);

    instances.map(this.draw_instance);
  }

  protected draw_instance = (instance: Actor) => {
    const { context } = this.surface;

    context.save();
    context.translate(instance.x, instance.y);
    context.rotate(instance.image_angle * Math.PI / 180);
    context.scale(instance.xscale, instance.yscale);
    context.fillStyle = instance.color;
    context.strokeStyle = instance.color;
    context.fillRect(0, 0, instance.width, instance.height);

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
      context.drawImage(
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

    // Runs the instance draw and restore the context
    instance.inner_draw();
    context.restore();
  }
}