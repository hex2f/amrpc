# Apple Music Presence for Discord

Displays your currently playing Apple Music tracks in Discord, similar to Spotify.
![Preview Screenshot: Playing a game. Music. Drama featuring Charli XCX. By Bladee & Mechatok. One minute and 14 seconds elapsed.](https://i.imgur.com/yw82Zmf.png)

## How to use

`npm start` lints, compiles and runs the program. Once it has been compiled you can use `node out/index.js`.

You'll need to create an application named `Music` in the Discord developer panel.
Upload the [logo](https://cdn.discordapp.com/app-assets/635251785136603166/842193816881463306.png) and [paused](https://cdn.discordapp.com/app-assets/635251785136603166/842185296523034634.png) assets to the applications art assets (named accordingly).

Create a `config.json` in the root directory of this project containing

```json
{
  "id": "Your Discord Application ID",
  "token": "Your personal Discord token"
}
```

If you want to avoid any chance of being banned for selfbotting, create a new user for the application and use that token instead.

## Known flaws

Album covers are not displayed properly in Discord the first time they're displayed. This is due to Discord's CDN not being ready to serve the image by the time it's requested by the persence.