import { Actor, Scene, Sprite, Game } from "entities";
import DemoStage from "scenes/DemoStage";

new Game({
  width: 640,
  height: 480,
  scenes: [DemoStage],
}).init();