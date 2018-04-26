import { Constants } from 'utils';

export default class Background {
  /**
   * Define class group
   */
  group_identifier = Constants.BACKGROUND;

  /**
   * X position in room
   */
  x = 0;

  /**
   * Y position in room
   */
  y = 0;

  /**
   * Y position in room
   */
  repeat = true;

  /**
   * depth in room
   */
  depth = 99999;
}