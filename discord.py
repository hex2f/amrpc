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
        print("Changing track to: " + track.track + " by " + track.artist)
        self.cleared = False
        self.rpc.update(
            state="By " + track.artist,
            details=track.track,
            start=int(track.start),
            large_image="logo",
            large_text="Apple Music",
            small_image="github",
            small_text="github/memeone/amrpc")