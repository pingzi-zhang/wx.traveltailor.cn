$(function(){
	//定义下滑加载，总数，每次加载数
	var doortotal;
	var door_count=5;
	var pagesize=3;
	var fal=true;
	//调用筛选
	hotelList();
	function hotelList(){
		/*点击实现排序下拉*/
		$(".fod_filter").on('click','span',function(){
			var ml=$('body')[0].querySelector('.mask-layer');
	        if(!ml){
	            var dom = document.createElement('div');
	            dom.setAttribute('class','mask-layer');
	            $('body')[0].appendChild(dom);
	        }else{
	        	$(ml).show();
	        }
		    $(this).addClass('bianse').siblings().removeClass('bianse');
			var idx=$(this).index();
			
			// 全部 
				if(idx==0){
					$(".whole").css({
						'height':'15.2rem',
						'-webkit-transition':'height 0.5s'
					}).siblings(".foo").css({
						'height':'0',
						'-webkit-transition':'height 0s'
					})

				};
			//筛选
				if(idx==1){
					$(".screen").css({
						'height':'20rem',
						'-webkit-transition':'height 0.5s'
					}).siblings(".foo").css({
						'height':'0',
						'-webkit-transition':'height 0s'
					})

				};
		
		});

		/*点击选项实现排序*/
		$(".foo li").on("click",function(){
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			});
			$(".fod_filter span").removeClass('bianse');
			$(".mask-layer").hide();
		});

		/*点击全部排序*/
		$(".whole li").on("click",function(){
			var tit=$(this).attr('data-tit');
			//不限
			if(tit==4){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"0801",
				       	"MinNum":"-99",
				       	"MaxNum":"-99",
				       	"Meal":"",
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}
			//桌餐
			if(tit==1){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"0801",
				       	"MinNum":"-99",
				       	"MaxNum":"-99",
				       	"Meal":"",
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}
			//自助餐
			if(tit==2){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"0802",
				       	"MinNum":"-99",
				       	"MaxNum":"-99",
				       	"Meal":"",
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}
		});

		/*点击实现筛选*/
		var tit1="",tit2="";
		$(".screen .eatnum1 p").on("click",function(){
			$(this).addClass("foodcheckcolor").siblings().removeClass("foodcheckcolor")
			tit1=$(this).attr('stars');
		});
		$(".screen .eatnum2 p").on("click",function(){
			$(this).addClass("foodcheckcolor").siblings().removeClass("foodcheckcolor")
			tit2=$(this).attr('stars');
		});
		//点击确定按钮实现的筛选
		$(".screen .foodconfirm").on("click",function(){
			if(tit2==4){
				tit2="";
			}
			if(tit1==4 || tit2==4){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"-99",
				       	"MaxNum":"-99",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}
			if(tit1=="单人餐"){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"1",
				       	"MaxNum":"1",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					console.log(e)
					data=e;
					beaufood();
				});
			}
			if(tit1=="双人餐"){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"2",
				       	"MaxNum":"2",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };

			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}

			if(tit1=="3-4人餐"){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"3",
				       	"MaxNum":"4",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };

			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}

			if(tit1=="5-10人餐"){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"5",
				       	"MaxNum":"10",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };

			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}

			if(tit1=="10人以上"){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"VarietyID":"",
				       	"MinNum":"10",
				       	"MaxNum":"-99",
				       	"Meal":	tit2,
				       	"Skip":"0",
				       	"Take":"10"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetFoodPage'),function (e) {
					data=e;
					beaufood();
				});
			}

			function public2(strActionName,arrActionParam){
			    var arrActionParam = {
				    "VarietyID":"",
				    "MinNum":"-99",
				    "MaxNum":"-99",
				    "Meal":	tit2,
				    "Skip":"0",
				    "Take":"10"
				};
				
			    var strActionName = strActionName;
				var strActionParam = JSON.stringify(arrActionParam);
				var strRequest = GetVisitData(strActionName, strActionParam);
				var datSubmit = { strRequest: strRequest };
				return datSubmit;
			}

			imgUpload.method(public2('Index_GetFoodPage'),function (e) {
				data=e;
				beaufood();
			});
			//点击回去
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			});
			$(".fod_filter span").removeClass('bianse');
			$(".mask-layer").hide();
		});

		//点击重置按钮
		$(".screen .foodreset").on("click",function(){
			$(".limit1").addClass("foodcheckcolor").siblings().removeClass("foodcheckcolor");
			$(".limit2").addClass("foodcheckcolor").siblings().removeClass("foodcheckcolor");
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			});
			$(".mask-layer").hide();

			function public2(strActionName,arrActionParam){
				var arrActionParam = {
					"VarietyID":"",
					"MinNum":"-99",
					"MaxNum":"-99",
					"Meal":"",
					"Skip":"0",
					"Take":"10"
				};
				var strActionName = strActionName;
				var strActionParam = JSON.stringify(arrActionParam);
				var strRequest = GetVisitData(strActionName, strActionParam);
				var datSubmit = { strRequest: strRequest };
				return datSubmit;
			}

			imgUpload.method(public2('Index_GetFoodPage'),function (e) {
				data=e;
				beaufood();
			});


		});	
	
	}

	//开始进行渲染
	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"VarietyID":"",
	       	"MinNum":"-99",
	       	"MaxNum":"-99",
	       	"Meal":"",
	       	"Skip":"0",
	       	"Take":"8"
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public2('Index_GetFoodPage'),function (e) {
		data=e;
		console.log(data)
		if(data.Result!=1){
			alert(data.Message);
			return false;
		}
		$(".loadbox").hide();
		doortotal=data.Totel;
		beaufood();
	});
	//封装渲染
	function beaufood(){
		//设置公共的data
		var cate=data.List;
		//一进入页面就渲染全部
		beautifulone();
		function beautifulone(){
			var str='';
			$.each(cate,function(key,val){
				str+='<li door_id="'+val.TailorID+'">'+
					'<div class="info"><div class="foodImg"><img src="'+val.PictureUrl+'" ></div>'+
					'<div class="foodInfo">'+
					'<p>'+val.ProductName+'</p>'+
					'<p>'+val.MercName+'</p>'+
					'<p>'+val.Address+'</p></div>'+
					'<div class="foodPrice">￥'+val.SellPrice+'<span></span></div>'+
				'</div></li>';
			});
			$('.fod_list').html(str);
		}
		
	}


	//下滑加载
	var scrollHeight = $(document).height();
	$(".foodcontent").bind("scroll",function () {
		var scrollTop= $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if (Math.floor(scrollTop + windowHeight) >= scrollHeight) {
			if(fal==true){
				pullDownUpData();
			}
		}
	});
	function pullDownUpData() {
		door_count=door_count+3;
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"VarietyID":"",
		       	"MinNum":"-99",
		       	"MaxNum":"-99",
		       	"Meal":"",
		       	"Skip":door_count,
		       	"Take":pagesize
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
    	}

    	imgUpload.method(public2('Index_GetFoodPage'),function (data) {
			var cate=data.List;
		   	if(data.Message=="成功获取！"){
				if(door_count>=doortotal){
					fal=false;
				}else{
					fal=true;
				}

			}
		   	var str='';
		   	$.each(cate,function(key,val){
				str+='<li door_id="'+val.TailorID+'">'+
					'<div class="info"><div class="foodImg"><img src="'+val.PictureUrl+'" ></div>'+
					'<div class="foodInfo">'+
					'<p>'+val.ProductName+'</p>'+
					'<p>'+val.MercName+'</p>'+
					'<p>'+val.Address+'</p></div>'+
					'<div class="foodPrice">￥'+val.SellPrice+'<span></span></div>'+
				'</div></li>';
			});
			$('.fod_list').append(str);
		});

	}

	//跳转到详情页
	$('.fod_list').on('click','li',function(){
		var door_id = $(this).attr('door_id');
		location.href = 'bulterHome.html?'+'bulter_id='+door_id;
	});

});