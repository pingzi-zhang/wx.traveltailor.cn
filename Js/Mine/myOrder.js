$(function(){
	var mineuser = window.localStorage.getItem("MerchantID");
	var status = sessionStorage.getItem("current");
	var method="My_GetTaitorOrderCurrentList";//历史订单和当前订单请求的方法默认当前的
	if(status ==1){
		method="My_GetTaitorOrderHistoryList";
		$("#tab a").eq(1).addClass("on").siblings().removeClass("on");
	}
	$("#tab a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var currentTxt = $(this).html();
		if(currentTxt == "当前订单"){
			sessionStorage.setItem("current",0);//0表示当前的，1表示历史
			window.location.reload();
		}else{
			sessionStorage.setItem("current",1);//0表示当前的，1表示历史
			window.location.reload();
		}
	});
	
	//初始时加载的
	var RecordTotal = 0;
	var pageIndex = 0;
    var pageSize = 5;
    var flag = true;
	getTotal();
	getAjax(method)
	 //下滑加载
	  $(window).bind("scroll",function () {
	    var scrollTop= $(this).scrollTop();
	    var scrollHeight = $(document).height();
	    var windowHeight = $(this).height();
	    if (Math.floor(scrollTop + windowHeight) >= scrollHeight) {
	      if((pageIndex+1)*pageSize < RecordTotal){
	      	pageIndex++;
	        getAjax(method);
	      }else{
	      	$("#bottip").css("display","block")
	      }
	    }
	  });
	//获取记录总数
	function getTotal(){
		var arrActionParam = {
	       	/*TaitorID:mineuser, */
	       	TaitorID:jsgMemberID,
		    Skip: 0, 
		    Take: 100
	    };
    	var strActionName = method;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    $.ajax({
            type: "POST",
            url: jsgVistHost,
            dataType : "json",
            data: datSubmit,
            async: false,
            timeout: 20000,
            beforeSend: function () {
            	$("#load").css("display","block");
            },
            success: function (data) {
                if(data.Result==1){
					RecordTotal = data.Totel;
					if(RecordTotal<=0){
						$('.noorder').show();
			           	$('.noorder').on('click',function(){
			                location.href='../Home/home.html';
			            })
					}
				}
            },
            complete: function () {
            	$("#load").css("display","none");},
            error: function (data) {
                console.log(data);
            }
       });
	}
	function getAjax(methodName){
		//ajax请求方法
		function public2(strActionName,arrActionParam){
    	var arrActionParam = {
		       	TaitorID:jsgMemberID,
		       	/*TaitorID:"2e7c3dbb4b384a479b09ffa756e726dd",*/
			    Skip: pageIndex*pageSize, 
			    Take: pageSize
		    };
		    
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	    }
		imgUpload.method(public2(methodName),function (data) {
			//请求成功
			if(data.Result==1){
				//请求的有记录渲染页面
				var datal= data.List;
				if(datal.length > 0){
					for(var i in datal){
			            var datagoodl=datal[i].GoodsList;
			            var box = document.createElement('div');
			            $(box).addClass("box");
			            $(box).append('<div class="top"><p>订单号:<span></span>'+datal[i].OrderID+'</p><span>'+datal[i].StatusText+'</span></div>');
		           		var ul = document.createElement("ul");
		           		for(var j = 0; j <datagoodl.length;j++){
		           			var li = document.createElement("li");
		           			var str = "";
		           			str = '<li><dl>'+
		           					'<dt><img src="'+datagoodl[j].PictureUrl+'"/></dt>'+
		           					'<dd>'+datagoodl[j].Name+'</dd>'+
		           					'<dd>数量:&nbsp;<span>'+datagoodl[j].Quantity+'</span></dd>'+
		           					'<dd>价格:&nbsp;<span class="price">￥'+datagoodl[j].SellPrice+'</span></dd>'+
		           					'</dl></li>';
		           			$(ul).append(str);
		           		}
		           		$(box).append(ul);
		           		$("#list").append(box);
					}
				}
			}else{
				alert(data.Message);
			}
		});
	}
});
