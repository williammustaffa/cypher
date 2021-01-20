import { Scene } from '@core';
import Player from '@actors/Player';

export default class Room2 extends Scene {
  width = 640;
  height = 480;
  background = '#f25df5';

  constructor(props) {
    super(props);

    this.add_viewport(0, 0, 640, 800, 0, 0, 640, 480);
    this.add_instance(Player, 240, 240);
  }
}
