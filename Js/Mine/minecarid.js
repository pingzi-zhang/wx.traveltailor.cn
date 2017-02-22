$(function(){
		var mineuser = window.localStorage.getItem("MerchantID");
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   		var carReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
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
   	var urlbulterdetail=getUrlParam();
   	var urlbudet=urlbulterdetail.car_id;
   	$(".na").val(urlbudet);
		$("#save").on("click",function(){
			var carval=$(".na").val();
			if(!carReg.test(carval)){
	  			alert("请输入正确的身份证号码");
	  			return false;
  			}else if(carval==''){
  				alert("不能为空");
	  			return false;
  			}else{
  				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"MemberID":jsgMemberID,
				       	"Identity":carval
				    };
				    console.log(arrActionParam)
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('My_UpdateMemberIdentity'),function (data) {
					console.log(data)
					if(data.Result==1){
						location.href="../../Html5/Mine/mineEditprofile.html"
					}
				});
  			}
			
		})
})