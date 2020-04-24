import { Game } from 'entities';
import DemoStage from 'scenes/DemoStage';

new Game({
  fps: 30,
  debug: true,
  scenes: [DemoStage],
  container: "#app",
}).init();