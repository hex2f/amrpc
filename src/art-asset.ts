import fetch from 'node-fetch'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config.json')

export async function uploadBuffer (buffer: Buffer, name: string): Promise<{ id: string, type: number, name: string }> {
  const encoded = buffer.toString('base64')

  const res = await fetch(`https://discord.com/api/v9/oauth2/applications/${config.id}/assets`, {
    body: JSON.stringify({ name, image: `data:image/png;base64,${encoded}`, type: '1' }),
    headers: {
      authorization: config.token,
      'content-type': 'application/json'
    },
    method: 'POST'
  })

  return await res.json()
}

export async function getAssets (): Promise<Array<{ id: string, type: number, name: string }>> {
  const res = await fetch(`https://discord.com/api/v9/oauth2/applications/${config.id}/assets`, {
    headers: {
      authorization: config.token
    }
  })

  return await res.json()
}

export async function removeAsset (id: string): Promise<void> {
  await fetch(`https://discord.com/api/v9/oauth2/applications/${config.id}/assets/${id}`, {
    headers: {
      authorization: config.token
    },
    method: 'DELETE'
  })
}
