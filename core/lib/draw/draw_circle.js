/**
 * Draw a circle
 * @param {number} x position x in the scene
 * @param {number} y position y in the scene
 * @param {number} radius radius from circle as center is xy
 * @param {boolean} outline outline circle
 */
export function draw_circle(x, y, radius, outline) {
  this.context.beginPath();
  this.context.arc(x, y, radius, 0, 2 * Math.PI);
  if (!outline) {
    this.context.fill()
  } else {
    this.context.stroke();
  }
  this.context.closePath();
}
