$(function(){
		var mineuser = window.localStorage.getItem("MerchantID");
		var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;
	function getUrlParam(){
        //?city=%E7%9F%B3%E5%AE%B6%E5%BA%84&indate=2016-8-19&outdate=2016-8-24
        //?city=石家庄&indate=2016-8-19&outdate=2016-8-24
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
   	var urlbudet=urlbulterdetail.mob_id;
   	$(".na").val(urlbudet);
		$("#save").on("click",function(){
			var mobileval=$(".na").val();
			if(!mobileReg.test(mobileval)){
  				alert("请输入正确的手机号码");
  			return false;
  			}else if(mobileval==''){
  				alert("不能为空");
  				return false;
  			}else{
  				function public2(strActionName,arrActionParam){
			    	var arrActionParam = {
				       	"MemberID":jsgMemberID,
				       	"Mobile":mobileval
				    };
				    console.log(arrActionParam)
			    	var strActionName = strActionName;
				    var strActionParam = JSON.stringify(arrActionParam);
				    var strRequest = GetVisitData(strActionName, strActionParam);
				    var datSubmit = { strRequest: strRequest };
				    return datSubmit;
			    }

				imgUpload.method(public2('My_UpdateMemberMobile'),function (data) {
					console.log(data)
					if(data.Result==1){
						location.href="../../Html5/Mine/mineEditprofile.html"
					}
				});
  			}
			
		})
})