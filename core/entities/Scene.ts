import uuid from 'uuid';
import { EntityTypes } from '@core/constants';
import { Actor, Background, Sound, Screen } from '@core/entities';
import { ConstructorFor } from '@core/interfaces';

export interface InstanceInterface {
  type: ConstructorFor<Actor>,
  x: number,
  y: number
}

export class Scene {
  id: string;
  background: string;
  instances: InstanceInterface[] = [];
  active_instances: Actor[] = [];
  viewports: any[] = [];
  backgrounds: Background[] = [];
  sounds: Sound[] = [];
  height: number = 480;
  width: number = 640;

  private screen: Screen;
  protected group_identifier = EntityTypes.SCENE;

  constructor(screen: Screen) {
    this.id = uuid.v4();
    this.screen = screen;
    this.active_instances = [];

    console.info('[Cypher] New scene created:', this);
  }

  get tools() {
    return {
      keyboard: this.screen.keyboard,
      screen: this.screen,
      scene: this,
    }
  }

  private initialize_instance = (instance: InstanceInterface) => {
    const TargetActor = instance.type;
    const new_instance = new TargetActor({ x: instance.x, y: instance.y, scene: this });

    new_instance.inner_create();

    return new_instance;
  }

  create = () => {
    this.active_instances = this.instances.map(this.initialize_instance);
  }

  step = () => {
    this.active_instances.map(instance => {
      instance.inner_step();
    });
  }

  draw = () => {
    this.active_instances.map(instance => {
      instance.inner_draw();
    });
  }

  add_viewport(
    x: number,
    y: number,
    width: number,
    height: number,
    window_x: number,
    window_y: number,
    window_w: number,
    window_h: number
  ) {
    this.viewports.push({ x, y, width, height, window_x, window_y, window_w, window_h });
  }

  add_instance(type: ConstructorFor<Actor>, x: number = 0, y: number = 0) {
    this.instances.push({ type, x, y });
  }

  set_height(height: number) {
    this.height = height;
  }

  set_width(width: number) {
    this.width = width;
  }

  get_height() {
    return this.height;
  }

  get_width() {
    return this.width;
  }

  set_background(style: string) {
    this.background = style;
  }
}
