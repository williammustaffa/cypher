/*      ROOM CONTROL    */
var view,current_id,room,canvas,context,instances,objects,rooms,sprites,resources;
resources={ready:false};
view={width:640,height:480};
room={width:640,height:480,background:'#000',fps:30};
canvas=document.createElement('canvas');//getElementById('canvas');
/* canvas style - CENTER*/
var canvasStyle=canvas.style;
canvasStyle.margin='auto';
canvasStyle.display='block';
canvasStyle.position='absolute';
canvasStyle.left='0';
canvasStyle.right='0';
canvasStyle.top='0';
canvasStyle.bottom='0';
/* end of canvas style */
document.body.appendChild(canvas);
context=canvas.getContext('2d');
/* internal sets */
instances=[];
objects=[];
rooms=[];
sprites=[];
current_id=0;
/* set start settings*/
canvas.height=view.height;
canvas.width=view.width;
/*      KEYS  CONTROL    */
var keys,keyPressed, keyPress, keyReleased;
keyPressed=[];
keyPress=[];
keyReleased=[];
keys={up:38, down:40, right:39, left:37, enter:13, shift:16, alt:18, space:32, backspace:8, tab: 9, control: 17, pause:19, break: 19, capslock: 20, escape: 27, pageup: 33, pagedown: 34, end: 35, home: 36, print: 44, insert:45, delete: 46, num:{0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57}, ord: {a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90},f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,mute:173,volumedown:174,volumeup:175};
for (var prop in keys){
    if (keys.hasOwnProperty(prop)) {
        keyPressed[prop]=0;
        keyPress[prop]=0;
        keyReleased[prop]=0;
    }
}
function reset_keyboard(){
    for (var prop in keys){
        if (keys.hasOwnProperty(prop)) {
            keyPressed[prop]=0;
            keyReleased[prop]=0;
        }
    }
}
function resetArray(array,val){
        var result = [];
        for( var key in array ){
            if (array.hasOwnProperty(key)) {
                if (array[key].id != val)result.push(array[key]);
            }
        }
        return result;
}
window.addEventListener('keydown',function(e){
    var Key= e.keyCode;
    for (var prop in keys){
        if (keys.hasOwnProperty(prop)) {
            if (keys[prop]==Key && !keyPress[prop]){
                keyPressed[prop]=1;
                keyPress[prop]=1;
            }
        }
    }
});
window.addEventListener('keyup',function(e){
    var Key= e.keyCode;
    for (var prop in keys){
        if (keys.hasOwnProperty(prop)) {
            if (keys[prop]==Key && keyPress[prop]){
                keyReleased[prop]=1;
                keyPress[prop]=0;
            }
        }
    }
});
function distance_to_point(x,y,xx,yy) {
    return Math.round(Math.sqrt(Math.pow(x-xx, 2)+Math.pow(y-yy, 2)));
}
function instance_nearest(obj,kind){
    var me=obj;
    var nearest = false;
    var nearest_distance = false;
    instances.forEach(function(instance){
        if (instance.class==kind && instance!=obj) {
            var distance = distance_to_point(me.x, me.y, instance.x, instance.y);
            if (distance<nearest_distance || nearest_distance == false) {
                nearest = instance;
                nearest_distance = distance;
            }
        }
    });
    return nearest;
}
function noCollision(x,y){
    var me=this;
    var isFree=true;
    instances.forEach(function(instance){
        var Collision=!((me.x+me.width+x<=instance.x) || (me.x+x>=instance.x+instance.width) || (me.y+y+me.height<=instance.y) || (me.y+y>=instance.y+instance.height));
        if (Collision==true && me.id!=instance.id){
            isFree=false;
        }
    });
    return isFree;
}
/*      FUNCTIONS    */
/* Keyboard Functions */
function keyboard_check_pressed( key ){
    return keyPressed[key];
}

function keyboard_check_released( key ){
    return keyReleased[key];
}

function keyboard_check( key ){
    return keyPress[key];
}
/* Instance & Object Functions*/
function object_create(){
    var obj,index;
    index=objects.length;
    obj=objects[index]= {};
    obj.id=undefined;
    obj.class = undefined;
    obj.step=function(){};
    obj.draw=function(){};
    obj.place_free=noCollision;
    obj.x=0;
    obj.y=0;
    obj.xscale=1;
    obj.solid=0;
    obj.yscale=1;
    obj.vspeed=0;
    obj.hspeed=0;
    obj.gravity=0;
    obj.gravity_direction=270;
    obj.mask_index=0;
    obj.direction=0;
    obj.xOffset=16;
    obj.yOffset=16;
    obj.speed=0;
    obj.clip_type=0;
    obj.sprite_index=0;
    obj.image_index=0;
    obj.image_speed=1;
    obj.image_number=0;
    obj.image_angle=0;
    obj.width=32;
    obj.height=32;
    obj.color="#000000";
    return obj;
}
function instance_create( object , x , y ){
    var clone,obj,index;
    index=current_id;
    current_id++;
    clone={};
    for (var prop in object){
        if (object.hasOwnProperty(prop)) {
            clone[prop] = object[prop];
        }
    }
    obj=instances[instances.length ]=clone;//jQuery.extend(true, {}, object);
    obj.id=index;
    obj.x=x;
    obj.y=y;
    return (obj);

}

