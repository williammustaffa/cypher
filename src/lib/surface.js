/* Drawing Functions */
export function draw_circle( x , y , radius, outline) {
    this.context.beginPath();
    this.context.arc(x,y,radius,0,2*Math.PI);
    if (!outline){
        this.context.fill()
    }else{
        this.context.stroke();
    }
    this.context.closePath();
}

export function draw_rectangle( x , y , x2 , y2 ) {
    this.context.fillRect(x,y,x2-x,y2-y);
}

export function draw_line(x,y,xx,yy) {
    this.context.beginPath();
    this.context.moveTo(x,y);
    this.context.lineTo(xx,yy);
    this.context.stroke();
}

export function draw_rectangle_color( x , y , x2 , y2 , color ) {
    this.context.fillStyle=color;
    this.context.fillRect(x,y,x2-x,y2-y);
}

export function draw_set_color( color ){
    this.context.fillStyle=color;
}

export function draw_sprite( sprite , x , y ) {
    this.context.drawImage(sprite.image,x,y);
}

export function draw_text(text , x , y) {
    this.context.fillText(text,x,y);
}

export function font_style(style)  {
    this.context.font = style;
};
