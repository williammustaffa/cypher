/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/

function Jgame( config ) {

  include("objects/keyboard.js");
  /* PROTO */

  /* Objects */
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

  /* Rooms */
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

  /* VARIABLES */
  this.rooms = [];
  this.sorcery = { fake_room: false, current_room: -1 };
  this.ready = false;
  /* GAME FUNCTIONS */

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

  /* GAME RUN SETUP */
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
  /* draw function, what you'll see on screen */
  this.draw = function() {

  }
  /* init events organizer */
  this.run = function() {
    key = new Keyboard();
    this.start();
  }
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
