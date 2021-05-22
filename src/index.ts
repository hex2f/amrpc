import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import getCurrentAlbumArt from './album-art'
import sha1 from 'sha1'
import { removeAsset, uploadBuffer } from './art-asset'
import NowPlaying, { SongDetails } from './now-playing'
import { setActivity, clearActivity } from './rpc'

const covercache = new JsonDB(new Config('cover-cache', true, false, '/'))

const nowPlaying = new NowPlaying()

let lastId = ''
let lastState = ''

async function update (song: SongDetails): Promise<void> {
  try {
    if (song.id !== lastId || song.state !== lastState) {
      lastId = song.id
      lastState = song.state

      const items = covercache.getData('/')
      const albumCoverData = await getCurrentAlbumArt()

      if (albumCoverData !== undefined) {
        let hash = sha1(albumCoverData).substr(0, 32)

        console.log(`[${song.state}] "${song.name}" on "${song.album}" by "${song.artist}" - [cover:${hash}]`)

        try {
          if (!covercache.exists(`/${hash}`)) {
            console.log(`${hash} not in cache. Uploading...`)
            const asset = await uploadBuffer(albumCoverData, hash)
            covercache.push(`/${hash}`, { id: asset.id, timestamp: Date.now() })
          }

          if (Object.keys(items).length > 250) {
            const [oldestKey, oldest] = Object.entries(items).sort((a: any, b: any) => a[1].timestamp - b[1].timestamp)[0] as [string, {id: string}]
            console.log(`Cache overflow, deleting ${oldestKey}`)
            await removeAsset(oldest.id)
            covercache.delete(`/${oldestKey}`)
          }
        } catch (e) {
          console.log('Failed to upload album art', e)
          hash = 'empty'
        }

        await setActivity(song, hash)
      } else {
        console.log(`[${song.state}] "${song.name}" on "${song.album}" by "${song.artist}"`)
        await setActivity(song, 'empty')
      }
    }
  } catch (e) {
    console.error(e)
  }
}

nowPlaying.on('stopped', async function stop () {
  await clearActivity()
})
nowPlaying.on('playing', update)
nowPlaying.on('paused', update)
