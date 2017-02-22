$(function(){
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
   	var urlbudet=urlbulterdetail.order_id;
   	var resonval;
   	resonval=$("#reson").val();
   $("#reson").on("change",function(){
   		resonval=$(this).val();
   })
   

   $(".btn").on("click",function(){
   		var otherval=$("#other").val();
   		var objOrder = {strOrderID:urlbudet,Refund:resonval,Reason:otherval};
   		console.log(resonval);
   		$(this).attr("disabled","disabled").css({"background":"#ccc"});
   		$.ajax({
	        url: jsgWxPayServer + "/UniformOrder/RefundOrder",
	        type: "POST",
	        dataType: "JSON",
	        data:objOrder,
	        beforeSend: function () {},
	        success: function (data) {
	            if(data.Result==1){
	            	alert(data.Message)
	            	location.href="historyorder.html";
	            }else{
	            	alert(data.Message);
	            	location.href="currntorder.html";
	            }
	            
	        },
	        complete: function () {},
	        error: function (jqXHR, strStatus, strErrorThrown) {
	            alert(XMLHttpRequest.status);
	            alert(XMLHttpRequest.readyState);
	            alert(textStatus);
	            alert(errorThrown);
	        }
	    });

   })
   	
  

})