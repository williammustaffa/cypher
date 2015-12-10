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
