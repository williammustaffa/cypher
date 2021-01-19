import { ENTITY_TYPES } from '@core/constants';

export class Sound {
  group_identifier = ENTITY_TYPES.SOUND;
  volume = 100;
  isPlaying = false;
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