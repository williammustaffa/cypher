import { Game } from 'entities';

// Sample rooms
import Room1 from 'scenes/Room1';
import Room2 from 'scenes/Room2';

new Game({
  fps: 30,
  debug: true,
  scenes: [Room1, Room2],
  container: '#app',
}).init();