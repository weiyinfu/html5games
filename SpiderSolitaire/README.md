https://github.com/tangguangyao/SpiderSolitaire


SpiderSolitaire
===============

蜘蛛纸牌源码学习+注释



源码分析思路：
首先，用了2个构造函数Spider和Poker

Spider构造函数拥有以下方法：
init：函数初始化
start：游戏开始
continuous：检测扑克牌是否连贯
dealing：发牌
record：记录分数和移动步数
folding：收牌
adjustDistance：调整每列牌的间距
undo：退一步
replay：重新开始
win：游戏胜利
这几个功能函数

Poker构造函数拥以下方法：
init：函数初始化
render：初始化占位符，牌堆，牌的样式和摆放位置
moveTo：移动牌
offset：获取牌位置
soliOffset：获取队列中最后一张牌位置，并设置下一张的牌的位置
disable，enable：牌上面能否移动的开关
expose：翻拍
listener：给牌上面加监听函数
dragStart，draging，dragEnd：拖拽牌的一系列判断功能


初始化游戏：
首先Spider初始化时创建52张牌，牌有3个属性pos（放置位置），style（花色，背面，或者占位符），num（牌的点数）；
利用Math.random()，洗牌。打乱初始化有规则的closeCollection数组；
创建占位符和创建牌堆的样式，这里调用Poker函数设置10个占位符和5个牌堆的样式，并且给牌堆绑定点击函数；


点击start开始发牌；
发牌规则从第6行第5列停止发牌，从5行第5列明牌显示，其他则为暗牌；
closeCollection 为未发牌队列，每次发牌从牌堆中的取第一个元素；
每发一张牌利用Poker按照规则这是牌的样式和发到的位置，同时这个过程利用一个动画效果；
在Poker发牌时，对于5行第5列后明牌显示的牌，打开开关（移除fixed），此时牌堆上面可添加事件，这里添加了mousedown事件，按下鼠标时可以执行函数dragStart拖拽；
发牌完毕延迟60毫秒，让牌堆数组的最后一组解除锁定，打开开关（移除fixed），此时牌堆上面可添加事件；

此时就可以开始点击牌堆继续发牌，移动明牌（重新开始，后退一步等稍后考虑）：
继续发牌：
通过Spider的dealing发牌函数，并且结合Poker的soliOffset给新牌设置位置；
同时发完牌后减少一个牌堆，然后解锁下一组牌堆 ，此牌堆上点击可触发发牌事件；
最后将这个事件添加到历史记录中；
则一次发牌事件完成。

另外一个操作是移动明牌：
Poker的dragStart函数首先利用Spider的continuous判断点击的牌是否连续，如果连续则可以拖动；
拖动时新建一个容器dragBox，将点击牌以及所在队列的后续牌元素放到dragBox中，将点击牌及所在队列的后续牌从openCollection移除，暂存到一个临时数组dragCollection中；
绑定两个事件：mousemove和mouseup（这里我没有弄明白mousemove.drag是什么意思）；
并且记住点击牌所在队列的上一张牌S.soliPoker，移动后这张牌就是这组对列中的最后一张；
记录点击时点击事件的鼠标位置；
绑定的mousemove事件利用Poker的draging函数来拖动牌；
绑定的mouseup事件利用Poker的dragEnd来判断，能否放置牌成功，当牌移动到一定范围松开鼠标时，会判断这个牌是否连贯（连贯就可以方式），成功移动牌后，开始一次记分，记录这次操作历史，判断是否需要翻牌，移除创建存放拖动牌元素的容器，判断移动成功的这一列是否完整可以收牌等一系列规则判断。

另外2个操作：
重新开始其实就是重新初始化函数；

后退一步undo比较麻烦，也是需要各种判断：
读取historyQueue历史数据数组里面的内容，如果是翻牌dealing，直接将所有已发牌队列的最后一张牌移除，并恢复待发牌，这里就需要重新添加一个牌堆，并且将之前的牌堆关上点击事件开关；
如果不是翻牌，检测翻牌历史，如果有，则将重新让翻转至背面，测收牌历史，如果有，则将收起的牌移回原队列，移牌历史处理。

总结：
这个源码写的非常清晰，看上去很好理解，源码读起来也不是那么吃力，值得一看。
