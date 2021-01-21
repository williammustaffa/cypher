import uuid from 'uuid';
import { Surface, FpsManager, Keyboard, MediaAsset } from '@core/lib';
import { Actor, Scene, Sprite } from '@core/entities';
import { ConstructorFor } from '@core/interfaces';

export interface CypherPropsInterface {
  debug?: string,
  fps?: number,
  scenes: ConstructorFor<Scene>[],
  container: string,
}

export interface EngineUtilsInferface {
  scene: Scene,
  keyboard: Keyboard,
  surface: Surface,
  setScene(index: number): void,
}

export class Cypher {
  public id: string;
  private keyboard: Keyboard;
  private surface: Surface;
  private scene: Scene;
  private fps: number = 60;
  private width: number = 640;
  private height: number = 480;
  private container: string = 'body';
  private scenes: ConstructorFor<Scene>[] = [];
  private fpsManager: FpsManager;

  constructor(attributes: CypherPropsInterface) {
    this.id = uuid.v4();
    this.fps = attributes.fps || 60;
    this.scenes = attributes.scenes || [];
    this.container = attributes.container || 'body';

    this.keyboard = new Keyboard();
    this.fpsManager = new FpsManager(this.fps, this.loop);

    console.info('[Cypher] New game generated', this);
  }

  public get utils(): EngineUtilsInferface {
    return {
      scene: this.scene,
      keyboard: this.keyboard,
      surface: this.surface,
      setScene: this.setScene,
    };
  }

  public init = () => {
    this.createSurface();
    this.setScene(0);
    this.fpsManager.play();
  }

  public setScene = (index: number) => {
    const TargetScene = this.scenes[index];

    this.scene = new TargetScene(this);
    this.scene.create();
  }

  private loop = () => {
    if (this.scene) {
      this.stepScene();
      this.drawScene();
      this.updateKeyboard();
    } else {
      throw new Error('Current scene not found.')
    }
  }

  private updateKeyboard = () => {
    if (this.keyboard) {
      this.keyboard.update();
    }
  }

  private createSurface = () => {
    this.surface = Surface.create({
      container: this.container,
      height: this.height.toString(),
      width: this.width.toString(),
      insert: true,
    });
  }

  private stepScene = () => {
    this.scene.step();
  }

  private drawScene = () => {
    const { context } = this.surface;

    const scene = this.scene;
    const instances = scene.activeActors;

    context.fillStyle = scene.background;
    context.strokeStyle = scene.background;
    context.clearRect(0, 0, scene.width, scene.height);
    context.fillRect(0, 0, scene.width, scene.height);

    instances.map(this.drawActor);
  }

  private drawActor = (actor: Actor) => {
    const { context } = this.surface;

    context.save();
    context.translate(actor.x, actor.y);
    context.rotate(actor.imageAngle * Math.PI / 180);
    context.scale(actor.xScale, actor.yScale);
    context.fillStyle = actor.color;
    context.strokeStyle = actor.color;
    context.fillRect(0, 0, actor.width, actor.height);

    const actorSprite: Sprite = actor.spriteInstance;

    if (actorSprite) {
      // do some math to calculate current x and y position based on image index from instance
      let imageXIndex = 0; // horizontal tile position
      let imageYIndex = 0; // vertical tile position
      let counter = 0; // helper variable

      // if image index exceed the number of frames, resets it
      if (actor.imageIndex > actorSprite.imageNumber) actor.imageIndex = 0;
      if (actor.imageIndex < 0) actor.imageIndex = actorSprite.imageNumber - 1;

      // a dangerous while to do it fast
      while (counter < Math.round(actor.imageIndex)) {
        imageXIndex ++;

        if (imageXIndex >= actorSprite.horizontalFrames) {
          imageXIndex = 0;
          imageYIndex ++;
        }

        counter++;
      }

      const xSource: number = (imageXIndex * actorSprite.frameWidth) + actorSprite.offsetLeft;
      const ySource: number = (imageYIndex * actorSprite.frameHeight) + actorSprite.offsetTop;
      const wSource: number = actorSprite.frameWidth - (actorSprite.offsetRight + actorSprite.offsetLeft);
      const hSource: number = actorSprite.frameHeight - (actorSprite.offsetTop + actorSprite.offsetBottom);

      const xDest: number = -actorSprite.xOrigin;
      const yDest: number = -actorSprite.yOrigin;
      const wDest: number = actorSprite.frameWidth - (actorSprite.offsetLeft + actorSprite.offsetRight);
      const hDest: number = actorSprite.frameHeight - (actorSprite.offsetTop + actorSprite.offsetBottom);

      // draw the sprite animated
      context.drawImage(
        actorSprite.DOMElement,
        xSource, ySource, wSource, hSource,
        xDest, yDest, wDest, hDest,
      );

      // Increase image index
      actor.imageIndex += actor.imageSpeed;
    }

    // Runs the instance draw and restore the context
    actor.innerDraw();
    context.restore();
  }
}