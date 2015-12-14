function Canvas( insert, options ) {
  var def = {
    id: Math.random().toString(36).substr(2, 9),
    class: "",
    container: "body",
    width: 640,
    height: 480,
    style: "position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; display: block; background: #000;",
  };
  /* CANVAS OPTIONS */
  var CO = Object.assign(def, options);

  var canvas = document.createElement('canvas');//getElementById('canvas');
  canvas.setAttribute("id", CO.id);
  canvas.setAttribute("width", CO.width);
  canvas.setAttribute("height", CO.height);
  canvas.setAttribute("style", CO.style);

  /* end of canvas style */
  if (insert) document.body.appendChild(canvas);
  context=canvas.getContext('2d');
  /* initial style settings */
  context.font = 'normal 20px Arial';
  return context;
}
/* canvas setup */
this.context = new Canvas(0, CS.canvas );
this.scene = new Canvas(1, VP );
