$(function(){
	/*调用轮播*/
	var mySwiper = new Swiper ('.swiper-container', {   
  		autoplay:3000,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      loop: true,
  		autoplayDisableOnInteraction:false,
  		grabCursor:true,
  		paginationClickable:true,
  		preloadImages:false,
  		observer:true,//修改swiper自己或子元素时  ，自动初始化swiper
      observeParents:true//修改swiper的父元素时，自动初始化swiper

	});
  //获取地址栏参数
	function getUrlParam(){
        var url=decodeURI(location.search);
        var str = url.substr(1);
        var arr = str.split('&' );
        var obj={};
        arr.forEach(function(v,i){
            var arr2 = v.split('=');
            obj[arr2[0]] = arr2[1];
        })
     
        return obj;
   	}
   	var bulterurlhomr=getUrlParam();
   	var urlbulterhome=bulterurlhomr.buhome_id;
   	var urlbulvatity=bulterurlhomr.bulva;
   	//调用渲染当前订单
    function public2(strActionName,arrActionParam){
        var arrActionParam = {
            strProductID:urlbulterhome
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Index_GetProductDetail'),function (data) {
      console.log(data)
     	if(data.Result!=1){
     		return false;
     	}
      $(".loadbox").hide();
     	var str='',str1="",str2="";
     	var datam=data.Model;
     	var arr=datam.Album.split(',')
     	$.each(arr,function(i,val){
  			str += '<div class="swiper-slide"><img src="'+val+'" /></div>';
  		})
      /*str1 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>'+datam.Sell+'/</span>人</p></div>';
      $(".title").html(str1); */   
      $("#myWrapper").html(str);
      if(datam.Variety==01){
        str1 +='<span>使用规则:'+datam.Instructions+'</span>';
        str2 +='<span>使用规则:'+datam.Instructions+'</span>';
        $(".fod_guize").html(str1);
        $(".fod_feiy").html(str2);
        $(".fod_buy").html(datam.Description);
      }else if(datam.Variety==02){
        
        str1 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>￥'+datam.Sell+'</span></p></div>';
        $(".fod_buy").html(datam.Description);
        //$(".title").html(str1); 
      }else if(datam.Variety==08){

        str1 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>￥'+datam.Sell+'</span></p></div>';
        $(".gui").html(datam.Change);
        //$(".title").html(str1); 
      }
       	
            });
    
    function public3(strActionName,arrActionParam){
        var arrActionParam = {
            ProductID:urlbulterhome
        };

        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }
    imgUpload.method(public3('Index_GetProduct'),function (data) {   
        var datam=data.Model;
        console.log(datam);
        var str3='<div class="dizhi"><p><img src="../../Images/Home/s.png"><span>'+datam.Address+'</span></p></div>'
        var str1='<h2>套餐内容</h2><div class="fod_eat"><ul>';
        var str4="";
        if(data.Result!=1){
          return false;
        }
        if(datam.Variety==01){
          str4 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>￥'+datam.Buy+'</span></p></div>';
          $(".title").html(str4); 
          
        }else if(datam.Variety==02){
          
          str4 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>￥'+datam.Buy+'</span></p></div>';
          $(".title").html(str4); 
        }else if(datam.Variety==08){

          str4 +='<div class="fod1"><h1>'+datam.Name+'</h1><p><span>￥'+datam.Buy+'</span></p></div>';
          $(".title").html(str4); 
        }

        if(datam.Variety1==0801){
          var datav=datam.FoodList;
          //console.log(datav);
          for(var i in datav){
            str1+='<li>'+
              '<span>'+datav[i].Name+'</span>'+
              '<span>'+datav[i].Quantity+''+datav[i].Unit+'</span>'+
              '<span>￥'+datav[i].Price+'</span>'+
            '</li>';
          }
          str1+="</ul></div></div>";
          $(".fod_tancan").html(str1);
        }
        $(".dizhi").html(str3);
        //$(".gui").html(datam.Notice);
        $("title").html(datam.MercName);
    });

})