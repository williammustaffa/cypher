/**
 * Set the color context
 * @param {string} color Hexadecimal color
 */
export default function draw_set_color(color) {
  this.context.fillStyle = color;
}