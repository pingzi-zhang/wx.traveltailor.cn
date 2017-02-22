$(function(){
  $.jindutiao=function(num){
    var _default=60;
    if(num)_default=num;
    var len=$("#tiao").height(),
      W=len*_default/100;
      //console.log(W)
    $("#green").height(W);
  }
  
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
   	var customurlhomr=getUrlParam();
   	var customurlhomr=customurlhomr.custom_id;
   	
   	//产品信息
   	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"CustID":customurlhomr
	    };

    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }

	imgUpload.method(public2('My_GetCustomization'),function (data) {
		console.log(data);
    var datam=data.Model;
    var str='',
        str1='',
        str2='',
        str3='',
        str4='';
    var statu;
    if(datam.Status==0){
      statu="未读";
      $.jindutiao(25);
    }else if(datam.Status==1){
      statu="已读";
      $.jindutiao(60);
    }else if(datam.Status==2){
      statu="已处理";
      $.jindutiao(100);
    }
    str+='<dl>'+
            '<dt>订单信息</dt>'+
            '<dd>订单状态：<span class="active">'+statu+'</span></dd>'+
            '<dd>下单时间：<span>'+datam.CreateDate+'</span></dd></dl>';
    str1+='<li><div class="tip"><span></span><i></i></div><div class="content">'+
          '<span>定制已提交,等待管家<span class="name">张三</span>处理</span>'+
          '<span class="timer fr">2016/12/05 16:21</span></div></li>'+
          '<li><div class="tip"><span></span><i></i><s></s></div>'+
          '<div class="content">'+
          '<span>管家<span class="name">张三</span>已处理定制</span>'+
          '<span class="timer fr">2016/12/06 09:35</span></div></li>'+
          '<li><div class="tip"><img src="" alt=""/><s></s></div>'+
          '<div class="content"><span>定制完成</span><span class="timer fr">2016/12/20 12:27</span></div></li>';
    str2+='<dl><dt>我的需求</dt>'+
          '<dd>出发地：<span>'+datam.From+'</span></dd>'+
          '<dd>目的地：<span>'+datam.Destination+'</span></dd>'+
          '<dd>旅游主题：<span>'+datam.ThemeName+'</span></dd>'+
          '<dd>酒店星级：<span>'+datam.Star+'</span></dd>'+
          '<dd>出发时间：<span>'+datam.Start+'</span></dd>'+
          '<dd>出行人数：<span>成人'+datam.Adult+'位　|　儿童'+datam.Children+'位</span></dd>'+
          '<dd>人均预算：<span>'+datam.Budget+'元</span></dd>'+
          '<dd class="last"><span class="last-tit">其他要求：</span><span class="last-desc">'+datam.Demand+'</span></dd>'+
      '</dl>';
    str3='<dl><dt>联系信息</dt>'+
          '<dd>联系人 <span class="fr message">'+datam.LinkName+'</span></dd>'+
          '<dd>联系电话 <span class="fr message">'+datam.LinkPhone+'</span></dd></dl>';

    str4='<dl><dt>客服电话</dt>'+
          '<dd>联系电话 <span class="fr message">'+datam.TailorMobile+'</span></dd></dl>';

    $(".order-message").html(str);
    $(".require").html(str2);
    $(".contact").html(str3);
    $(".service").html(str4);

	});

})