/**
 * Draw a colored rectangle
 * @param {number} x x of point 1 from rectangle
 * @param {number} y y of point 1 from rectangle
 * @param {number} x2 x of point 2 from rectangle 
 * @param {number} y2 y of point 2 from rectangle
 * @param {string} color fill color
 */
export default function draw_rectangle_color(x , y , x2 , y2 , color) {
  this.context.fillStyle = color;
  this.context.fillRect(x, y, x2 - x, y2 - y);
}