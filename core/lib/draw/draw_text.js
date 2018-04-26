/**
 * Draw a text in the giving position
 * @param {string} text text to be rendered
 * @param {number} x position x
 * @param {number} y position y
 */
export default function draw_text(text , x , y) {
  this.context.fillText(text, x, y);
}