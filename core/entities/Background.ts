import { EntityTypes } from '@core/constants';

export abstract class Background {
  x: number = 0;
  y: number = 0;
  repeat: boolean = true;
  depth:number = 99999;
  protected groupIdentifier: string = EntityTypes.BACKGROUND;
}