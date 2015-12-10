/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
function Jgame( config ) {
  /* BASE */
  function new_canvas() {
  var canvas = document.createElement('canvas');//getElementById('canvas');
  var canvasStyle = canvas.style;
  var canvasId = '_' + Math.random().toString(36).substr(2, 9);
  canvas.setAttribute("id", canvasId);
  canvasStyle.margin = 'auto';
  canvasStyle.display = 'block';
  canvasStyle.position = 'absolute';
  canvasStyle.left = '0';
  canvasStyle.right = '0';
  canvasStyle.top = '0';
  canvasStyle.bottom = '0';
  canvasStyle.background = "#000";
  /* end of canvas style */
  document.body.appendChild(canvas);
  context=canvas.getContext('2d');
  return context;
}


  /* OBJECT */
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
  this.reset = function() {
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
  this.current_room = false;
  this.ready = true;
  this.debug = true;
  this.keyboard = false;
  this.context = new_canvas();

  /* GAME FUNCTIONS */
  /* object creation function */
this.object_create = function() {
  var new_object = new Object();
  return new_object;
}
/* room creation function */
this.room_add = function() {
  var new_room = new Room();
  if ( !this.current_room ) {
    this.current_room = new_room;
  }
  return new_room;
}

  /* Math functions */
function distance_to_point(x, y, xx, yy) {
    return Math.round(Math.sqrt(Math.pow(x-xx, 2)+Math.pow(y-yy, 2)));
}
function random(){
    return Math.random();
}
function round(num) {
    return Math.round(num);
}
function floor(num) {
    return Math.floor(num);
}
function ceil(num) {
    return Math.ceil(num);
}
function sqrt(num) {
    return Math.sqrt(num);
}
function power(num, num2) {
    return Math.pow(num,num2);
}


  /* DRAWING FUNCTIONS */
  /* GET ACTUAL CANVAS CONTEXT */
var Context = this.Context;

/* Drawing Functions */
function draw_circle( x , y , radius, outline){
    Context.beginPath();
    Context.arc(x,y,radius,0,2*Math.PI);
    if (!outline){
        Context.fill()
    }else{
        Context.stroke();
    }
    Context.closePath();
}
function draw_rectangle( x , y , x2 , y2 ){
    Context.fillRect(x,y,x2-x,y2-y);
}
function draw_line(x,y,xx,yy) {
    Context.beginPath();
    Context.moveTo(x,y);
    Context.lineTo(xx,yy);
    Context.stroke();
}
function draw_rectangle_color( x , y , x2 , y2 , color ){
    Context.fillStyle=color;
    Context.fillRect(x,y,x2-x,y2-y);
}
function draw_set_color( color ){
    Context.fillStyle=color;
}
function draw_sprite( sprite , x , y ){
    Context.drawImage(sprite.image,x,y);
}
function draw_text(text , x , y){
    Context.fillText(text,x,y);
}
function font_style(style)  {
    Context.font = style;
};


  /* GEAR */
  /* step functions, more mechanical things */
this.step = function() {
  var instances = this.current_room.instances;
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
  var instances = this.current_room.instances;
  /*draw every instance*/
  instances.forEach(function(instance,value){
      this.context.save();
      this.context.translate(instance.x+instance.xOffset,instance.y+instance.yOffset);
      this.context.rotate(instance.image_angle*Math.PI/180);//ROTATION
      this.context.scale(instance.xscale,instance.yscale);//X-Y-SCALE
      this.context.translate(-instance.x,-instance.y);
      this.context.fillStyle=instance.color;//COLOR
      this.context.strokeStyle=instance.color;//COLOR
      if (instance.sprite_index!=0){
      /*controle de sprite*/
          if (instance.sprite_index.ready==1){
              var hLevel, wLevel,imgIndex;
              imgIndex=0;
              wLevel=0;
              hLevel=0;
              //set object box
              instance.height=instance.sprite_index.frameHeight;
              instance.width=instance.sprite_index.frameWidth;
              //end of set objectbox
              if (instance.sprite_index.image_number>1){
                  instance.image_index+=instance.image_speed;
                  if (instance.image_index>instance.sprite_index.image_number){instance.image_index=0;}
                  if (instance.image_index<0){instance.image_index=instance.sprite_index.image_number-1;}
                  while(imgIndex<Math.round(instance.image_index)){
                      imgIndex++;
                      wLevel++;
                      if (wLevel>(instance.sprite_index.wFrames)-1){
                          wLevel=0;hLevel++;
                      }
                      if (hLevel>(instance.sprite_index.hFrames)-1){
                          hLevel=0;
                          wLevel=0;
                      }
                  }
              }
              /*controle de animação*/
              if (instance.clip_type == 1) {
                  this.context.save();
                  draw_circle(instance.x, instance.y, instance.width / 2, 1);
                  this.context.clip();
                  this.context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
                  this.context.restore();
              } else {
                  this.context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
              }
          }
      }
      instance.draw();//DRAW EVENT

      this.context.restore();
      this.context.scale(1,1);//RESET SCALE
      this.context.rotate(0);//RESET ROTATION
  });
}

  /* GAME RUN SETUP */
this.start = function() {
  /* variables */
  var Error = false;
  var game_instance = this;
  if  ( this.debug ) {
    console.log("UPDATED:")
    console.log( game_instance );
  }
  /* run gear */
  game_instance.step();
  game_instance.draw();
  game_instance.keyboard.reset();
  /* if there is no error, we do the animation */
  setTimeout( function() {
    game_instance.start();
  } , 2000);
}
/* init events organizer */
this.run = function() {
  /* unique settings */
  this.keyboard = new Keyboard();
  this.start();
}


  /* RETURN THE GAME OBJECT */
  return this;
}
