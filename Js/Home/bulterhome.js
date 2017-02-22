$(function(){
	//获取地址栏参数
	function getUrlParam(){
        var url=decodeURI(location.search);
        var str = url.substr(1);
        var arr = str.split('&');
        var obj={};
        arr.forEach(function(v,i){
            var arr2 = v.split('=');
            obj[arr2[0]] = arr2[1];
        })
     
        return obj;
   	}
   	var bulterurlhomr=getUrlParam();
   	var urlbulterhome=bulterurlhomr.bulter_id;
   	//定义总数
   	var gdatal;
   	//管家信息
   	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"TailorID":urlbulterhome
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public2('Index_GetTailor'),function (data) {
		$(".loadbox").hide();
		var datam=data.Model;
		var arr=datam.AlbumUrl.split(',')
		var sex = '';
		if(datam.Sex==0){
			sex = '女'
		}else{
			sex='男'
		}
		var str='';
		$.each(arr,function(i,val){
			str += '<div class="swiper-slide"><img src="'+val+'" /></div>'
		})
		//var str='<div class="swiper-slide"><img src="'+datam.AlbumUrl+'" /></div>';
		var str1='<h1>'+datam.Name+'</h1><p>'+
			'<span><img src="../../Images/Home/sex.jpg">'+sex+'</span>'+
			'<span><img src="../../Images/Home/geren.png">'+datam.Age+'岁</span>';
			if(datam.ServiceCity==""){
				str1+='<span><img src="../../Images/Home/dingwei.png">都江堰</span>';
			}else{
				str1+='<span><img src="../../Images/Home/dingwei.png">'+datam.ServiceCity+'</span>';
			}
			if(datam.Occupation==""){
				str1+='<span><img src="../../Images/Home/sign.png">旅行管家</span></p>';
			}else{
				str1+='<span><img src="../../Images/Home/sign.png">'+datam.Occupation+'</span></p>';
			}
			
			
		var str3='<p inone_id="'+datam.TailorID+'">'+datam.Introduce+'</p>';
		$('#bulterWrapper').html(str);
		$('.introduce1').html(str1);
		$('.content2').html(str3);
	});

	//调用购物车
	rendershop();
	//跳转到自我介绍详情页
	/*$('.content2').on('click','p',function(){
		var one_id = $(this).attr('inone_id');
		location.href = 'bulterDetail.html?'+'inone_id='+one_id;
	})*/

	//商品信息
	function public3(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"TailorID":urlbulterhome
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public3('Index_GetTailorSellList'),function (data) {
		if(data.Result!=1){alert(Message); return false;}
		var bulterList=data.List;
		var str='',str1='',str2='';		
	    if (data.Result != 1) {
	        alert(Message);
	        return false;
	    }
	   
		var bulterList=data.List;
		var str='',str1='',str2='';
		var variety='';
		for(var i in bulterList){
			//门票
			if(bulterList[i].Variety=='01'){
				$('.mptitle').show();
				variety="门票";
				str+='<li buhome_id="'+bulterList[i].ProductID+'">'+
					'<div class="info" buhome_id="'+bulterList[i].ProductID+'" bul_va="'+bulterList[i].Variety+'"><div class="havebox">'+
						'<div class="foodImg"><img src="'+bulterList[i].FirstUrl+'" ></div>'+
						'<div class="foodInfo">'+
							'<p>'+bulterList[i].Name+'</p>'+
							'<p>'+variety+'</p>'+
							'<p>￥<span class="price">'+bulterList[i].SellPrice+'</span>'+bulterList[i].PriceUnit+'</p></div></div>'+
						'<div class="foodPrice"><button class="jian" sell_id="'+bulterList[i].SellID+'">-</button><span class="num">0</span><button class="jia chu" sell_id="'+bulterList[i].SellID+'">+</button></div></div>'+
					'</li>';
				
			}

			//美食
			if(bulterList[i].Variety=='08'){
				$('.mstitle').show();
				//variety="套餐";
				str1+='<li buhome_id="'+bulterList[i].ProductID+'">'+
					'<div class="info" buhome_id="'+bulterList[i].ProductID+'" bul_va="'+bulterList[i].Variety+'"><div class="havebox">'+
						'<div class="foodImg"><img src="'+bulterList[i].FirstUrl+'" ></div>'+
						'<div class="foodInfo">'+
							'<p>'+bulterList[i].Name+'</p>'+
							'<p>'+bulterList[i].MercName+'</p>'+
							'<p>￥<span class="price">'+bulterList[i].SellPrice+'</span></p></div></div>'+
						'<div class="foodPrice"><button class="jian" sell_id="'+bulterList[i].SellID+'">-</button><span class="num">0</span><button class="jia chu" sell_id="'+bulterList[i].SellID+'">+</button></div></div>'+
					'</li>';
			}

			//特产
			if(bulterList[i].Variety=='02'){
				$('.tctitle').show();
				variety="特产";
				str2+='<li buhome_id="'+bulterList[i].ProductID+'">'+
					'<div class="info" buhome_id="'+bulterList[i].ProductID+'" bul_va="'+bulterList[i].Variety+'"><div class="havebox">'+
						'<div class="foodImg"><img src="'+bulterList[i].FirstUrl+'" ></div>'+
						'<div class="foodInfo">'+
							'<p>'+bulterList[i].Name+'</p>'+
							'<p>'+variety+'</p>'+
							'<p>￥<span class="price">'+bulterList[i].SellPrice+'</span>'+bulterList[i].PriceUnit+'</p></div></div>'+
						'<div class="foodPrice"><button class="jian" sell_id="'+bulterList[i].SellID+'">-</button><span class="num">0</span><button class="jia chu" sell_id="'+bulterList[i].SellID+'">+</button></div></div>'+
					'</li>';
			}

		}

		$("#Admission_ticket").html(str);
		$('#Delicious_food').html(str1);
		$('#Specialty').html(str2);

		//将购物车的数量和页面对应起来
		var $li = $(".fod_list li");
		for(var i = 0; i < $li.length;i++){
			for(var j = 0;j< pro_arr.length;j++){
				if (pro_arr[j] == $li.eq(i).attr("buhome_id")) {
					$(".fod_list li").eq(i).find(".jian").show();
					$(".fod_list li").eq(i).find(".num").show();
					$(".fod_list li").eq(i).find(".num").text(pro_num[j])
					break;
				}
			}
		}
	});

	//点击加入购物车
	var jiajiannum='';
	var sellid='';
	//点击加入购物车
	$(".bulter_content").on("click",".jia",function(e){
		e.preventDefault();
		var totleprice = Number($(".lump").html());
		$(this).parent().find('span').show();
		$(this).parent().find('button').show();
		var totalqu=$(this).prev().text();
		totalqu++;
		$(this).prev().text(totalqu);
					
	    var qian = $(this).parents(".info").find(".price").text()*1;
	   
		totleprice=(totleprice+qian).toFixed(2);
		$(".lump").text(totleprice);
		//console.log(totleprice)
		jiajiannum=$(this).prev().text();
		sellid=$(this).attr('sell_id');
		jiajiangou();
	})
	//点击减去购物车
	$(".bulter_content").on("click",".jian",function(e){
		e.preventDefault();
		var totleprice = Number($(".lump").html()).toFixed(2);
		var totalqu=$(this).next().text();
		totalqu--;
		if(totalqu==0){
			$(this).hide();
			$(this).next().hide();
			$(this).next().text(0)
		}else{
			$(this).next().text(totalqu)
		}			
	    var qian = Number($(this).parents(".info").find(".price").text()*1).toFixed(2);
 		totleprice=Number(totleprice-qian).toFixed(2);
		$(".lump").text(totleprice);
		jiajiannum=$(this).next().text();
		sellid=$(this).attr('sell_id');
		jiajiangou();
	});
	//加减进入购物车
	function jiajiangou(){
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"MemberID":mineuser,
		       	"TailorID":urlbulterhome,
		       	"SellID":sellid,
		       	"Quantity":jiajiannum,
		       	"UnionID":unid
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	    }

		imgUpload.method(public2('Index_UpdateCart'),function (data) {
			if(data.Result!=1){
				alert(data.Message);
				return false;
			}
		})
	}


	var pro_arr=[];
	var pro_num=[];
	
	//点击显示购物车
	/*$(".bulter_fbu").on('click',function(){
		rendershop();
		$(".mask-layer").toggle();
		$(".bulter_buy").toggle();
	})*/

	//计算购物车总金额，显示在页面
	function setTotal(){ 
	    var totelm=0; 
	    $(".buy_cont div").each(function(){ 
			totelm+=$(this).find('span[class*=num]').text()*$(this).find('span[class*=price]').text();
	    }); 
		
	    $(".lump").text(totelm);
    } 
	//渲染购物车
	function rendershop(){
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"MemberID":mineuser,
		       	"TailorID":urlbulterhome,
		       	"UnionID":unid
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	    }

		imgUpload.method(public2('Index_GetCartList'),function (data) {
			gdatal=data.List;
			
			if(gdatal==""){
				$(".mask-layer").hide();
				$(".bulter_buy").hide();
				$(".lump").text("0");
			}else{
				var str='';
				for(var i in gdatal){
					pro_arr.push(gdatal[i].ProductID);
					pro_num.push(gdatal[i].Quantity);
					str+='<div class="buy_info"><div class="foodImg"><img src="'+gdatal[i].First+'" ></div>'+
						'<div class="foodInfo">'+
							'<p>'+gdatal[i].ProdName+'</p>'+
							'<p>门票</p>'+
							'<p>￥<span class="price">'+gdatal[i].Price+'</span>/人</p>'+
						'</div>'+
						'<div class="foodPrice"><button class="jian" sell_id="'+gdatal[i].SellID+'">-</button><span class="num">'+gdatal[i].Quantity+'</span><button class="jia chu" sell_id="'+gdatal[i].SellID+'">+</button></div></div>';
						/*'<div class="foodPrice">'+
							'<span class="jian" sell_id="'+gdatal[i].SellID+'">-</span>'+
							'<span class="num">'+gdatal[i].Quantity+'</span>'+
							'<span class="jia chu" sell_id="'+gdatal[i].SellID+'">+</span>'+
						'</div></div>';*/
				}
				$(".buy_cont").html(str);
				setTotal();

				
			}
			
		})
	}


	//点击遮罩隐藏
	$(".mask-layer").on("click",function(){
		$(".mask-layer").hide();
		$(".bulter_buy").hide();
	});

	//清空购物车
	$(".bulter_q").on("click",function(){
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"MemberID":mineuser,
		       	"TailorID":urlbulterhome,
		       	"UnionID":unid

		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	    }

		imgUpload.method(public2('Index_EmptyCart'),function (data) {
			console.log(data)
			$(".mask-layer").hide();
			$(".bulter_buy").hide();
			$(".lump").html('0');
			$(".fod_list li .num").text('0');
			$(".fod_list li .jian").hide();
			$(".fod_list li .num").hide();
			$(".fod_list li .jia").addClass('chu')
		})
	});
	
	//点击去结算
	$(".goplay").on("click",function(){
		
		/*if(gdatal==''){
			alert("请选择您要购买的商品")
		}else{
			location.href='../Orderform/orderWrite.html?'+'bulter_id='+urlbulterhome;
		}*/
		location.href='../Orderform/orderWrite.html?'+'bulter_id='+urlbulterhome;
		//location.href='../MinShenwx.html?'+'bulter_id='+urlbulterhome;
		
	});

	
	//跳转到详情页
    $('.fod_list').on('click','.havebox',function(){
        var bh_id = $(this).parent().attr('buhome_id');
        var bu_va=$(this).parent().attr('bul_va');
        location.href = 'foodDetail.html?buhome_id='+bh_id+'&bulva='+bu_va;
    });
    

});