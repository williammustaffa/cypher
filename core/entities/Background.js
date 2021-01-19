import { ENTITY_TYPES } from '@core/constants';

export class Background {
  group_identifier = ENTITY_TYPES.BACKGROUND;
  x = 0;
  y = 0;
  repeat = true;
  depth = 99999;
}