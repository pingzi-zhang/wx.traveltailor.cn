$(function(){
/*	jsgMemberID = window.localStorage.getItem("MemberID");
	alert("jsgMemberID:#"+jsgMemberID);*/
   	if(jsgMemberID==""){
   		location.href="login.html";
   		return false;
   	}
   	if(jsgMemberGuide ==0){
   		$("#steward").css("display","none");
   	}
  
   	if(jsgMerchantID == ""){
   		$("#merchant").css("display","none");
   	}
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
		console.log(data)
		var datam=data.Model;
		var str="";
		var head = "../../Images/Mine/poto.jpg";
		if(datam.HeadUrl){
			head = datam.HeadUrl;
		}
		str+='<dl><dt><img src="'+head+'" /></dt>'+
			 '<dd><h3>'+datam.Name+'</h3>'+
			'<p><i class="fa fa-mobile-phone fa-2x"></i>'+datam.Mobile+'</p></dd></dl>';
		
		$(".minetitle").html(str);
		if(datam.Work == 0){
			$(".slide").addClass("on");
		}else{
			$(".slide").removeClass("on");
		}
	});
	$(".minetitle").on("click",function(){
		location.href="mineeditprofile.html";
	})
	//关于我们
	$("#aboutOut").on("click",function(){
		location.href="aboutOur.html";
	})
	//点击我的定制进入
	$(".mineding .minecustom").on("click",function(){
		location.href="../Customized/CustomizedList.html";
	});
	//点击订单进入订单页
	$("#order").on("click",function(){
		alert();
		location.href="../../Html5/Mine/myOrder.html"
	})

	//点及管家码扫码的页面跳转
	$("#backCode").on("click",function(){
		WxScanCancel(window.location.href);
	});
	//商家的消费扫码
	$("#consumeScanCode").on("click",function(){
		ScanCodeConsume(window.location.href);
	});
	//联系我们
	$("#contactUs").on("click",function(){
		location.href="../../Html5/Mine/contactUs.html"
	})
	//changeuser更换账户
	$("#changeuser").click(function(){
		jsgMemberID = "";jsgMemberGuide=0;jsgVisit = 0;sgTargetID = "";jsgMerchantID = "";jsgWaiterID = "";jsgMemberName="";jsgMemberMobile="";jsgMemberI="";jsgMemberAdress="";
		window.localStorage.removeItem("MemberID");
		window.localStorage.setItem("MemberGuide",0);
		window.localStorage.setItem("Visit",0);
		window.localStorage.setItem("TargetID","");
		window.localStorage.setItem("MerchantID","");
		window.localStorage.setItem("WaiterID","");
		window.localStorage.setItem("MemberName","");
		window.localStorage.setItem("MemberMobile","");
		window.localStorage.setItem("MemberI","");
		window.localStorage.setItem("MemberAdress","");
		location.href="login.html"
	});
	//在线状态开关按钮的显示
	$(".slide").on("click",function(){
		var work;
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			work = 0;
		}else{
			work = -1;
		}
		function public2(strActionName,arrActionParam){
	    	var arrActionParam = {
		       	"TailorID":jsgMemberID,
				"Work":work
		    };
		    console.log(arrActionParam)
	    	var strActionName = strActionName;
		    var strActionParam = JSON.stringify(arrActionParam);
		    var strRequest = GetVisitData(strActionName, strActionParam);
		    var datSubmit = { strRequest: strRequest };
		    return datSubmit;
	  }
		imgUpload.method(public2('My_UpdateIsWork'),function (data) {
			if(data.Result==1){
			}else{
				alert(data.Message)
			}
		});
	});
})
