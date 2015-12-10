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
