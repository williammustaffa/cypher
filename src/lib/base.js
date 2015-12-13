function Canvas(w, h) {
  var canvas = document.createElement('canvas');//getElementById('canvas');
  var canvasStyle = canvas.style;
  var canvasId = '_' + Math.random().toString(36).substr(2, 9);
  canvas.setAttribute("id", canvasId);
  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);
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
  /* initial style settings */
  context.font = 'normal 20px Arial';
  return context;
}
