/* step functions, more mechanical things */
export default function step() {
  var { objects } = this.current_room;
  objects.map(instance => {
    instance.vspeed += instance.gravity * ( Math.sin( instance.gravity_direction * Math.PI / 180 ) );
    instance.hspeed += instance.gravity * ( Math.cos( instance.gravity_direction * Math.PI / 180 ) );
    instance.y += instance.vspeed + ( instance.speed * Math.sin( instance.direction * Math.PI / 180 ) );
    instance.x += instance.hspeed + ( instance.speed * Math.cos( instance.direction * Math.PI / 180 ) );
    instance.step();
  });
}
