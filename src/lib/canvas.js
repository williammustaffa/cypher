export default class Canvas {
  constructor(insert, options) {
    const defaults = {
      id: Math.random().toString(36).substr(2, 9),
      class: "",
      container: "body",
      width: 640,
      height: 480,
      style: "",
    };

    /* CANVAS OPTIONS */
    options = {...defaults, ...options};

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("id", options.id);
    this.canvas.setAttribute("width", options.width);
    this.canvas.setAttribute("height", options.height);
    this.canvas.setAttribute("style", options.style);

    /* end of canvas style */
    if (insert) document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    /* initial style settings */
    this.context.font = 'normal 20px Arial';
    this.context.textAlign="center";
    this.context.textBaseline = 'middle';
  }

  update(width, height) {
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
  }
}
