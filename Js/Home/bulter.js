$(function(){

	var doortotal;
	var door_count=3;
	var pagesize=3;
	var fal=true;

	/*渲染城市*/
	/*function public2(strActionName,arrActionParam){
		var arrActionParam = {
			"Skip":"0",
			"Take":"10000"
		};
		var strActionName = strActionName;
		var strActionParam = JSON.stringify(arrActionParam);
		var strRequest = GetVisitData(strActionName, strActionParam);
		var datSubmit = { strRequest: strRequest };
		return datSubmit;
	}

	imgUpload.method(public2('Index_GetCityPage'),function (e) {
		var el=e.List;
		var str='';
		for(var i in el){
			str+='<li data-tit="'+el[i].CityID+'"><input type="radio" id="1" name="b"><label for="1"></label>'+el[i].CityName+'</li>';
		}
		$(".city ul").html(str)
		
	});*/
	/*渲染景区*/
	/*function public2(strActionName,arrActionParam){
		var arrActionParam = {
			"CityID":"",
			"Skip":"0",
			"Take":"10000"
		};
		var strActionName = strActionName;
		var strActionParam = JSON.stringify(arrActionParam);
		var strRequest = GetVisitData(strActionName, strActionParam);
		var datSubmit = { strRequest: strRequest };
		return datSubmit;
	}

	imgUpload.method(public2('Index_GetScenicPageCity'),function (e) {
		var el=e.List;
		var str='';
		for(var i in el){
			str+='<li data-tit="'+el[i].ScenicID+'"><input type="radio" id="1" name="b"><label for="1"></label>'+el[i].ScenicName+'</li>';
		}
		$(".scenery ul").html(str)
		
	});*/


	//hotelList();

	function hotelList(){
	
	$(".bult_filter").on('click','span',function(){

		var ml=$('body')[0].querySelector('.mask-layer');
        if(!ml){
            var dom = document.createElement('div');
            dom.setAttribute('class','mask-layer');
            $('body')[0].appendChild(dom);
        }else{
        	$(ml).show();
        }

	    $(this).addClass('bianse').siblings().removeClass('bianse')
		var idx=$(this).index();
		
		// 城市 
			if(idx==0){
				$(".city").css({
					'height':'15rem',
					'-webkit-transition':'height 0.5s'
				}).siblings(".foo").css({
					'height':'0',
					'-webkit-transition':'height 0s'
				})

			}
		//景区
			if(idx==1){
				$(".scenery").css({
					'height':'17rem',
					'-webkit-transition':'height 0.5s'
				}).siblings(".foo").css({
					'height':'0',
					'-webkit-transition':'height 0s'
				})
			}
		//年龄
			if(idx==2){
				$(".age").css({
					'height':'24rem',
					'-webkit-transition':'height 0.5s'
				}).siblings(".foo").css({
					'height':'0',
					'-webkit-transition':'height 0s'
				})
			}
		//性别
			if(idx==3){
				$(".sex").css({
					'height':'17rem',
					'-webkit-transition':'height 0.5s'
				}).siblings(".foo").css({
					'height':'0',
					'-webkit-transition':'height 0s'
				})
			}
	
		});

		//点击按城市排序
		$(".city").on("click","li",function(){
			var tit=$(this).attr('data-tit');
			//根据悬着城市渲染景区
			function public2(strActionName,arrActionParam){
				var arrActionParam = {
					"CityID":tit,
					"Skip":"0",
					"Take":"5"
				};
				var strActionName = strActionName;
				var strActionParam = JSON.stringify(arrActionParam);
				var strRequest = GetVisitData(strActionName, strActionParam);
				var datSubmit = { strRequest: strRequest };
				return datSubmit;
			}

			imgUpload.method(public2('Index_GetScenicPageCity'),function (e) {
				var el=e.List;
				var str='';
				for(var i in el){
					str+='<li data-tit="'+el[i].ScenicID+'"><input type="radio" id="1" name="b"><label for="1"></label>'+el[i].ScenicName+'</li>';
				}
				$(".scenery ul").html(str)
				
			});
			//根据城市进行渲染
			function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":tit,
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }
			imgUpload.method(public2('Index_GetTailorPage'),function (e) {
				data=e;
				bulter();
			});

		})
		//点击按景区排序
		$(".scenery").on("click","li",function(){
			var tit = $(this).attr("data-tit");
			function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":tit,
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

			imgUpload.method(public2('Index_GetTailorPage'),function (e) {
				data=e;
				bulter();
			});
			
		})

		//点击按照年龄排序
		$(".age li").on("click",function(){
			var tit = $(this).attr("data-tit");
			//不限
			if(tit==1){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			}

			//25岁以下
			if(tit==2){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":25,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			}
			//25-30
			if(tit==3){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":25,
				       	"MaxAge":30,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			}
			//30-35
			if(tit==4){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":30,
				       	"MaxAge":35,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			}
			//35岁以上
			if(tit==1){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":35,
				       	"MaxAge":-99,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			}

		})
		//点击按照性别排序
		$(".sex li").on('click',function(){
			var tit=$(this).attr("data-tit");
			//不限
			if(tit==1){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":-99,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			};

			//点击按照男排序
			if(tit==2){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":1,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			};


			//点击按照女排序
			if(tit==3){
				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"CityID":"",
				       	"ScenicID":"",
				       	"Occupation":"",
				       	"MinAge":0,
				       	"MaxAge":0,
				       	"Sex":0,
				       	"Skip":"0",
				       	"Take":"5"
				    };
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('Index_GetTailorPage'),function (e) {
					data=e;
					bulter();
				});
			};

		})


		$(".foo").on("click","li",function(){
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			})
			$(".bult_filter span").removeClass('bianse');
			$(".mask-layer").hide();
		});
		
		$("body").on("click",".mask-layer",function(){
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			})
			$(this).hide()
		})
	
	}

	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"CityID":"",
	       	"ScenicID":"",
	       	"Occupation":"",
	       	"MinAge":0,
	       	"MaxAge":0,
	       	"Sex":-99,
	       	"Skip":"0",
	       	"Take":"20"
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public2('Index_GetTailorPage'),function (e) {
		data=e;
		$(".loadbox").hide();
		doortotal=data.Totel;
		//console.log(doortotal)
		bulter();
	});


	function bulter(){
		//设置公共的data
		var bate=data.List;
		//一进入页面就渲染全部
		beautifulone();

		function beautifulone(){
			var str='';
			$.each(bate,function(key,val){
				if(val.Sex==0){
		   			sex='女';
		   		}else{
		   			sex='男';
		   		}

		   		str+='<li bul_id="'+val.TailorID+'"><img src="'+val.IndexUrl+'" >'+
						'<p>'+val.Inaword+'</p>'+
						'<p><span>'+val.Name+'</span>/<span>'+val.CityName+'</span>·<span>'+val.Age+'岁</span>·<span>'+sex+'</span>·<span>'+val.Occupation+'</span></p>'+
					'</li>';
			});
			$('.selling').html(str);
		}
		
	}



	//下滑加载

	/*var scrollHeight = $(document).height();
	$(window).bind("scroll",function () {
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
		//fal=false;
		door_count=door_count+3;


		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"CityID":"",
		       	"ScenicID":"",
		       	"Occupation":"",
		       	"MinAge":0,
		       	"MaxAge":0,
		       	"Sex":2,
		       	"Skip":door_count,
		       	"Take":pagesize
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
    	}

    	imgUpload.method(public2('Index_GetTailorPage'),function (data) {
			var bulterlist=data.List;
		   
		   	if(data.Message=="成功获取！"){
				if(door_count>=doortotal){
					fal=false;
				}else{
					fal=true;
				}

			}
		   	var str='';
		   	var sex='';
		   	for(var i in bulterlist){
		   		if(bulterlist[i].Sex==0){
		   			sex='女';
		   		}else{
		   			sex='男';
		   		}

		   		str+='<li bul_id="'+bulterlist[i].TailorID+'"><img src="'+bulterlist[i].IndexUrl+'" >'+
						'<p>'+bulterlist[i].Inaword+'</p>'+
						'<p><span>'+bulterlist[i].Name+'</span>/<span>'+bulterlist[i].CityName+'</span>·<span>'+bulterlist[i].Age+'岁</span>·<span>'+sex+'</span>·<span>'+bulterlist[i].Occupation+'</span></p>'+
					'</li>';
		   	}
		  $('.selling').append(str);
		});

	}*/

	 //跳转到详情页
    $('.selling').on('click','li',function(){
        var b_id = $(this).attr('bul_id');
        location.href = 'bulterHome.html?'+'bulter_id='+b_id;
    });
    
})