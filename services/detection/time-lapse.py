## This script can take images on a Raspberry pi and create a Time Lapse video file

import os
import time

FRAMES = 1000
TIMEBETWEEN = 6

# os.system("mkdir ./data")

frameCount = 0
while frameCount < FRAMES:
    imageNumber = str(frameCount).zfill(7)
    date = time.strftime('%d%b%Y_%H:%M:%S_%Z%z')
    image_name = 'tl_'+imageNumber+'_'+date
    os.system("raspistill -vf -hf -o ./data/%s.jpg"%image_name)
    frameCount += 1
    time.sleep(TIMEBETWEEN - 6) #Takes roughly 6 seconds to[url][/url] take a picture

os.system("ls ./data/*.jpg > stills.txt")
# os.system("avconv -r 10 -i ./data/tl_*.jpg -r 10 -vcodec libx264 -vf scale=1280:720 timelapse.mp4")
# os.system("mencoder -nosound -ovc lavc -lavcopts vcodec=mpeg4:aspect=16/9:vbitrate=8000000 -vf scale=1920:1080 -o tlcam.avi -mf type=jpeg:fps=24 mf://@stills.txt")

# scp -r ubuntu@hbuddy-ubuntu20.local:~/Documents/data ~/Pictures/
