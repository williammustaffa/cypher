import uuid from 'uuid';
import { Sprite } from '@src/entities';

interface SurfacePropsInterface {
  id?: string,
  width?: number,
  height?: number,
  style?: string,
  container?: HTMLElement,
  insert?: boolean
}

export class Surface {
  id: string;
  height: number;
  width: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(options: SurfacePropsInterface) {
    this.id = uuid.v4();
    this.height = options.height || 480;
    this.width = options.width || 680;

    this.canvas = this.createCanvas(options);
    this.context = this.canvas.getContext('2d');

    // initial styling
    this.context.font = 'normal 20px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
  }

  private createCanvas(options: SurfacePropsInterface): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('id', this.id);
    canvas.setAttribute('style', options.style);
    canvas.setAttribute('width', String(this.width));
    canvas.setAttribute('height', String(this.height));

    if (options.insert) {
      const container = options.container;
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      container.appendChild(canvas);
    }

    return canvas;
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