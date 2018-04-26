/**
 * returns the distance between two point
 * @param {number} x x from point 1
 * @param {number} y y from point 1
 * @param {number} xx x from point 2
 * @param {number} yy y from point 2
 * @returns {number}
 */
export default function distance_to_point(x, y, xx, yy) {
  return Math.round(Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2)));
}