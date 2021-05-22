import DiscordRPC from 'discord-rpc'
import { PlaybackState, SongDetails } from './now-playing'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config.json')

const client = new DiscordRPC.Client({ transport: 'ipc' })

export async function setActivity (song: SongDetails, albumCoverHash?: string): Promise<void> {
  await client.setActivity({
    details: song.name,
    state: `By ${song.artist}`,
    startTimestamp: song.state === PlaybackState.paused ? undefined : Date.now() - song.position * 1000,
    largeImageKey: albumCoverHash,
    largeImageText: song.album,
    smallImageKey: song.state === PlaybackState.paused ? 'paused' : 'logo',
    smallImageText: 'github.com/leahlundqvist'
  })
}

export async function clearActivity (): Promise<void> {
  await client.clearActivity()
}

client.login({ clientId: config.id }).catch(console.error)
