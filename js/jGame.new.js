/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/

function Jgame( config ) {

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
    this.instances = [];
    /* room function */
    this.instance_create = function( obj ) {
      var new_instance = obj.clone();
      var index = this.instances.push( new_instance );
      return this.instances[ index - 1 ];
    }
    /* return room object */
    return this;
  }

  /* VARIABLES */
  this.rooms = [];

  /* GAME FUNCTIONS */

  /* object creation function */
  this.object_create = function() {
    var new_object = new Object();
    return new_object;
  }
  /* room creation function */
  this.room_add = function() {
    var new_room = new Room();
    var index = this.rooms.push( new_room );
    return this.rooms[ index - 1 ];
  }

  this.run = function() {
    var key = new Keyboard();
    console.log( key );
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
