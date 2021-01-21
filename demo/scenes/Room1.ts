import { Cypher, Scene } from '@core/entities';
import Player from '@actors/Player';

export default class Room1 extends Scene {
  width = 640;
  height = 480;
  background = '#e2e2e2';

  constructor(engine: Cypher) {
    super(engine);

    this.addViewport(0, 0, 640, 800, 0, 0, 640, 480);
    this.addActor(Player, 240, 240);
  }
}
