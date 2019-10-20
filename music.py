import subprocess
import time

class Track:
    def __init__(self, duration, finish, position, artist, track):
        self.duration = float(duration)
        self.start = time.time()
        self.finish = self.start + float(duration)
        self.position = float(position)
        self.track = track
        self.artist = artist

    def equals(self, track):
        return track.track == self.track and track.artist == self.artist
    
script = 'if application "Music" is running then\n\
	tell application "Music"\n\
		if player state is playing then\n\
			return {duration, finish} of current track & {player position} & {get artist of current track} & {get name of current track}\n\
		else\n\
			return ""\n\
		end if\n\
	end tell\n\
else\n\
	return ""\n\
end if'

def getPlaying():
    try:
        asret = subprocess.run(['osascript', '-e', script], capture_output=True)
        asret = str(asret.stdout)[2:-3].split(',')
        asret = [item.strip() for item in asret]
        return Track(asret[0],asret[1],asret[2],asret[3],asret[4])
    except:
        return False
