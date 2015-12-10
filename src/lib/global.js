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
function font_style(style)  {
    context.font = style;
};
