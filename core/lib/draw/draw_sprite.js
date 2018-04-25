/**
 * Draw an image in the specified position
 * @param {Sprite} sprite sprite instance
 * @param {number} x x value from anchor 
 * @param {number} y y value from anchor
 */
export default function draw_sprite(sprite , x , y) {
  this.context.drawImage(sprite.image, x, y);
}
