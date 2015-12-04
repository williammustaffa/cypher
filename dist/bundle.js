(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* object creation function */
this.object_create = function() {
  var new_object = new Object();
  return new_object;
}
/* room creation function */
this.room_add = function() {
  var new_room = new Room();
  var index = this.rooms.push( new_room ) - 1;
  if ( this.sorcery.current_room == -1 ) {
    this.sorcery.current_room = index;
  }
  return this.rooms[ index ];
}

},{}],2:[function(require,module,exports){
this.start = function() {
  /* variables */
  var Error = false;
  /* run check */
  if ( this.ready == true ) {
    this.step();
    this.draw();
  } else {
    if ( this.sorcery.current_room >= 0 ) {
      if ( Room.prototype.isPrototypeOf( this.rooms[ this.sorcery.current_room ] ) ) {
        this.ready = true;
        this.sorcery.fake_room = this.rooms[ this.sorcery.current_room ];
      } else {
        Error = "[jGame] Invalid room object";
      }
    } else {
      Error = "[Jgame] You have to create at least one room";
    }
  }
  /* if there is no error, we do the animation */
  if ( Error == false ) {
    var me = this;
    setTimeout( function() {
      me.start();
    }, 1000/30);
  } else {
    console.log( Error );
  }
}

},{}],3:[function(require,module,exports){
/* draw function, what you'll see on screen */
this.draw = function() {

}

},{}],4:[function(require,module,exports){
/* step functions, more mechanical things */
this.step = function() {
  var instances = this.sorcery.fake_room.instances;
  instances.forEach( function( instance ) {
    instance.y += instance.vspeed + ( instance.speed * Math.sin( instance.direction * Math.PI / 180 ) );
    instance.x += instance.hspeed + ( instance.speed * Math.cos( instance.direction * Math.PI / 180 ) );
    instance.vspeed += instance.gravity * ( Math.sin( instance.gravity_direction * Math.PI / 180 ) );
    instance.hspeed += instance.gravity * ( Math.cos( instance.gravity_direction * Math.PI / 180 ) );
    instance.step();
  });
}

},{}],5:[function(require,module,exports){
/* init events organizer */
this.run = function() {
  key = new Keyboard();
  this.start();
}

},{}],6:[function(require,module,exports){
/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/

function Jgame( config ) {
  /* Variables */
  this.rooms = [];
  this.sorcery = { fake_room: false, current_room: -1 };
  this.ready = false;

  /* Objects */
  require("./objects/keyboard.js");
  require("./objects/object.js");
  require("./objects/room.js");

  /* Game functions */
  require("./functions/lib.js")

  /* Game steps */
  require("./gear/creation.js");
  require("./gear/gear.js");
  require("./gear/draw.js");
  require("./gear/run.js");

  /* RETURN THE GAME OBJECT */
  return this;
}

/*  TEST AREA */
var Game = new Jgame();

/* object creation */
var obj_player = Game.object_create();
obj_player.create( function() {

});
obj_player.step(function() {

})
obj_player.draw(function() {

});
console.log( "Object creation test:" );
console.log( obj_player );

/* room creation */
var room_1 = Game.room_add();
console.log( "Room creation test:" );
console.log( room_1 );

/* instance creation */
var instance = room_1.instance_create( obj_player, 0, 0);
console.log( "Intance creation test:" );
console.log( instance );

/* game start */
Game.run();

},{"./functions/lib.js":1,"./gear/creation.js":2,"./gear/draw.js":3,"./gear/gear.js":4,"./gear/run.js":5,"./objects/keyboard.js":7,"./objects/object.js":8,"./objects/room.js":9}],7:[function(require,module,exports){
/*  KEYBOARD */
function Keyboard() {
  /* Variables */
  var keyPressed = [],
      keyPress = [],
      keyReleased = [],
      keys = {up:38, down:40, right:39, left:37, enter:13, shift:16, alt:18, space:32, backspace:8, tab: 9, control: 17, pause:19, break: 19, capslock: 20, escape: 27, pageup: 33, pagedown: 34, end: 35, home: 36, print: 44, insert:45, delete: 46, num:{0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57}, ord: {a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90},f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,mute:173,volumedown:174,volumeup:175};
  /* Initial setup */
  for (var prop in keys) {
      if (keys.hasOwnProperty(prop)) {
          keyPressed[prop]=0;
          keyPress[prop]=0;
          keyReleased[prop]=0;
      }
  }
  /* Reset function for step */
  this.reset_keyboard = function() {
      for (var prop in keys){
          if (keys.hasOwnProperty(prop)) {
              keyPressed[prop]=0;
              keyReleased[prop]=0;
          }
      }
  }
  /* Events from window */
  window.addEventListener('keydown', function(e) {
      var Key = e.keyCode;
      for ( var prop in keys ) {
          if ( keys.hasOwnProperty( prop ) ) {
              if ( keys[ prop ] == Key && !keyPress[ prop ] ) {
                  keyPressed[ prop ] = 1;
                  keyPress[ prop ] = 1;
              }
          }
      }
  });
  window.addEventListener('keyup', function(e) {
      var Key = e.keyCode;
      for ( var prop in keys ) {
          if ( keys.hasOwnProperty( prop ) ) {
              if ( keys[ prop ] == Key && keyPress[ prop ] ) {
                  keyReleased[prop] = 1;
                  keyPress[prop] = 0;
              }
          }
      }
  });
  /* Keyboard Functions */
  this.pressed = function( key ) {
      return keyPressed[ key ];
  }
  this.released = function( key ) {
      return keyReleased[key];
  }
  this.press = function( key ) {
      return keyPress[key];
  }
  return this;
}

},{}],8:[function(require,module,exports){
function Object() {
  /* Instance local variables */
  this.id = undefined;
  this.class = undefined;
  this.place_free = function() {};
  this.solid = 0;
  this.width = 32;
  this.height = 32;
  /* Transform variables */
  this.x = 0;
  this.y = 0;
  this.xscale = 1;
  this.yscale = 1;
  /* Positional variables */
  this.vspeed = 0;
  this.hspeed = 0;
  this.gravity = 0;
  this.gravity_direction = 270;
  this.direction = 0;
  this.speed = 0;
  /* Sprite control variables */
  this.mask_index = 0;
  this.xOffset = 16;
  this.yOffset = 16;
  this.sprite_index = 0;
  this.image_index = 0;
  this.image_speed = 1;
  this.image_number = 0;
  this.image_angle = 0;
  this.color = "#000000";
  /* Instance step functions */
  this.create = function() {};
  this.step = function() {};
  this.draw = function() {};
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var obj_clone = new Object();
    obj_clone.prototype = this;
    return obj_clone;
  };
  /* Return object */
  return this;
}

},{}],9:[function(require,module,exports){
function Room() {
  this.id = null;
  this.name = null;
  this.dimensions = { width: 640, height: 480 };
  this.viewports = [];
  /* viewport settings */
  this.add_viewport = function( options ) {
    var def = { width: this.dimensions.width, height: this.dimensions.height, x: 0, y: 0 , active: false };
    for(var key in options){
      if (def.hasOwnProperty(key)) def[key] = options[key];
    }
    var index = this.viewports.push( def );
    return this.viewports[ index - 1 ]
  }
  this.instances = [];
  /* room function */
  this.instance_create = function( obj ) {
    var new_instance = obj.clone();
    var index = this.instances.push( new_instance );
    return this.instances[ index - 1 ];
  }
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var obj_clone = new Room();
    obj_clone.prototype = this;
    return obj_clone;
  };
  /* add a default viewport */
  this.add_viewport({active: true});

  /* return room object */
  return this;
}

},{}]},{},[6]);
