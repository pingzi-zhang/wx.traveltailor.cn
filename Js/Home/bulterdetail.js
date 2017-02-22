$(function(){

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
   	var urlbudet=urlbulterdetail.inone_id;

   	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"strTailorID":urlbudet
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

   	imgUpload.method(public2('Index_GetMemberDetail'),function (data) {

      console.log(data)
  		var datadm=data.Model;
      console.log(datadm)
  		/*var str='<div class="introduce1">'+
  			'<h1>'+datadm.Inaword+'</h1>'+
  			'<div id="homeBanner"><img src="'+datadm.Head+'"/></div>'+
  			'<div class="introduce2">'+
  			'<p>'+datadm.Name+'</p></div>';*/
  		//$('.homepage').html(str);
      var str='<div class="bulter_tou"><dl><dt><img src="'+datadm.Head+'"/></dt>'+
        '<dd><h3>'+datadm.Name+'</h3><p>'+datadm.Inaword+'</p></dd></dl></div>'+
        '<div class="bulter_detail">'+
        '<p>'+datadm.Detail+'</p>'+
    '</div>';
    $('.homepage').html(str);
		
	});

})