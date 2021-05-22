import { exec } from 'child-process-promise'

export default async function getCurrentAlbumArt (): Promise<Buffer | undefined> {
  const res = (await exec('osascript src/album-art.scpt')).stdout.split('\n')[0]
  if (res === 'none') {
    return undefined
  }
  let format = res.slice(res.indexOf('format:') + 7)
  format = format.slice(0, format.indexOf(',')).split(' ')[0]
  const datastr = res.slice(res.indexOf(`«data ${format}`) + 6 + format.length, res.lastIndexOf('»'))
  const data = Buffer.from(datastr, 'hex')
  return data
}