function instance_destroy( object ){
    instances=resetArray(instances,object.id);
}
/* Sprites Functions */
function sprite_add( path , w_frame_number , h_frame_number , xOrig , yOrig){
    var img= new Image();
    img.src=path;
    var index=sprites.length;
    sprites[index]={};
    var Obj = sprites[index];
    Obj.image = img;
    Obj.image_number = w_frame_number*h_frame_number;
    Obj.wFrames = w_frame_number;
    Obj.hFrames = h_frame_number;
    Obj.xOrigin = xOrig;
    Obj.yOrigin = yOrig;
    Obj.ready = 0;
    img.onload=function(){
        Obj.frameWidth = this.width/Obj.wFrames;
        Obj.frameHeight = this.height/Obj.hFrames;
        Obj.height = this.width/Obj.wFrames;
        Obj.width = this.height/Obj.hFrames;
        if (xOrig=='center'){Obj.xOrigin=Obj.frameWidth/2;}
        if (yOrig=='center'){Obj.yOrigin=Obj.frameHeight/2;}
        Obj.ready=true;
    };
    return Obj;
}
/* Room Functions */
function room_add(){
    var room;
    room={}

}
/* Draw Functions */
function draw_circle( x , y , radius, outline){
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    if (!outline){
        context.fill()
    }else{
        context.stroke();
    }
    context.closePath();

}
function draw_rectangle( x , y , x2 , y2 ){
    context.fillRect(x,y,x2-x,y2-y);
}
function draw_line(x,y,xx,yy) {
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(xx,yy);
    context.stroke();
}
function draw_rectangle_color( x , y , x2 , y2 , color ){
    context.fillStyle=color;
    context.fillRect(x,y,x2-x,y2-y);
}
function draw_set_color( color ){
    context.fillStyle=color;
}


function draw_sprite( sprite , x , y ){
    context.drawImage(sprite.image,x,y);
}

function draw_text(text , x , y){
    context.fillText(text,x,y);
}


/*====================== INTERNAL FUNCTIONS ================================== */
var fpsControl;
/*end of global fps vars*/
fpsControl=30;

var mintime=10;//2*30;
var currtime=0;
var margin=0;
function step(){
    /*  global step */
    if (resources.ready) {
        stepEvent();//step dos objetos
        draw();//draw dos objetos
        reset_keyboard();
    }else{
        var res_total,res_loaded;
        res_total=sprites.length;
        res_loaded=0;
        resources.ready=true;
        sprites.forEach(function(){
            if (this.ready==0){resources.ready=0}else{res_loaded++;}
        });
        if (resources.ready==true && currtime<=mintime ){
            currtime++;
            resources.ready=false;
        }
        //debug
        canvas.height=view.height;
        canvas.width=view.width;
        context.fillStyle=room.background;
        context.fillRect(0,0,room.width,room.height);
        context.fillStyle='rgb(255,255,255)';
        context.textAlign="center";
        //context.fillText('Lazytime: '+currtime+'/'+mintime+' steps',room.width/2,room.height/3);
        margin+=0.4;
        context.beginPath();
        context.arc(room.width/2, room.height/2, 20, margin, 2 * Math.PI/4+margin, false);
        context.lineWidth = 2;
        context.strokeStyle = '#66FFFF';
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(room.width/2, room.height/2, 20, margin+Math.PI, 2 * Math.PI/4+margin+Math.PI, false);
        context.lineWidth = 2;
        context.strokeStyle = '#66FFFF';
        context.stroke();
        context.closePath();
        context.fillStyle='#ff0000';
        context.fillRect(0,0,room.width/100*currtime,3);
    }
    setTimeout(function(){
        step();
    },1000/fpsControl);
}


function stepEvent(){
    instances.forEach(function(instance){
        //eval(instance.step);
        instance.y+=(instance.vspeed)+(instance.speed*Math.sin(instance.direction * Math.PI / 180));
        instance.x+=(instance.hspeed)+(instance.speed*Math.cos(instance.direction * Math.PI / 180));
        instance.vspeed+=instance.gravity*(Math.sin(instance.gravity_direction * Math.PI / 180));
        instance.hspeed+=instance.gravity*(Math.cos(instance.gravity_direction * Math.PI / 180));
        instance.step();
    });
}
function font_style(style)  {
  context.font = style;
};
function draw(){
    canvas.height=view.height;
    canvas.width=view.width;
    context.fillStyle=room.background;
    context.fillRect(0,0,room.width,room.height);
    /*draw every instance*/
    instances.forEach(function(instance,value){
        context.save();
        context.translate(instance.x+instance.xOffset,instance.y+instance.yOffset);
        context.rotate(instance.image_angle*Math.PI/180);//ROTATION
        context.scale(instance.xscale,instance.yscale);//X-Y-SCALE
        context.translate(-instance.x,-instance.y);
        context.fillStyle=instance.color;//COLOR
        context.strokeStyle=instance.color;//COLOR
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
                    context.save();
                    draw_circle(instance.x, instance.y, instance.width / 2, 1);
                    context.clip();
                    context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
                    context.restore();
                } else {
                    context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
                }
            }
        }
        instance.draw();//DRAW EVENT

        context.restore();
        context.scale(1,1);//RESET SCALE
        context.rotate(0);//RESET ROTATION


    });
}
function room_create(nome){
    var sala;
    sala={
        name:nome,
        objects:{}
    };
    sala.add_object=function(){};
    return sala;
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
/*=== ajax function ===*/
var getJSON = function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};
step();
