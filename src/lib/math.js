/* Math functions */
export function distance_to_point(x, y, xx, yy) {
    return Math.round(Math.sqrt(Math.pow(x-xx, 2)+Math.pow(y-yy, 2)));
}
export function random(range){
    return Math.round(Math.random()*range);
}
export function round(num) {
    return Math.round(num);
}
export function floor(num) {
    return Math.floor(num);
}
export function ceil(num) {
    return Math.ceil(num);
}
export function sqrt(num) {
    return Math.sqrt(num);
}
export function power(num, num2) {
    return Math.pow(num,num2);
}
