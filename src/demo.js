import { Actor, Scene, Sprite, Game } from "entities";
import Constants from "utils/Constants";
import DemoStage from "scenes/DemoStage";

const game = new Game({
  width: 640,
  height: 480,
  scenes: [DemoStage],
}).init();