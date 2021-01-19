import { Scene } from '@core';
import Player from '@actors/Player';

export default class Room1 extends Scene {
  width = 640;
  height = 480;
  background = '#e2e2e2';

  constructor(props) {
    super(props);

    this.add_viewport(0, 0, 640, 800, 0, 0, 640, 480);
    this.add_instance(Player, 240, 240);
  }
}
