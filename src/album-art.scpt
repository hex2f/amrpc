if application "Music" is running then
  tell application "Music"
    tell current track
        if exists (every artwork) then
            tell artwork 1
              get properties
            end tell
        else
          return "none"
        end if
    end tell
  end tell
end if