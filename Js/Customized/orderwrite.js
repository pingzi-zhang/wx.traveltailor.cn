$(function(){
	
	$(":input").on('focus',function(){
		var $wind=$(window).height();
		var $foot=$(".footer").height();
		var C_content=$(".C_content").height();
		var $mag=$wind-$foot-C_content;
		//$(".footer").css({"position":"static","margin-top":$mag})
		$(".footer").css({"position":"static","margin-top":$mag})
	})
	$(":input").blur(function(){
		$(".footer").css("position","absolute")
	})
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
            '<li><span>手机号码：</span><input type="text" value="'+datam.Mobile+'" class="conmobile"></li>';

        $(".message").html(str);
	});
	var odatal='';
	//var keysArr=[];
	function getUrlParam(){
        var url=decodeURI(location.search);
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
   	rendershop();
   	//如果未登录就短信验证
   	if(window.localStorage.MemberID){
		jsgMemberID=window.localStorage.MemberID;
   	}else{
   		jsgMemberID="";
   	}
   	
    if(jsgMemberID==""){
        $(".Verification").show();
        $(".daojishi").on("click",function(){
            function public2(strActionName,arrActionParam){
                var arrActionParam = {
                    "Way":0,
                    "Mobile": $(".conmobile").val()
                };
                var strActionName = strActionName;
                var strActionParam = JSON.stringify(arrActionParam);
                var strRequest = GetVisitData(strActionName, strActionParam);
                var datSubmit = { strRequest: strRequest };
                return datSubmit;
            }

            imgUpload.method(public2('Com_SendSmsCode'),function (data) {
               	
                if(data.Result!=1){
                    alert(data.Message);
                    return false;
                }else if(data.Result==1){
                    $(".daojishi").addClass("on");
                    settime($(".daojishi").get(0));
                }
            })

        });
    }
    var countdown=60; 
    function settime(obj) { 
        if (countdown == 0) { 
            obj.removeAttribute("disabled");    
            obj.value="免费获取验证码"; 
            countdown = 60; 
            return;
        } else { 
            obj.setAttribute("disabled", true); 
            $(".daojishi").removeClass("on");
            obj.value="重新发送(" + countdown + ")"; 
            countdown--; 
        } 
      setTimeout(function() { 
        settime(obj) }
        ,1000) 
    }
	
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
			console.log(arrActionParam)
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
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div><div class="choosedate"><span class="fl">出行时间</span> <input type="text"  id="out_date'+i+'" name="USER_AGE"  readonly class="USER_AGE" value="'+strdate+'" /></div></li>';
				}else if(odatal[i].Variety == "02"){
					varienty="特产"
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div></li>';
				}else if(odatal[i].Variety == "08"){
					varienty="美食"
					str+='<li><img src="'+odatal[i].First+'">'+
	                	'<div class="shops-detail">'+
	                    '<p>'+odatal[i].ProdName+'</p>'+
	                    '<p>'+varienty+'</p>'+
	                    '<p>￥<span class="order_price">'+odatal[i].Price+'</span>/人</p></div>'+
	                	'<p class="order_num"><span class="quan_num">'+odatal[i].Quantity+'</p>'+
	                	'</div></li>';
				}
			
				
			}
			
			$('.shops').html(str);
			setTotal();

			
		})
	}

	function show(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "-";
	   str += (mydate.getMonth()+1) + "-";
	   str += mydate.getDate() + "-";
	   return str;
	}

	setTimeout(function(){
		var currYear = (new Date()).getFullYear();
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
			startYear: currYear - 50, //开始年份
			endYear: currYear + 10 //结束年份
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
	    })

	},1000);

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
	
	var jsdNewOrderform = $.Deferred();
	function NewOrderform(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList){
	
		var strUnionID="";
		if(window.localStorage.UnionID) strUnionID=window.localStorage.UnionID;
		if(GetString(strUnionID)==""){
			alert("NewOrderform：strUnionID为空!");
			return false;
		}
		var strOpenID="";
		if(window.localStorage.OpenID) strOpenID=window.localStorage.OpenID;
		if(GetString(strOpenID)==""){
			alert("NewOrderform：strOpenID为空!");
			return false;
		}
		var arrParam={	"TailorID": strTailorID,"TravelerID":strTravelerID,"Name":strName,"Mobile": strMobile,"Identity": strIdentity,"SmsCode":strSmsCode,"UnionID":strUnionID,"OpenID":strOpenID,"GoodsList":stjGoodsList};
    	var strParam = JSON.stringify(arrParam);
    	jsgSubmit = "strRequest=" + GetVisitData("Index_CreateOrder", strParam);
		$.ajax({
	        type: "POST",
	        url: jsgDataServer + jsgDataVisit,
	        dataType : "json",
	        data: jsgSubmit,
	        timeout: 20000,
	        beforeSend: function () {
	        	
	        },
	        success: function (objResult) {
	        	if(objResult.Result==1){
	                jsdNewOrderform.resolve(objResult.Model);
	                return jsdNewOrderform.promise();
	        	}else{
	        		alert("NewOrderform：返回值：" + objResult.Result + "，错误：" + objResult.Message);
	        		//$(".loadbox").css("display", "none");
	        	}
	        },
	        complete: function (XMLHttpRequest, textStatus) {
	        	
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            alert(XMLHttpRequest.status);
	            alert(XMLHttpRequest.readyState);
	            alert(textStatus);
	            alert(errorThrown);
	        }
	   });
	}

	//点击立即支付
	$("#pay_immediately").on("click",function(){

		var contacts=$(".contacts").val();
		var conmobile=$(".conmobile").val();
		var mobileReg =/^1[34578]\d{9}$/;
		if(contacts == ''){
			alert('请填写联系人');
			return false;
		}else if(conmobile==''){
			alert("请填写手机号");
			return false;
		}else if(!mobileReg.test(conmobile)){
			alert("请输入正确的手机号");
			return false;
		}else{
			//$(".loadbox").css("display", "block");
/*			var keysArr=[];
			keysArr.splice(0,keysArr.length);
			for(var i in odatal){
				
				var dtPlayDate = $("#out_date"+i).val();
				if(dtPlayDate + "$" == "$" || dtPlayDate + "$" == "null$" || dtPlayDate + "$" == "undefined$"){
					dtPlayDate = '1900-01-01';
				}
              	keysArr.push({
              		"SellID":odatal[i].SellID,
              		"ProductID":odatal[i].ProductID,
              		"ThirdCode":"",
              		"Quantity":odatal[i].Quantity,
              		"Linkman":contacts,
              		"Linkphone":conmobile,
              		"Region":"",
              		"Address":"",
              		"PlayDate":dtPlayDate,
              		"InDate":"1900-01-01",
              		"OutDate":"1900-01-01",
              		"Identity":""
              	})
			}
			var obj = keysArr;*/
			var strGoodsList="[",strChild="";
			for(var i=0;i<odatal.length;i++){
				if(strGoodsList!="[")  strGoodsList+=",";
				strChild = "{";
				strChild += "\"" + "SellID" + "\"";
				strChild += ":\"" + odatal[i].SellID + "\"";
				strChild += ",\"" + "ProductID" + "\"";
				strChild += ":\"" + odatal[i].ProductID + "\"";
				strChild += ",\"" + "ThirdCode" + "\"";
				strChild += ":\"" + "", + "\"";
				strChild += ",\"" + "Quantity" + "\"";
				strChild += ":\"" + odatal[i].Quantity + "\"";
				strChild += ",\"" + "Linkman" + "\"";
				strChild += ":\"" + contacts + "\"";
				trChild += ",\"" + "Linkphone" + "\"";
				strChild += ":\"" + conmobile + "\"";
				trChild += ",\"" + "Region" + "\"";
				strChild += ":\"" + "" + "\"";
				trChild += ",\"" + "Address" + "\"";
				strChild += ":\"" + "" + "\"";
				trChild += ",\"" + "PlayDate" + "\"";
				strChild += ":\"" + dtPlayDate + "\"";
				trChild += ",\"" + "InDate" + "\"";
				strChild += ":\"" + "1900-01-01" + "\"";
				trChild += ",\"" + "OutDate" + "\"";
				strChild += ":\"" + "1900-01-01" + "\"";
				trChild += ",\"" + "Identity" + "\"";
				strChild += ":\"" + "" + "\"";

				strChild += "}";
 				strGoodsList +=strChild;
			}
			strGoodsList += "]";
			alert(strGoodsList)
        	//str1 = JSON.stringify(obj);
        	var SmsCode=$(".codenum").val();
        	if(SmsCode + "$" == "$" || SmsCode + "$" == "null$" || SmsCode + "$" == "undefined$"){
				SmsCode = '';
			}


			//NewOrderform(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList);
			NewOrderform(urlbulterhome,mineuser,contacts,conmobile,"",SmsCode,strGoodsList);
			$.when(jsdWxJsapiAuthorize).done(function (modResult) {
				//$(".loadbox").css("display", "none");
				var strOrderID=modResult.Model.OrderID;
				if(strOrderID==''){
					alert("订单号为空");
					return false;
				}else{
					alert(strOrderID)
					OrderformPayment(strOrderID);
				}
				
			});
		}
	})

	
});