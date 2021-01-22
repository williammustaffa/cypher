import { AlignmentTypes } from '@src/constants';
import { Sprite } from '@src/entities';
import source from './src.png';

export default class SprPlayer extends Sprite {
  source = source; // Source from image
  horizontalFrames = 7; // number of horizontal frames to be splited
  verticalFrames = 2; // number of vertical frames to be splited
  offsetLeft = 5;
  offsetRight = 3;
  offsetTop = 5;
  offsetBottom = 0;
  xOrigin = AlignmentTypes.CENTER; // center sprite on actor x coordinate
  yOrigin = AlignmentTypes.CENTER; // center sprite on actor y coordinate
}