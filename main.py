#!/usr/bin/env python3
from music import getPlaying, Track
from discord import Discord
import time

playing = Track(0,0,0,0,0)
client = Discord("635251785136603166")

def update(current):
    track = getPlaying()

    if track == False:
        client.clear()
        return current

    if current.equals(track) == False:
        client.setTrack(track)
        return track

    return current

while True:
    playing = update(playing)
    time.sleep(1)