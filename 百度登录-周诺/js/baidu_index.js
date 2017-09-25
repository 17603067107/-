

window.onload=function(){
	
	//设置
	$('#btn_set').hover(function(){		
		$('#set').show();				
	},function(){
//		$('#set').hide();		
	});
	
	

	//侧边栏 
	$('#set').find("li").hover(function(){
		var index=$(this).index();
		$('#set').find("li").css({'background':'#fff','color':'#000'});
		$('#set').find("li").eq(index).css({'background':'blue','color':'#fff'});
			
	},function(){});
		
		
	$('#set').hover(function(){
		$('#set').show();
	},function(){
		$('#set').hide();
		console.log('2')
	});

	$('#btn_more').hover(function(){
		$('#right-nav').show();
	},null);
	
	
	$('#right-nav').hover(function(){
		$('#right-nav').show();
	},function(){
		$('#right-nav').hide();
	})
	
	//soutu_drag 点击照相机  上传图片  搜图
	//点击 del souru_drag 消失
	$('.i').click(function(){
		
		$('.soutu').show();
//		console.log($('#login1').elements[0]);
		$('#login1').elements[0].innerHTML="";
		$('#txt').elements[0].placeholder='在此处粘贴图片网址';
		$('.i').css({'right':'40px','fontSize':'26px','top':'4px',"color":'#fff'});
		
	})
	
	
	$('#del_soutu').click(function(){
		$('.i').show();
		$('.soutu').hide();
		$('#txt').elements[0].placeholder='';
		$('#login1').elements[0].innerHTML="百度一下";
		$('.i').css({'right':'','fontSize':'','top':'','color':''});
	})
	
	
	
	//类似于百度搜索
	var timer;

	$('#txt').elements[0].onkeyup=function(){
		clearTimeout(timer);
		
		
		//调用onkeyup方法时删除前一次  生成的data信息
		var lis=$("#list-search").elements[0].getElementsByTagName('li');
		if(lis.length!=0){
			removeLi();
		}	
		
		
		//当按下删除键的时候  清空所有的li，然后在重新渲染数据
		
		
		//延时获取接口	操作
		var that=this;
		
		
		timer=setTimeout(function(){
			var script=document.createElement('script');
			if(that.value!=''){
				script.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+ that.value +"&cb=fn";
			}		
			document.body.appendChild(script);
			document.body.removeChild(script);
			
		
		},500);
			
	}
	
	
	
	//登录框拖拽
	//绑定点击登入时间
	$('#btn_login').click(function(){
		$('#allcover').show();
		$('#login').show().center().drag('#nav');
			
	});
	
	
	$('#del').click(function(){
		$('#login').hide();
		$('#allcover').hide();
	});
	
	
	//当表单获取 焦点 时出现验证表单
	//验证码错误时 无法点击 登录  设置开关 boolean
	var boolean=false;
	$('#txt2').elements[0].onfocus=function(){
		
		if($('#txt1').elements[0].value!=''){
			
//			随机生成四位数的验证码

			var num=Math.floor(Math.random()*8999+1000);
			$("#verify").show();
			
			$("#auth_code").show().html(num);
			$("#change_again").show().click(function(){
				
				num=Math.floor(Math.random()*8999+1000);
				
				$("#auth_code").html(num);
			});
					
			
		}	
	}
	//验证码判断
	$("#verify").elements[0].onblur=function(){
		
		if($("#auth_code").show().html()==$('#verify').elements[0].value){
			
			boolean=true;
		}		
	}
	$("#verify").elements[0].onfocus=function(){
		$("#show_error").html(' ');
		$("#verify").elements[0].value=null;
	}
	
	
	//验证表单  登录 
	$('#login_enter').click(function(){
		if(boolean){
			boolean=false;
			var Txt1=$('#txt1').elements[0];
			var Txt2=$('#txt2').elements[0];
		
			var userCookie=getCookie("user");
			console.log(userCookie)
			userCookie=JSON.parse(userCookie);
			var flag=true;
			for(var i=0;i<userCookie.length;i++){

							  
				if (userCookie[i].username==Txt1.value){

					flag=false;

					if (userCookie[i].passWord==Txt2.value) {
									//验证通过进行的操作
									
					}else{
//						alert("密码输入错误");
						$("#show_error").html('密码输入错误');
					}

				}													
			}
			if(flag){
//				alert("用户名不存在");
				$("#show_error").html('用户名不存在');
			}
			
		}else{
			$("#show_error").html('验证码输入错误');
		}
	});
	
			
}

//function fn(data){
//	var arr=data.s;
//	console.log(arr);
//	if(arr!=''){
//		
//		$('.search').append('ul',null);
//		$('.search').find('ul').addClass('list-search');
//		for (var i=0; i<5; i++){
//			$(".list-search").append('li',arr[i]);
//			$(".list-search").css({"border":"1px solid #000"});
//			$(".list-search").find('li').css({'fontSize':'16px','lineHeight':'30px',"paddingLeft":'20px'})
//		}
//		
//	}
//	
//	
//	
//	$('#txt').elements[0].onblur=function(){
//		for(var i=0;i<$(".list-search").elements.length;i++){
//			$(".list-search").elements[i].remove();
//		}
//	
//	}
//}





	//删除ul的下li
//	var arrAll=[];
	function fn(data){
						
		var arr = data.s;
//    没必要的一波操作  很难受	
//		if(arr!=''){
//			$('#list-search').elements[0].value = "";
//			console.log(arr)
//			for(var j=0;j<arr.length;j++){
//				
//				if(arrAll.indexOf(arr[j])==-1){
//					arrAll.push(arr[j]);
//				}
//				
//			}
//			console.log(arrAll);
		if(arr!=''){
			for (var i=0; i<5; i++){
				
				$("#list-search").append('li',arr[i]);
				$("#list-search").css({"border":"1px solid #000"});
				$("#list-search").find('li').css({'fontSize':'16px','lineHeight':'30px',"paddingLeft":'20px'});
				
			}
		}
		
		
		$('#txt').elements[0].onblur=function(){
		
				
//				var lis=$("#list-search").elements[0].getElementsByTagName('li');
//				
//				var olis=lis.length;//
//				
//				for(var i=0;i<olis;i++){
//					$("#list-search").elements[0].removeChild($("#list-search").elements[0].lastChild);
//				}
				removeLi();					
		}
	}	
	
	
	
	
	
	
	function removeLi(){
		var lis=$("#list-search").elements[0].getElementsByTagName('li');
				
		var olis=lis.length;//
				
		for(var i=0;i<olis;i++){
			$("#list-search").elements[0].removeChild($("#list-search").elements[0].lastChild);
		}
	}

