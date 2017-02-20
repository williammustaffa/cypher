## jGame.js: HTML5 game library ##
A simple and easy-to-use html5 game library, which will let you code using ES6 with some GML-like code language and logic.
If you have some knowledge in GML, you already ROCKS!

## Development ##
For the development we are using webpack-dev-server, which will compile transpile your ES6 code to ES5.
To start the dev server, run the following command:
```
npm install
npm start
```

## Build ##
Building is a really simple task here. 
You just need to run the following command:
```
npm build
```

## Documentation ##
On jGame everything is class, but lets call them 'entities', so we don't confuse them with the javascript class.
We current have Actors, Scenes and Sprites. I'll explain and show how to call and define their properties soon.

You can request any 'entity' through the './entities' path from root:
```javascript
import { Actor, Scene, Sprite } from './entities';
```
That's pretty cool and simple, isn't it? :)

Currenty these are the existing entities:
- Actor
- Scene
- Sprite

## Entity: Actor ##
This is actually self-descriptive. All the game objects, playable or non-playable can be created using this entity.
But this is mostly like a concept that will be cloned into the scenes. Into the Scenes these actors are called 'Intances'.
'Instances' won't affect any initial state from the Actor.

The basic structure is the following:
```javascript
let player = new Actor({
  class: 'obj_player',
  solid: true,
  create() {
    console.log("create event");
  },
  step() {
    console.log("step event");
  },
  draw() {
    console.log("draw_event");
  },
  ...
});
```
*check* ./entities/Actor for more Actor properties.

## Entity: Scene ##
The Scene is the entity that will run everything as you desire. You will place 'Actors' into the 'instances' array specifying the initial position and it will do the its job once started.
Viewports are the game cameras. You will pass the x and y static values and the view height and width. The viewport won't show off-the room size specified. 

The basic structure is the following:
```javascript
let scene = new Scene({
  width: 640,
  height: 480,
  viewports: [
    { x: 0, y: 0, width: 640, height: 480}, // this is the default
  ],
  instances: [
    { type: player, x: 16, y: 16 },
    { type: player, x: 56, y: 32 },
  ]
});
```
*check* ./entities/Scene for more Actor properties.

## Entity: Sprite ##
TODO

The basic structure is the following:
```javascript
let spr_player = new Sprite({
  ...
});
```
*check* ./entities/Scene for more Actor properties.