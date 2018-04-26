/**
 * Draw a simple rectangle
 * @param {number} x x of point 1 from rectangle
 * @param {number} y y of point 1 from rectangle
 * @param {number} x2 x of point 2 from rectangle
 * @param {number} y2 y of point 2 from rectangle
 */
export default function draw_rectangle(x, y, x2, y2) {
  this.context.fillRect(x, y, x2 - x, y2 - y);
}
