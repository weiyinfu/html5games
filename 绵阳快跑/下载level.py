import os
import requests
a="images/rsheep.gif images/rwolf.gif".split()
for i in a: 
    resp = requests.get("http://www.veryhuo.com/game/sheep/" + i)
    print(i)
    if not os.path.exists(os.path.dirname(i)):
        os.mkdir(os.path.dirname(i))
    with open(i, "wb") as f:
        f.write(resp.content)
