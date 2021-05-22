if application "Music" is running then
  tell application "Music"
    if player state is playing then
      return "playing" & "|," & {duration} of current track & "|," & {player position} & "|," & {get artist of current track} & "|," & {get name of current track}  & "|," & {get album of current track}
    else if player state is paused then
      return "paused" & "|," & {duration} of current track & "|," & {player position} & "|," & {get artist of current track} & "|," & {get name of current track}  & "|," & {get album of current track}
    else
      return "stopped"
    end if
  end tell
else
  return "stopped"
end if