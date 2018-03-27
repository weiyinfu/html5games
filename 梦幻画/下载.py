import requests
from pyquery import PyQuery as pq
sess=requests.session()
res=sess.get("https://www.urlteam.org/jiaohu/",verify=False)
html=pq(res.text)
with open("index.html","w",encoding='utf8') as f:
    f.write(res.text)
a=[]
css=html("link")
for i in range(css.length):
    a.append(css.eq(i).attr("href"))
js=html("script")
for i in range(js.length):
    link=js.eq(i).attr("src")
    a.append(link)
for i in a:
    if not i:continue
    if not i.startswith("js") and not i.startswith("css"):
        continue
    res=sess.get("https://www.urlteam.org/jiaohu/"+i,verify=False)
    res.encoding='utf8'
    with open(i,"w",encoding='utf8') as f:
        f.write(res.text)
print("over")