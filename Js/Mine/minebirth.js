$(function(){
	//日期插件
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

    $("#USER_AGE").mobiscroll($.extend(opt['date'], opt['default']));


	var mineuser = window.localStorage.getItem("MerchantID");
	function getUrlParam(){
        //city=%E7%9F%B3%E5%AE%B6%E5%BA%84&indate=2016-8-19&outdate=2016-8-24
        //city=石家庄&indate=2016-8-19&outdate=2016-8-24
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
   	var urlbudet=urlbulterdetail.bir_id;

   	$("#data").val(urlbudet);

	$("#save").on("click",function(){
		var birthval=$("#USER_AGE").val();
		if(birthval==''){
			alert('不能为空');
			return false;
		}else{
			function public2(strActionName,arrActionParam){
		    	var arrActionParam = {
			       	"MemberID":jsgMemberID,
			       	"Birth":birthval
				};
			    var strActionName = strActionName;
				var strActionParam = JSON.stringify(arrActionParam);
				var strRequest = GetVisitData(strActionName, strActionParam);
				var datSubmit = { strRequest: strRequest };
				return datSubmit;
			}

			imgUpload.method(public2('My_UpdateMemberBirth'),function (data) {
				console.log(data)
				if(data.Result==1){
					location.href="../../Html5/Mine/mineEditprofile.html"
				}

			});
		}
			
	})
})
