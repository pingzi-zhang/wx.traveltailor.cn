$(function(){
  $("#mobilenumber").bind("blur",function(){
    if($("#mobilenumber").val().trim()){
      $("#forgetbtn").css("background-color","#ff9501");
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
	        obj.value="重新发送(" + countdown + ")"; 
	        $("#forgetdaojishi").removeClass("on");
	        countdown--; 
	    } 
	setTimeout(function() { 
	    settime(obj) }
	    ,1000) 
	}
	
	$("#forgetdaojishi").on("click",function(){
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
        imgUpload.method(public2('Login_SendResetSms'),function (data) {
           if(data.Result!=1){
           		alert("请输入手机号");
           }else if(data.Result==1){
           		$("#forgetdaojishi").addClass("on");
           		settime($(".daojishi").get(0));
           }
        });

	})

  $(".forgetbtn").on("click",function(e){
      e.preventDefault();
      var mobilenumber=$(".mobilenumber").val();
      var pasval=$(".pas").val();
      var codeval=$(".codenum").val();
      var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;

      if(!mobileReg.test(mobilenumber)){
        alert("请输入正确的手机号码");
        return true
      }else if(mobilenumber==""){
        alert("请输入手机号码");
        return false;
      }else if(codeval==""){
        alert("请输入验证码");
        return false;
      }else if(pasval==""){
        alert("请输入密码");
        return false;
      }else if(pasval.length<6 || pasval.length>18){
        alert("密码长度不符合");
        return false;
      }else{
        function public2(strActionName,arrActionParam){
                var arrActionParam = {
                    "Mobile": mobilenumber, 
                    "Code": codeval, 
                    "Password": pasval
                };
                
                var strActionName = strActionName;
                var strActionParam = JSON.stringify(arrActionParam);
                var strRequest = GetVisitData(strActionName, strActionParam);
                var datSubmit = { strRequest: strRequest };
                return datSubmit;
            }
						
            imgUpload.method(public2('Login_ResetPassWord'),function (data) {
               if(data.Message=="验证码错误，请重新获取!"){
                  alert("验证码错误，请重新获取!")
               }else if(data.Message=="手机号未注册"){
                  alert("手机号未注册")
               }else if(data.Result==1){
                  var forget_id =data.Model.TravelerID;
                  console.log(forget_id)
                  window.localStorage.setItem("MemberID",forget_id);
                  location.href = 'mine.html?'+'trav_id='+forget_id;
               }
                
            });
      }
    })
})