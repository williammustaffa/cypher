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
