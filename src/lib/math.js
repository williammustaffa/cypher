/* Math functions */
function distance_to_point(x, y, xx, yy) {
    return Math.round(Math.sqrt(Math.pow(x-xx, 2)+Math.pow(y-yy, 2)));
}
function random(){
    return Math.random();
}
function round(num) {
    return Math.round(num);
}
function floor(num) {
    return Math.floor(num);
}
function ceil(num) {
    return Math.ceil(num);
}
function sqrt(num) {
    return Math.sqrt(num);
}
function power(num, num2) {
    return Math.pow(num,num2);
}
