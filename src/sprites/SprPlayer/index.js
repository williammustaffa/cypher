import Sprite from 'entities/Sprite';
import Constants from 'utils/Constants';
import src from './src.png';

export default class SprPlayer extends Sprite {
  constructor(props) {
    super(props)
    this.src = src; // sprite source
    this.h_frames = 7; // number of horizontal frames to be splited
    this.v_frames = 2; // number of vertical frames to be splited
    this.offset_left = 5;
    this.offset_right = 3;
    this.offset_top = 5;
    this.offset_bottom = 0;
    this.x_origin = Constants.CENTER; // center sprite on actor x coordinate
    this.y_origin = Constants.CENTER; // center sprite on actor y coordinate
  }
}