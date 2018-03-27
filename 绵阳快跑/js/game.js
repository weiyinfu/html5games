/*
Downloads By http://www.veryhuo.com/down
*/
/*游戏开始暂停*/
var gameRunning=false;
/*
 *地图大小
 */
var mapWidth=800;
var mapHeight=600;
/*
 * 绵羊模型
 * 单位px
 *sheepWidth   模型宽度
 *sheepHeight  模型高度
 *sheepX       起始横坐标
 *sheepY       起始枞坐标
 *sheepSpeed   移动速度
 *
 */
var	sheepWidth=40;
var	sheepHeight=27;
var sheepX=parseInt((mapWidth-sheepWidth)/2);
var sheepY=parseInt((mapHeight-sheepHeight)/2);
var sheepXspeed=0;
var sheepYspeed=0;
/*摩擦力*/
var sheepFriction=0.85;
/*
* 狼模型 
* wolfWidth   模型宽度
* wolfHeight  模型高度
* maxWolfs    狼群最大数量
* appearTime  狼出现时间间隔（默认3000毫秒）
*/
var wolfWidth=40;
var wolfHeight=27;
var maxWolfs=500;
var appearTime=2000;
var wolfXspeed=0;
var wolfYspeed=0;
var wolfRate=0;
var wolfFriction=0.80;
/*狼群*/
var wolfs=new Array();
/*方向键按键设置*/
var keyUp=87;
var moveUp=false;
var keyDown=83;
var moveDown=false;
var keyLeft=65;
var moveLeft=false;
var keyRight=68;
var moveRight=false;
/*
*score        积分
*wolfCounts   狼群数量
*/
var score=0;
var wolfCounts=1;
var context;
function init(){
	var map=document.getElementById('map');
	context=map.getContext('2d');
	drawMap();
	drawSheep();
	wolfTimeout=setTimeout(createWolfs,wolfRate+wolfCounts*3000);
	wolfRate+=wolfCounts*3000;
	drawWolfs();
}
function clearMap(){
	context.clearRect(0,0,mapWidth,mapHeight);
}
/*绘制地图*/
function drawMap(){
	clearMap();
}
/*绘制绵羊*/
function drawSheep(){
	var sheepImg=new Image();
	    sheepImg.src='images/lsheep.gif';
	 if(moveLeft){
		 sheepXspeed--;
	 }
	 if(moveRight){
		  sheepXspeed++;
		  sheepImg.src='images/rsheep.gif';
	 }
	 if(moveUp){
		  sheepYspeed--;
	 }
	 if(moveDown){
		  sheepYspeed++;
	 }
	context.drawImage(sheepImg,sheepX,sheepY);
	context.fill();
	/*移动距离计算*/
	if(sheepX>=0&&sheepX<=(mapWidth-sheepWidth)){
		sheepX+=sheepXspeed;
	}else if(sheepX<0){
		sheepX+=Math.abs(sheepXspeed);
	}else if(sheepX>(mapWidth-sheepWidth)){
		sheepX-=Math.abs(sheepXspeed);
	}
	if(sheepY>=0&&sheepY<=(mapHeight-sheepHeight)){
		sheepY+=sheepYspeed;
	}else if(sheepY<0){
		sheepY+=Math.abs(sheepYspeed);
	}else if(sheepY>(mapHeight-sheepHeight)){
		sheepY-=Math.abs(sheepYspeed);
	}
	sheepXspeed*=sheepFriction;
	sheepYspeed*=sheepFriction;
}
/*增加狼群*/
function createWolfs(){
	/*0123 上下左右*/
	direction=parseInt(Math.random()*4);
	/*狼随机出现的x y 坐标*/
    wx=parseInt(Math.random()*(mapWidth-wolfWidth));
	wy=parseInt(Math.random()*(mapHeight-wolfHeight));
	var wolfObj=new Object();
	switch(direction){
		case 0:
			wolfObj.x=wx;
	        wolfObj.y=0;
		break;
		case 1:
			wolfObj.x=wx;
	        wolfObj.y=mapHeight-wolfHeight;
		break;
		case 2:
			wolfObj.x=0;
	        wolfObj.y=wy;
		break;
		case 3:
			wolfObj.x=mapWidth-wolfWidth;
	        wolfObj.y=wy;
		break;
	}
	wolfs.push(wolfObj);
	clearTimeout(wolfTimeout);
}
function drawWolfs(){
	var wolfCounter=document.getElementById("wolfCounter");
	wolfCounter.innerHTML=wolfCounts;
	for(i=0;i<=wolfCounts;i++){
		 var wolf=new Image();
	     wolf.src="images/lwolf.gif";
		if(wolfs[i].x>sheepX){
			wolfXspeed--;
		}else{
			wolfXspeed++;
			wolf.src="images/rwolf.gif";
		}
		if(wolfs[i].y>sheepY){
			wolfYspeed--;
		}else{
			wolfYspeed++;
		}
		context.drawImage(wolf,wolfs[i].x,wolfs[i].y);
		if(Math.abs(wolfs[i].x-sheepX)<=parseInt(sheepWidth)&&Math.abs(wolfs[i].y-sheepY)<=parseInt(sheepHeight)){
			catchSheep();
		}else{
			wolfs[i].x+=wolfXspeed;
			wolfs[i].y+=wolfYspeed;
		}
		wolfXspeed*=sheepFriction*0.8;
	    wolfYspeed*=sheepFriction*0.8;
	}
	wolfCounts++;
}
/*游戏开关*/
function ToggleGameplay()   
{   
    if(gameRunning)   
    {
        begin=setInterval(init,30);
    }
	else
	{   
        clearInterval(begin);   
    }   
}
/*被捕*/
function catchSheep(){
	$('#mask').show();
	$('#result').text('你被捕了！最大狼数：'+$('#wolfCounter').text());
	$('#start').text('Try again');
	$('#option').show();
	clearInterval(begin);
	clearTimeout(wolfTimeout);
	wolfCounts=0;
	wolfs=Array();
	sheepX=parseInt((mapWidth-sheepWidth)/2);
    sheepY=parseInt((mapHeight-sheepHeight)/2);
}
/*监听游戏行为*/
$(document).ready(function(){
	$('#mask').css({'width':mapWidth+'px','height':mapHeight+'px'}).fadeIn();
	$('#option').show();
	$('#start').click(function(){
		$('#mask').hide();
		$('#option').hide();		
		gameRunning=true;
		ToggleGameplay();
	})
	$('#menu li').hover(function(){
		$(this).css({'background-color':'#E8E8E8','color':'#FF0000','font-size':'36px','font-style':'normal','cursor':'pointer'});
	},function(){
		$(this).css({'color':'#FFFFFF','background-color':'transparent','font-size':'32px','font-style':'italic'});
	});
	var helpOn=1;
	$('#helpMe').click(function(){
		if(helpOn==1){
			$('#help').fadeIn();
		}else{
			$('#help').fadeOut();
		}
		helpOn=helpOn==1?0:1
	})
	/*方向控制键监听*/
	$(document).keydown(function(event){
		 switch(event.keyCode){
			  case keyLeft:
				   moveLeft=true;
				   break; 
			  case keyUp:
				   moveUp=true;
				   break;
			  case keyRight:
				   moveRight=true;
				   break;
			  case keyDown:
				   moveDown=true;
				   break; 
		 } 
	});
	$(document).keyup(function(event){
		 switch(event.keyCode){
			  case keyLeft:
				   moveLeft=false;
				   break; 
			  case keyUp:
				   moveUp=false;
				   break;
			  case keyRight:
				   moveRight=false;
				   break;
			  case keyDown:
				   moveDown=false;
				   break; 
		 } 
	});
})
