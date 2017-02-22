$(function(){
	$(".registermain p").on("click","span",function(){
		if($(this).hasClass('checked')){
            $(this).removeClass('checked');
        }else{
            $(this).addClass('checked');
        }
	})

  	$(".registerbtn").on("click",function(e){
  		e.preventDefault();
  		var mobilenumber=$(".mobilenumber").val();
  		var pasval=$(".pas").val();
  		var codeval=$(".codenum").val();
  		var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;

  		if(!mobileReg.test(mobilenumber)){
  			alert("请输入正确的手机号码");
  			return false;
  		}else if(mobilenumber==""){
  			alert("请输入手机号码");
  			return false;
  		}else if(pasval==""){
  			alert("请输入密码");
  			return false;
  		}else if(pasval.length<6 || pasval.length>18){
  			alert("密码长度不符合");
  			return false;
  		}else if(codeval==""){
        alert("请输入验证码")
      }else if($(".registermain p span").hasClass('checked')){
  			alert("请同意TT旅行协议");
  			return false;
  		}else{

  			function public2(strActionName,arrActionParam){
                var arrActionParam = {
                    "Mobile": mobilenumber, 
				    "Code": codeval, 
				    "Password": pasval,
					"UnionID":unid,
                    "OpenID":opid
                };
                var strActionName = strActionName;
                var strActionParam = JSON.stringify(arrActionParam);
                var strRequest = GetVisitData(strActionName, strActionParam);
                var datSubmit = { strRequest: strRequest };
                return datSubmit;
            }

            imgUpload.method(public2('Login_MobileRegister'),function (data) {

               console.log(data);
               if(data.Message=="验证码错误！"){
               		alert("请输入正确的验证码")
               }else if(data.Message=="手机号已存在！"){
               		alert("该手机号已注册")
               }else if(data.Result==1){
               		alert("注册成功");
               		var regist_id =data.Model.TravelerID;
                  window.localStorage.setItem("MemberID",regist_id);
                  location.href = 'mine.html?'+'trav_id='+regist_id;
               }
              	
            });
  		}
  	})
	
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
	
	$(".daojishi").on("click",function(){
		function public2(strActionName,arrActionParam){
        var arrActionParam = {
            "Mobile": $(".mobilenumber").val()
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Login_SendRegisterSms'),function (data) {
      console.log(data)
        if(data.Result!=1){
          alert("请输入手机号")
        }else if(data.Result==1){
        	$(".daojishi").addClass("on");
        	settime($(".daojishi").get(0));
        }
    });

	})

	


})