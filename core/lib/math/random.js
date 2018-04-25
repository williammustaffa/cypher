/**
 * Returns a random integer in a range between 0 and the specified range
 * @param {number} range range limit
 * @returns {integer}
 */
export default function random(range){
  return Math.round(Math.random() * range);
}
