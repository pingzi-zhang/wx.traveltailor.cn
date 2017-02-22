$(function(){
	hotelList();
	function hotelList(){
	
		$(".specialty_filter").on('click','span',function(){
			var ml=$('body')[0].querySelector('.mask-layer');
	        if(!ml){
	            var dom = document.createElement('div');
	            dom.setAttribute('class','mask-layer');
	            $('body')[0].appendChild(dom);
	        }else{
	        	$(ml).show();
	        }
		    $(this).addClass('bianse').siblings().removeClass('bianse')
			var idx=$(this).index()
			
			// 排序 
				if(idx==0){
					$(".whole").css({
						'height':'15.2rem',
						'-webkit-transition':'height 0.5s'
					}).siblings(".foo").css({
						'height':'0',
						'-webkit-transition':'height 0s'
					})

				}
			
			//品牌
				if(idx==1){
					$(".order").css({
						'height':'17rem',
						'-webkit-transition':'height 0.5s'
					}).siblings(".foo").css({
						'height':'0',
						'-webkit-transition':'height 0s'
					})
				}
				
		
		})

		


		$(".foo li").on("click",function(){
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			})
			$(".fod_filter span").removeClass('bianse');
			$(".mask-layer").hide();
		})

		$(".screen button").on("click",function(){
			$(".foo").css({
				'height':'0',
				'-webkit-transition':'height 0.4s'
			})
			$(".fod_filter span").removeClass('bianse');
			$(".mask-layer").hide();
		})
	
	}

	var data='';
	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"VarietyID":"",
	       	"Skip":"0",
	       	"Take":"5"
	    };
	   console.log(arrActionParam)
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public2('Index_GetNativePage'),function (e) {
		if(e.Result!=1){
			console.log(e.Message);
			return false;
		}
		$(".loadbox").hide();
		data=e;
		beaufood();
	});

	function beaufood(){
		//设置公共的data
		var cate=data.List;
		//一进入页面就渲染全部
		priceone();

		function priceone(){
			var str='';
			$.each(cate,function(key,val){
				str+='<div door_id="'+val.TailorID+'"><dl>'+
					'<dt><img src="'+val.PictureUrl+'" ></dt><dd>'+
					'<h4>'+val.ProductName+'</h4>'+
					'<p>'+val.VariName+'</p>'+
					'<p class="speprice"><span>￥'+val.SellPrice+'/</span>'+val.Unit+'</p>'+
					'</dd></dl></div>';
			})
			$('.specialty_list').html(str);
		}
		/*点击全部排序*/
		$(".whole li").on("click",function(){
			var tit=$(this).attr('data-tit');
			//不限
			if(tit==1){
				priceone();
			}
			//水果 自助餐 零食 其他
			function public2(strActionName,arrActionParam){
			    var arrActionParam = {
				    "VarietyID":tit,
			       	"Skip":"0",
			       	"Take":"3"
			    };
		    	var strActionName = strActionName;
			    var strActionParam = JSON.stringify(arrActionParam);
			    var strRequest = GetVisitData(strActionName, strActionParam);
			    var datSubmit = { strRequest: strRequest };
			    return datSubmit;
		    }

			imgUpload.method(public2('Index_GetNativePage'),function (e) {
				data=e;
				var cate=data.List;
				var str='';
				$.each(cate,function(key,val){
					str+='<div door_id="'+val.TailorID+'"><dl>'+
						'<dt><img src="'+val.PictureUrl+'" ></dt><dd>'+
						'<h4>'+val.ProductName+'</h4>'+
						'<p>'+val.VariName+'</p>'+
						'<p class="speprice"><span>￥'+val.SellPrice+'/</span>'+val.Unit+'</p>'+
						'</dd></dl></div>';
				})
				$('.specialty_list').html(str);
				
			});
			
		})

		


	}

	//跳转到详情页
	$('.specialty_list').on('click','div',function(){
		var door_id = $(this).attr('door_id');
		location.href = 'bulterHome.html?'+'bulter_id='+door_id;
	})

})