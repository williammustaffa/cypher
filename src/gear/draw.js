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
              draw_set_color("#000000");
              draw_circle(instance.x, instance.y, 16, 1);
              /*controle de animação*/
              if (instance.clip_type == 1) {
                  GI.context.save();
                  draw_circle(instance.x, instance.y, instance.width / 2, 1);
                  GI.context.clip();
                  GI.context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
                  GI.context.restore();
              } else {
                  GI.context.drawImage(instance.sprite_index.image,instance.sprite_index.frameWidth*wLevel,instance.sprite_index.frameHeight*hLevel,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight,instance.x-instance.sprite_index.xOrigin,instance.y-instance.sprite_index.yOrigin,instance.sprite_index.frameWidth,instance.sprite_index.frameHeight);
              }
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

  GI.current_room.viewports.forEach( function(obj, ind) {
    // obj = {width: 640, height: 640, x: 0, y: 0, active: true}
    var view = obj;
    var index = ind;
    GI.scene.drawImage( newImage, obj.x, obj.y, obj.width, obj.height, 0, 0, obj.width, obj.height);
  });
}
