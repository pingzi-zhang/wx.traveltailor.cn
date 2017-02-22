$(function(){
/*	jsgMemberID="";
	if(window.localStorage.MemberID) jsgMemberID = window.localStorage.getItem("MemberID");
	alert("jsgMemberID:#"+jsgMemberID);*/
	$("#mobilenumber").bind("blur",function(){
		if($("#mobilenumber").val().trim()){
			$("#login").css("background-color","#ff9501");
		}
	})
	$("#login").on("click",function(e){
		e.preventDefault();
		var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;
		var mobilenumber=$("#mobilenumber").val();
		var passnum=$("#passnum").val();
		if(mobilenumber==""){
			alert("请输入手机号码");
			return false;
		}else if(passnum==""){
			alert("请输入密码");
			return false;
		}else if(!mobileReg.test(mobilenumber)){
			alert("请输入正确的手机号码");
			return false;
		}else{
			function public2(strActionName,arrActionParam){
                var arrActionParam = {
                    "Mobile": mobilenumber, 
    				"Password": passnum,
                    "UnionID":unid,
                    "OpenID":opid
                };
                var strActionName = strActionName;
                var strActionParam = JSON.stringify(arrActionParam);
                var strRequest = GetVisitData(strActionName, strActionParam);
                var datSubmit = { strRequest: strRequest };
                return datSubmit;
           }
            imgUpload.method(public2('Login_MobileLogin'),function (data) {
               if(data.Result==1){
               		var travel_id =data.Model.TravelerID;
               		
               		window.localStorage.setItem("MemberID", data.Model.TravelerID);
               		window.localStorage.setItem("MemberGuide", data.Model.Guide);
               		window.localStorage.setItem("MerchantID", data.Model.MerchantID);
               		window.localStorage.setItem("WaiterID", data.Model.WaiterID);
               		jsgUnionID = data.Model.UnionID;
               		jsgOpenID = data.Model.OpenID;
               		jsgMemberID = data.Model.TravelerID; 
               		jsgMemberGuide = data.Model.MemberGuide; 
               		jsgMerchantID = data.Model.MerchantID; 
               		jsgWaiterID = data.Model.WaiterID;
               		jsgMemberName = data.Model.Name;
               		jsgMemberMobile = data.Model.TravelerMobile;
               		jsgMemberI = data.Model.Identity;
               		jsgMemberAdress =data.Model.Address; 
                   location.href = 'mine.html';
               }else if(data.Message == "手机号错误或未注册!"){
					alert("手机号未注册");
					return false;
               }else if(data.Message == "密码错误!"){
					alert("密码错误");
					return false;
               }
            });
		}
	})
})