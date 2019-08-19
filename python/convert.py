from gtts import gTTS as gtts
import os

def tomp3(message, name, language="pt"):
    print(message)
    print(name)
    convert = gtts(text=message,lang=language)
    convert.save("%s.mp3" % os.path.join("./files", name))