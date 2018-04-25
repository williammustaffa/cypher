import Scene from 'entities/Scene';
import Player from 'actors/Player';
import SprPlayer from 'sprites/SprPlayer';

export default class DemoStage extends Scene {
  constructor() {
    super();
    this.set_width(640);
    this.set_height(480);
    this.set_background('#000000');
    this.add_viewport(0, 0, 640, 480, 0, 0, 640, 480);
    this.add_sprite(SprPlayer);
    this.add_instance(Player, 240, 240);
  }
};