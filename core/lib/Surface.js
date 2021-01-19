export class Surface {
  constructor(options) {
    this.canvas = this.create_canvas(options);
    this.context = this.canvas.getContext('2d');

    // initial styling
    this.context.font = 'normal 20px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
  }

  static create(options) {
    const surface = new Surface({
      id: `surface_${Math.random().toString(36).substr(2, 9)}`,
      container: 'body',
      width: 640,
      height: 480,
      ...options,
    });

    return surface;
  }

  create_canvas(options) {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('id', options.id);
    canvas.setAttribute('width', options.width);
    canvas.setAttribute('height', options.height);
    canvas.setAttribute('style', options.style);

    if (options.insert) {
      const container = document.querySelector(options.container);
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      container.appendChild(canvas);
    }

    return canvas;
  }

  update(width, height) {
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
  }
}