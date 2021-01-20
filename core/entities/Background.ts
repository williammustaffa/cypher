import { EntityTypes } from '@core/constants';

export class Background {
  x: number = 0;
  y: number = 0;
  repeat: boolean = true;
  depth:number = 99999;
  protected group_identifier: string = EntityTypes.BACKGROUND;
}