import Scene from 'entities/Scene';
import Player from 'actors/Player';

export default class DemoStage extends Scene {
  constructor(props) {
    super(props);
    this.width = 640;
    this.height = 480;
    this.background = '#000000';

    this.add_viewport(0, 0, 640, 480, 0, 0, 640, 480);
    this.add_instance(Player, 240, 240);
  }
}
