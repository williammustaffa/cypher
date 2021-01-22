import uuid from 'uuid';
import { Actor, Cypher } from '@src/entities';
import { ConstructorFor } from '@src/interfaces';

export interface InstanceInterface {
  type: ConstructorFor<Actor>,
  x: number,
  y: number
}

export abstract class Scene {
  id: string;
  height: number = 480;
  width: number = 640;
  background: string;
  actors: InstanceInterface[] = [];
  activeActors: Actor[] = [];
  viewports: any[] = [];
  engine: Cypher;

  constructor(engine: Cypher) {
    this.id = uuid.v4();
    this.engine = engine;
    this.activeActors = [];

    console.info('[Cypher] New scene created:', this);
  }

  private initializeActor = (instance: InstanceInterface) => {
    const TargetActor = instance.type;
    const actorInstance = new TargetActor({ x: instance.x, y: instance.y, engine: this.engine });

    actorInstance.innerCreate();

    return actorInstance;
  }

  create = () => {
    this.activeActors = this.actors.map(this.initializeActor);
  }

  step = () => {
    this.activeActors.map(actor => actor.innerStep());
  }

  draw = () => {
    this.activeActors.map(actor => actor.innerDraw());
  }

  protected addViewport(viewportX: number, viewportY: number, viewportWidth: number, viewportHeight: number, windowPositionX: number, windowPositionY: number, windowPositionWidth: number, windowPositionHeight: number) {
    this.viewports.push({ viewportX, viewportY, viewportWidth, viewportHeight, windowPositionX, windowPositionY, windowPositionWidth, windowPositionHeight });
  }

  protected addActor(type: ConstructorFor<Actor>, x: number = 0, y: number = 0) {
    this.actors.push({ type, x, y });
  }

  protected setHeight(height: number) {
    this.height = height;
  }

  protected setWidth(width: number) {
    this.width = width;
  }

  protected getHeight() {
    return this.height;
  }

  protected getWidth() {
    return this.width;
  }

  protected setBackground(style: string) {
    this.background = style;
  }
}
