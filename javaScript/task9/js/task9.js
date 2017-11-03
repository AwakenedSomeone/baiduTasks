// JavaScript Document

/*设定全局变量*/
	var throuthTree;/*定时器id*/
	var root=document.getElementById("root");
	var stackArr=[];/**存放遍历结果*/
	var lastNode;//记录上一个遍历的节点
	var dvact;//声明一个变量，用于储存遍历之后获得的stackArr类数组，并将其转化为数组;
	
	//显示遍历效果并显示查询结果
	function show(keyword){
		var i=0;
		var childC=[];//存放查询到的节点
		throuthTree=setInterval(function(){
			if(i==stackArr.length&&childC.length==0)
				{
					alert("没有找到！");
					clearInterval(throuthTree);
				}
			else if(i==stackArr.length)
				{
					clearInterval(throuthTree);//消除定时器，不然在删除节点后或者增加节点后它还会继续做
				}
			if(lastNode)
				{
					rmClass(lastNode,"selected");
				}
			addClass(stackArr[i],"selected");
			var childA=stackArr[i].childNodes;//获取stackArr[i]的子元素
			var childB=Array.prototype.slice.call(childA,0);//将类数组转换成数组对象
			for (var k = 0; k < childB.length; k++) {
				  if (childB[k].nodeType == "3"&&childB[k]!=null&&childB[k].nodeValue.indexOf(keyword)>-1) {
				/*	addClass(stackArr[i],"selected");//特殊显示查询到的元素;多余的*/
					childC.push(stackArr[i]);
					  lastNode=stackArr[i+1];
					  break;
				  }
				 lastNode=stackArr[i];
			 }
		i++;
		},500);
		
	}
	
	//前序遍历
	function prev(node){
		if(node){
			stackArr.push(node);
			for(var i=0;i<node.childElementCount;i++)
				{
					if(node.children[i]!=null)
						{
							prev(node.children[i]);
						}
				}
		}
	}
	
	//后序遍历
	function last(node){
		if(node){
			for(var i=0;i<node.childElementCount;i++)
				{
					if(node.children[i]!=null)
						{
							last(node.children[i]);
						}
				}
			stackArr.push(node);
		}
	}
		
	//初始化
	function init(){
		stackArr=[];
		var value="selected";
		if(lastNode)
			{
				rmClass(lastNode,value);
			}
		dvact.forEach(function(e){
			rmClass(e,value);
		});
	}
	
	/**给按钮绑定事件*/
	function putTree(){
		//先序查询按钮
		var prevBtn=document.getElementById("prev");
		prevBtn.onclick=function(){
			var input=document.getElementById("search-input");
			var keyword=input.value;
			if(keyword.length<=0)
				{
					alert("请输入合法内容!");
					return false;
				}
			init();
			prev(root);
			show(keyword);	
			return false;
	}	
		//后序查询按钮
		var lastBtn=document.getElementById("last");
		lastBtn.onclick=function(){
			var input=document.getElementById("search-input");
			var keyword=input.value;
			if(keyword.length<=0)
				{
					alert("请输入合法内容!");
					return false;
				}
			init();
			last(root);
			show(keyword);
			return false;
		}
		//删除选中节点按钮

		var btndelete = document.getElementById("delete");
		 btndelete.onclick = function(e){
			e.preventDefault();//阻止元素鼠标点击事件的默认行为;
			dvact.forEach(function (e) {
			  if(e.className.indexOf("select")!==-1){
				e.remove(this);
			  }
			})
			divClick();
		 }	
			 
		//增加节点按钮
		function addNode(){
		var addcontent=document.getElementById("add-input").value;
		var addBtn=document.getElementById("add");
		addBtn.onclick=function(){
			var text=document.createTextNode(addcontent);
			var div=document.createElement("div");
			div.appendChild(text);
			add(div);
		}
		
		function add(div){
			dvact.forEach(function (e) {
				  if(e.className.indexOf("select")!==-1){
					e.appendChild(div);
				  }
				})
				divClick();
			
		}
	}
		addNode();
	}
	
	/*给各个div绑定点击事件*/
	function divClick(){
		var all=document.getElementById("root");
		prev(all);
		dvact = Array.prototype.slice.call(stackArr);//将类数组转化为数组;
		 dvact.forEach(function(e){ 
			e.onclick = function(e){
			  e.preventDefault();//阻止元素鼠标点击事件的默认行为;
			  e.stopPropagation();//防止事件冒泡;
			  init();
			 addClass(this,"selected");
				}
			})
	}
	
	/*给选中的节点添加类*/
	function addClass(event,value){
		if(!event.className)
			{
				event.className=value;
			}
		else{
			var oldName=event.className;
			oldName+=" "+value;
			event.className=oldName;
		}
	}
	
	/*删除类名*/
	function rmClass(obj,value){
		var reg=new RegExp(value);
				if(reg.test(obj.className))
					{
						obj.className=obj.className.replace(value,"");
					}
	}
	
	/*加载函数*/
	function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload !='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
	addLoadEvent(putTree);
	addLoadEvent(divClick);
