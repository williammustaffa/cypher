import { Cypher } from '@src/entities';

// Sample rooms
import Room1 from '@scenes/Room1';
import Room2 from '@scenes/Room2';

const engine = new Cypher({
  fps: 30,
  scenes: [Room1, Room2],
  container: document.querySelector('body'),
});

engine.init();