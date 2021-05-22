import { exec } from 'child-process-promise'
import { EventEmitter } from 'events'
import sha1 from 'sha1'

export enum PlaybackState {
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped'
}

export interface SongDetails {
  state: PlaybackState.playing | PlaybackState.paused
  duration: number
  position: number
  artist?: string
  name?: string
  album?: string
  id: string
}

export default class NowPlaying extends EventEmitter {
  timer: NodeJS.Timeout
  state: PlaybackState = PlaybackState.stopped
  id: string = ''

  constructor (interval: number = 1000) {
    super()
    this.timer = setInterval(this.fetchPlaying.bind(this), interval)
  }

  async fetchPlaying (): Promise<void> {
    try {
      const res = (await exec('osascript src/now-playing.scpt')).stdout.split('\n')[0]
      if (res === 'stopped') {
        if (this.state === PlaybackState.stopped) return
        this.state = PlaybackState.stopped
        this.emit('stopped')
      }
      const [state, duration, position, artist, name, album] = res.split('|,')
      const id = sha1(`${artist}${name}${album}`).substr(0, 32)
      const details: SongDetails = {
        state: state === 'playing' ? PlaybackState.playing : PlaybackState.paused,
        duration: Number(duration.replace(',', '.')),
        position: Number(position.replace(',', '.')),
        artist: artist === '' ? undefined : artist,
        name: name === '' ? undefined : name,
        album: album === '' ? undefined : album,
        id
      }

      switch (state) {
        case 'paused':
          if (this.state === PlaybackState.paused) break
          this.state = PlaybackState.paused
          this.emit('paused', details)
          break
        case 'playing':
          this.state = PlaybackState.playing
          this.emit('playing', details)
          break
      }
    } catch (e) {

    }
  }
}
