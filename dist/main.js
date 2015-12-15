/**
* PROJECT NAME: jGame
* AUTHOR: William Lima / williammustaffa
* DATE:  12/01/2015
*/
/* Math functions */
function distance_to_point(x, y, xx, yy) {
    return Math.round(Math.sqrt(Math.pow(x-xx, 2)+Math.pow(y-yy, 2)));
}
function random(range){
    return Math.round(Math.random()*range);
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

function Jgame( config ) {
  /* CONFIG SETUP */
  this.def = {
    canvas: {}
  }
  var CS = Object.assign(this.def, config);
  var VP = {style: "background: #ccc;"};
  /* VARIABLES */
  this.rooms = [];
  this.current_room = false;
  this.ready = true;
  this.debug = false;
  this.keyboard = false;

  /* BASE */
  function Canvas( insert, options ) {
  var def = {
    id: Math.random().toString(36).substr(2, 9),
    class: "",
    container: "body",
    width: 640,
    height: 480,
    style: "",
  };
  /* CANVAS OPTIONS */
  var CO = Object.assign(def, options);

  this.canvas = document.createElement('canvas');//getElementById('canvas');
  this.canvas.setAttribute("id", CO.id);
  this.canvas.setAttribute("width", CO.width);
  this.canvas.setAttribute("height", CO.height);
  this.canvas.setAttribute("style", CO.style);

  /* end of canvas style */
  if (insert) document.body.appendChild(this.canvas);
  this.context = this.canvas.getContext('2d');
  /* initial style settings */
  this.context.font = 'normal 20px Arial';
  this.update = function(width, height) {
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
  };
  return this;
}
/* room surface setup */
var surface = new Canvas(0, CS.canvas );
this.context = surface.context;
/* view surafce setup */
this.view = new Canvas(1, VP );
this.scene = this.view.context;


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
  this.check = function( key ) {
      return keyPress[key];
  }
  return this;
}

  /* Objects */
function ObjectJG() {
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
  this.color = "#FFFFFF";
  /* Instance step functions */
  this.create = function() {};
  this.step = function() {};
  this.draw = function() {};
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var me = this;
    var obj_clone =  Object.assign({}, me);
    return obj_clone;
  };
  /* Return object */
  return this;
}

  /* Rooms */
function Room( opt ) {
  this.id = null;
  this.name = null;
  this.width = (opt === undefined || opt.width === undefined)? 640: opt.width;
  this.height = (opt === undefined || opt.width === undefined)? 480: opt.width;
  this.viewports = [];
  this.view_width = this.width;
  this.view_height = this.height;
  /* viewport settings */
  this.add_viewport = function( options ) {
    var def = { width: this.width, height: this.height, x: 0, y: 0 , active: false };
    for(var key in options){
      if (def.hasOwnProperty(key)) def[key] = options[key];
    }
    var index = this.viewports.push( def );
    return this.viewports[ index - 1 ]
  }
  this.objects = [];
  this.instances = [];
  /* room function */
  this.instance_create = function( obj, x, y ) {
    var new_instance = obj.clone();
    new_instance.x = x;
    new_instance.y = y;
    var index = this.objects.push( new_instance );
    /* return array */
    return new_instance;
  }
  this.start = function() {
    var newInstances = [];
    this.objects.forEach(function( index, value ) {
      var instance_copy = Object.assign({}, index);
      instance_copy.create();
      newInstances.push( instance_copy );
    });
    this.instances = newInstances;
  }
  /* Cloning function, there is some kind of sorcery here */
  this.clone = function() {
    var me = this;
    var obj_clone =  Object.assign({}, me);
    return obj_clone;
  };
  /* add a default viewport */
  this.add_viewport({active: true});

  /* return room object */
  return this;
}


  /* GAME FUNCTIONS */
  /* object creation function */
