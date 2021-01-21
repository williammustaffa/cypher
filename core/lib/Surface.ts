import { Sprite } from '@core/entities';

interface SurfacePropsInterface {
  id?: string,
  width?: string,
  height?: string,
  style?: string,
  container?: string,
  insert?: boolean
}

export class Surface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(options: SurfacePropsInterface) {
    this.canvas = this.createCanvas(options);
    this.context = this.canvas.getContext('2d');

    // initial styling
    this.context.font = 'normal 20px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
  }

  static create(options: SurfacePropsInterface) {
    const surface = new Surface({
      id: `surface_${Math.random().toString(36).substr(2, 9)}`,
      container: 'body',
      width: '640',
      height: '480',
      ...options,
    });

    return surface;
  }

  createCanvas(options: SurfacePropsInterface): HTMLCanvasElement {
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

  update(width: string, height: string) {
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
  }

  drawCircle(x: number, y: number, radius: number, outline: boolean): void {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    if (!outline) {
      this.context.fill()
    } else {
      this.context.stroke();
    }
    this.context.closePath();
  }

  drawLine(x: number, y: number, xx: number, yy: number): void {
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(xx, yy);
    this.context.stroke();
  }

  drawRectangle(x: number, y: number, x2: number, y2: number): void {
    this.context.fillRect(x, y, x2 - x, y2 - y);
  }

  drawSetColor(color: string): void {
    this.context.fillStyle = color;
  }

  drawSprite(sprite: Sprite, x: number, y: number): void {
    this.context.drawImage(sprite.DOMElement, x, y);
  }

  drawText(text: string, x: number, y: number): void {
    this.context.fillText(text, x, y);
  }

  setFontStyle(style: string): void {
    this.context.font = style;
  }
}