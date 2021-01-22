import { Cypher, Scene } from '@src/entities';
import Player from '@actors/Player';

export default class Room2 extends Scene {
  width = 640;
  height = 480;
  background = '#f25df5';

  constructor(engine: Cypher) {
    super(engine);

    this.addViewport(0, 0, 640, 800, 0, 0, 640, 480);
    this.addActor(Player, 240, 240);
  }
}
