import { Constants } from 'utils';

export default class Sound {
  /**
   * Define class group
   */
  group_identifier = Constants.SOUND;

  /**
   * sound volume 0 - 100
   */
  volume = 100;

  /**
   * indicates whether the sound is playing or not
   */
  isPlaying = false;

  /**
   * indicates song position in seconds
   */
  position = 0;

  play() {
    // play sound action
  }

  pause() {
    // pause sound action
  }

  stop() {
    // stop and set position to 0
  }
}