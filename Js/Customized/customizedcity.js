$(function(){
	//
	function public2(strActionName,arrActionParam){
        var arrActionParam = {
            "Skip":"0",
            "Take":"50"
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Index_GetCityPage'),function (data) {
        console.log(data)
      
    });

	/*var arr=[],
			$let=$("#customizedzimu>li"),
		//获取zimu距浏览器上部的距离
			$zimus=$("#ul1>h3");
		//遍历对象获取每个zimu距上部的距离
		var ul_1 = $(".div");
		$zimus.each(function(){
			var top=parseInt($(this).offset().top);
			arr.push(top);
			//alert(top);
		})
		$let.on("click",function(e){
			e.preventDefault();
			//alert(1);
			ind=$(this).index();
			//alert(ind);
			//$zimus.eq(ind).addClass("fix");
			$(".div")[0].scrollTop=arr[ind]-50;
		})

		
		ul_1.on("scroll",function(){
			var scrTop=$(this).scrollTop()+75;
			//alert(scrTop)
		//document.title=scrTop;
			$.each(arr,function(i){
				//console.log(i);
				if(i==arr.length-1){
					if(scrTop>arr[i]){
						$zimus.eq(i).addClass("fixed");
					}else{
						$zimus.eq(i).removeClass("fixed");
					}
				}else{
					if(scrTop>=arr[i]&&scrTop<arr[i+1]){
						$zimus.eq(i).addClass("fixed");
					}else{
						$zimus.eq(i).removeClass("fixed");
					}
				}
				
			})
		})*/
})