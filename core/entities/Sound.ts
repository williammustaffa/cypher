import { EntityTypes } from '@core/constants';

export class Sound {
  volume: number = 100;
  position: number = 0;
  isPlaying: boolean = false;

  protected group_identifier: string = EntityTypes.SOUND;

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