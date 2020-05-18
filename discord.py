from pypresence import Presence

class Discord:
    def __init__(self, id):
        self.id = id
        self.rpc = Presence(id)
        self.cleared = True
        self.rpc.connect()

    def clear(self):
        if self.cleared == False:
            print("Clearing status")
            self.rpc.clear()

        self.cleared = True

    def setTrack(self, track):
        print("Changing track to: " + track.track + " by " + track.artist + "(" + track.artist.lower().replace(' ', '_') + ")")
        self.cleared = False
        self.rpc.update(
            state="By " + track.artist,
            details=track.track,
            start=int(track.start),
            large_image=track.artist.lower().replace(' ', '_'),
            large_text="Apple Music",
            small_image="logo",
            small_text="github.com/leahlundqvist")