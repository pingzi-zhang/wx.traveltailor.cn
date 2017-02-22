$(function(){
	var mineuser = window.localStorage.getItem("MerchantID");
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
   	var urlbudet=urlbulterdetail.name_id;
	$(".na").val(urlbudet);
	$("#save").on("click",function(){
		var nameval=$(".na").val();
		if(nameval==''){
			alert('不能为空');
			return false;
		}else{
			function public2(strActionName,arrActionParam){
		    	var arrActionParam = {
			       	"MemberID":jsgMemberID,
			       	"Name":nameval
			    };
		    	var strActionName = strActionName;
			    var strActionParam = JSON.stringify(arrActionParam);
			    var strRequest = GetVisitData(strActionName, strActionParam);
			    var datSubmit = { strRequest: strRequest };
			    return datSubmit;
		   }
			imgUpload.method(public2('My_UpdateMemberName'),function (data) {
				if(data.Result==1){
					location.href="../../Html5/Mine/mineEditprofile.html"
				}
			});
		}
	})
})