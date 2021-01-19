export interface IActor {
  id: string,
  x: number,
  y: number,
  xscale: number,
  yscale: number,
  xoffset: number,
  yoffset: number,
  solid: boolean,
  vspeed: number,
  hspeed: number,
  speed: number,
  direction: number,
  gravity: number,
  gravity_direction: number,
  image_index: number,
  image_speed: number,
  image_angle: number,
  color: string,
  sprite: any, // fix sprite type when creating sprite interface

  create: VoidFunction,
  step: VoidFunction,
  draw: VoidFunction
}

export interface IActorProps {
  x: number,
  y: number,
  room: { tools: object }
}

export const DEFAULT_PROPS: IActorProps = {
  x: 0,
  y: 0,
  room: null
}