$(function(){
	//获取地址栏参数
	function getUrlParam(){
        var url = decodeURI(location.search);
        var str = url.substr(1);
        var arr = str.split('&');
        var obj={};
        arr.forEach(function(v,i){
            var arr2 = v.split('=');
            obj[arr2[0]] = arr2[1];
        });
     
        return obj;
   	}
   	var bulterurlhomr=getUrlParam();
   	var urlbulterhome=bulterurlhomr.bulter_id;

   
	//调用渲染填写页面
	setTimeout(function(){
		rendershop();
	},100)
	
	//定义全局使用购物车数据
	var odatal='';

   	//如果未登录就短信验证
   	if(window.localStorage.MemberID){
		jsgMemberID=window.localStorage.MemberID;
   	}else{
   		jsgMemberID="";
   	}
    if(jsgMemberID==""){

    }else{
    	//获取联系人以及电话
	   	function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"TravelerID":jsgMemberID
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	  	}
		imgUpload.method(public2('My_GetTravelerInfo'),function (data) {
			var datam=data.Model;
			var str='';
	        str+='<li><span>联系人：</span><input type="text" value="'+datam.Name+'" class="contacts"></li>'+
	            '<li><span>手机号码：</span><input type="text" value="'+datam.Mobile+'" class="conmobile"></li>'+
	            '<li class="Receipt_address"><span>收货地址：</span><input id="demo1" type="text" readonly="" placeholder="请选择城市"  value="广东省,深圳市,南山区"/><input id="value1" type="hidden" value="20,234,504"/></li>'+
	            '<li class="detailed_address"><span>详细地址：</span><input type="text" value="" class="detailad"></li>';
	        $(".message").html(str);
		});

    }
	//获取当前时间并赋值给出行时间
	var mydate = new Date();
	var strdate = "" + mydate.getFullYear() + "-";
	strdate += (mydate.getMonth()+1) + "-";
	strdate += mydate.getDate();

	function rendershop(){
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"MemberID":mineuser,
		       	"TailorID":urlbulterhome,
		       	"UnionID":window.localStorage.UnionID
		    };
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	    }

		imgUpload.method(public2('Index_GetCartList'),function (data) {
			odatal=data.List;
			var str="";
			var varienty='';
			for(var i in odatal){
				//门票
				if(odatal[i].Variety == "01"){
					varienty="门票";
					$(".Receipt_address").css("display","none");
					$(".detailed_address").css("display","none");
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div><div class="choosedate"><span class="fl">出行时间</span> <input type="text"  id="out_date'+i+'" name="USER_AGE"  readonly class="USER_AGE" value="'+strdate+'" /></div></li>';
				}else if(odatal[i].Variety == "02"){
					varienty="特产";
					$(".Receipt_address").css("display","block");
					$(".detailed_address").css("display","block");
			
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div></li>';
				}else if(odatal[i].Variety == "08"){
					varienty="美食";
					$(".Receipt_address").css("display","none");
					$(".detailed_address").css("display","none");
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div></li>';
				}
			
				
			}
			$(".loadbox").hide();
			$('.shops').html(str);
			setTotal();

			
		})
	}
	//计算当前时间
	function show(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "-";
	   str += (mydate.getMonth()+1) + "-";
	   str += mydate.getDate() + "-";
	   return str;
	}

	//延迟调用日期插件和地区插件
	setTimeout(function(){
		//日期插件
	    var currYear = (new Date()).getFullYear();
	    var currMonth = (new Date()).getMonth();
	    var currDate = (new Date()).getDate();
		var opt={};
		opt.date = {preset : 'date'};
		opt.datetime = {preset : 'datetime'};
		opt.time = {preset : 'time'};
		opt.default = {
		    theme: 'android-ics light', //皮肤样式
		    display: 'modal', //显示方式 
		    mode: 'scroller', //日期选择模式
		    dateFormat: 'yyyy-mm-dd',
		    lang: 'zh',
		    showNow: true,
		    nowText: "今天",
		    startYear: currYear, //开始年份
		    endYear: currYear, //结束年份
		    minDate: new Date(),
		    maxDate: new Date(currYear, currMonth, currDate + 30)
		};
		$(".USER_AGE").mobiscroll($.extend(opt['date'], opt['default']));

		$(".USER_AGE").change(function(){
	        var usernum=$(this).val();
	        var start=new Date(usernum.replace("-", "/").replace("-", "/"));  
	        var end=new Date(show().replace("-", "/").replace("-", "/"));
	        if(end>start){ 
	            alert("出游日期不正确");
	            $(this).val("");
	            return false;  
	        }
	    });

		//地区插件
		var area1 = new LArea();
	    area1.init({
	        'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
	        'valueTo': '#value1', //选择完毕后id属性输出到该位置
	        'keys': {
	            id: 'id',
	            name: 'name'
	        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
	        'type': 1, //数据源类型
	        'data': LAreaData //数据源
	    });
	    area1.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value

	},1000);


	//获取当前时间
	function show(){
       var mydate = new Date();
       var str = "" + mydate.getFullYear() + "-";
       str += (mydate.getMonth()+1) + "-";
       str += mydate.getDate();
       return str;
    }
	
	//计算购物车总金额，显示在页面
	function setTotal(){ 
	    var totelm=0; 
		var totelnum=0;
	    $(".shops li").each(function(){ 
			totelm+=$(this).find('span[class*=quan_num]').text()*$(this).find('span[class*=order_price]').text();
	    }); 
	    $(".payprice").text(totelm);
    }

	var date1=0; 
	$(".shops li").each(function(){ 
		date1+=$(this).find('input[class*=input]').text();
	});

	//点击立即支付
	$("#pay_immediately").on("click",function(){
		//判断游客是否已登录
		var strMemberID="";
		if(window.localStorage.MemberID) strMemberID=GetString(window.localStorage.MemberID);//strMemberID=GetString(window.localStorage.MemberID)

		var contacts=$(".contacts").val();
		var conmobile=$(".conmobile").val();
		var mobileReg =/^1[34578]\d{9}$/;
		if(contacts == ''){
			alert('请填写联系人');
			return false;
		} 
		if(conmobile==''){
			alert("请填写手机号");
			return false;
		}
		if(!mobileReg.test(conmobile)){
			alert("请输入正确的手机号");
			return false;
		}
		//地区地址
		var strAddress=$("#demo1").val();
    		strAddress+=$(".detailad").val();
        var strAddress1 = strAddress.replace(/\,/g,"");
    	if(GetString(strAddress1)==""){
    		alert("请选择地址");
    		return false;
    	}
    	//短信验证码
    	var strSmsCode=$(".codenum").val();
    	if(GetString(strSmsCode)==""){
    		strSmsCode=""; 
    		/*if(strMemberID==""){
    			alert("短信验证码为空，请录入！");
    			return false;
    		}*/
    	}
    	$(".loadbox").show();
		var strGoodsList="[",strChild="";
		for(var i=0;i<odatal.length;i++){
			var dtPlayDate = $("#out_date"+i).val();
			if(dtPlayDate + "$" == "$" || dtPlayDate + "$" == "null$" || dtPlayDate + "$" == "undefined$"){
				dtPlayDate = '1900-01-01';
			}
			if(strGoodsList!="[")  strGoodsList+=",";
			strChild = "{";
			strChild += "\"" + "GoodsSellID" + "\"";
			strChild += ":\"" + odatal[i].SellID + "\"";
			strChild += ",\"" + "GoodsProductID" + "\"";
			strChild += ":\"" + odatal[i].ProductID + "\"";
			strChild += ",\"" + "GoodsThirdCode" + "\"";
			strChild += ":\"" + "\"";
			strChild += ",\"" + "GoodsVariety01ID" + "\"";
			strChild += ":\"" + odatal[i].Variety + "\"";
			strChild += ",\"" + "GoodsQuantity" + "\"";
			strChild += ":\"" + odatal[i].Quantity + "\"";
			strChild += ",\"" + "GoodsLinkman" + "\"";
			strChild += ":\"" + contacts + "\"";
			strChild += ",\"" + "GoodsLinkphone" + "\"";
			strChild += ":\"" + conmobile + "\"";
			strChild += ",\"" + "GoodsRegionID" + "\"";
			strChild += ":\"" + $("#demo1").val() +"\"";
			strChild += ",\"" + "GoodsAddress" + "\"";
			strChild += ":\"" + strAddress1+ "\"";
			strChild += ",\"" + "GoodsPlayDate" + "\"";
			strChild += ":\"" + dtPlayDate + "\"";
			strChild += ",\"" + "GoodsInDate" + "\"";
			strChild += ":\"" + "1900-01-01" + "\"";
			strChild += ",\"" + "GoodsOutDate" + "\"";
			strChild += ":\"" + "1900-01-01" + "\"";

			strChild += "}";
			strGoodsList +=strChild;
		}
		strGoodsList += "]";

		MsWxOrderform(urlbulterhome,strGoodsList,window.localStorage.UnionID,window.localStorage.OpenID,strMemberID,contacts,conmobile,"",strSmsCode,$("#demo1").val(),strAddress1,dtPlayDate);
		/*console.log("strTailorID"+urlbulterhome);
		console.log("UnionID"+window.localStorage.UnionID);
		console.log("OpenID"+window.localStorage.OpenID);
		console.log("strTravelerID"+strMemberID);
		console.log("strName"+contacts);
		console.log("strMobile"+conmobile);
		console.log("strIdentity"+"");
		console.log("strSmsCode"+strSmsCode);
		console.log("strRegionID"+$("#demo1").val());
		console.log("strAddress"+strAddress1);
		console.log("dtPlayDate"+dtPlayDate);
		console.log("strGoodsList"+strGoodsList);*/
	})

	
});