import { Injectable } from '@angular/core'
import { ActionSounds } from './action-sounds'

@Injectable()
export class CardSounds implements ActionSounds {
  success = new Howl({
    src: [ require('../../sound/success.ogg') ],
    volume: 0.3,
    rate: 1.5
  })

  failure = new Howl({
    src: [ require('../../sound/failure-2.ogg') ],
    volume: 1,
    sprite: {
      main: [ 0, 240 ]
    },
    rate: 2.6
  })
}
