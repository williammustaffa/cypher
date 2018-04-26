import { Game } from "entities";
import DemoStage from "scenes/DemoStage";

new Game({
  width: 640,
  height: 480,
  fps: 30,
  debug: true,
  scenes: [DemoStage],
}).init();