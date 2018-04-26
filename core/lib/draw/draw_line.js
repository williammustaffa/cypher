/**
 * Draw a simple line
 * @param {number} x x of point 1 from line
 * @param {number} y y of point 1 from line
 * @param {number} xx x of point 2 from line
 * @param {number} yy y of point 2 from line
 */
export default function draw_line(x, y, xx, yy) {
  this.context.beginPath();
  this.context.moveTo(x, y);
  this.context.lineTo(xx, yy);
  this.context.stroke();
}