this.object_create = function() {
  var new_object = new ObjectJG();
  return new_object;
}
/* room creation function */
this.room_add = function() {
  var new_room = new Room();
  if ( !this.current_room ) {
    this.current_room = new_room.clone();
  }
  var ind = this.rooms.push( new_room );
  new_room.index = ind-1;
  return new_room;
}

this.room_goto = function( room ) {
  if ( typeof room != "number" ) {
    room = room.index;
  }
  this.current_room = this.rooms[ room ].clone();
  this.current_room.start();
}


  /* DRAWING FUNCTIONS */
  /* Drawing Functions */
this.draw_circle = function( x , y , radius, outline) {
    this.context.beginPath();
    this.context.arc(x,y,radius,0,2*Math.PI);
    if (!outline){
        this.context.fill()
    }else{
        this.context.stroke();
    }
    this.context.closePath();
}
this.draw_rectangle = function( x , y , x2 , y2 ) {
    this.context.fillRect(x,y,x2-x,y2-y);
}
this.draw_line = function(x,y,xx,yy) {
    this.context.beginPath();
    this.context.moveTo(x,y);
    this.context.lineTo(xx,yy);
    this.context.stroke();
}
this.draw_rectangle_color = function( x , y , x2 , y2 , color ) {
    this.context.fillStyle=color;
    this.context.fillRect(x,y,x2-x,y2-y);
}
this.draw_set_color = function( color ){
    this.context.fillStyle=color;
}
this.draw_sprite = function( sprite , x , y ) {
    this.context.drawImage(sprite.image,x,y);
}
this.draw_text = function(text , x , y) {
    this.context.fillText(text,x,y);
}
this.font_style = function(style)  {
    this.context.font = style;
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

  /* GI reefer to Game Instance */
  var GI = this, instances = GI.current_room.instances;
  /* clear the canvas for redrawing */
  GI.context.clearRect(0, 0, GI.context.canvas.width, GI.context.canvas.height);
  GI.context.fillRect(0, 0, GI.current_room.width, GI.current_room.height);
  /*draw every instance*/
  instances.forEach( function(instance, value) {
      GI.context.save();
      GI.context.translate(instance.x+instance.xOffset,instance.y+instance.yOffset);
      GI.context.rotate(instance.image_angle*Math.PI/180);//ROTATION
      GI.context.scale(instance.xscale,instance.yscale);//X-Y-SCALE
      GI.context.translate(-instance.x,-instance.y);
      GI.context.fillStyle=instance.color;//COLOR
      GI.context.strokeStyle=instance.color;//COLOR
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
              GI.context.fillStyle = "#000000";//COLOR
              /*controle de animação*/
              GI.context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
          }
      }
      instance.draw();//DRAW EVENT

      GI.context.restore();
      GI.context.scale(1,1);//RESET SCALE
      GI.context.rotate(0);//RESET ROTATION
  });

  /* convert context to image */
  var dataURL = GI.context.canvas.toDataURL();
  var newImage = new Image();
  newImage.src = dataURL;
  /* clean texture */
  GI.scene.clearRect(0, 0, GI.context.canvas.width, GI.context.canvas.height);
  GI.scene.fillStyle = "#cccccc";
  GI.scene.fillRect(0, 0, GI.current_room.width, GI.current_room.height);
  /* draw each viewport */
  GI.current_room.viewports.forEach( function(obj, ind) {
    // obj = {width: 640, height: 640, x: 0, y: 0, active: true}
    var view = obj;
    var index = ind;
    GI.view.update(GI.current_room.view_width, GI.current_room.view_height);
    GI.scene.drawImage( newImage, obj.x, obj.y, obj.width, obj.height, 0, 0, GI.current_room.view_width,  GI.current_room.view_height);
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
  } , 1000/30); // 30 steps in one second
}
/* init events organizer */
this.run = function() {
  /* unique settings */
  this.keyboard = new Keyboard();
  this.current_room.start();
  this.start();
}


  /* RETURN THE GAME OBJECT */
  return this;
}
