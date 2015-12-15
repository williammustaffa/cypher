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
