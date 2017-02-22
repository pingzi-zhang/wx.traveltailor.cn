$(function(){
    
	function public2(strActionName,arrActionParam){
        var arrActionParam = {
            "TravelerID":mineuser
        };
        console.log(arrActionParam)
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('My_GetCustomizationList'),function (data) {
        console.log(data)
        var datal=data.List;
        var str='';
        var status;
        for(var i in datal){
        	if(datal[i].Status==0){
        		status="未读";
        	}else if(datal[i].Status==1){
        		status="已读";
        	}else if(datal[i].Status==2){
        		status="已处理";
        	}
        	str+='<li  c_id="'+datal[i].CustomizationID+'"><img src="../../Images/Customized/list.png" alt=""/>'+
            '<span class="tit"><span>'+datal[i].From+'</span> -- <span>'+datal[i].Destination+'</span></span>'+
            '<div class="time"><span>下单日期：</span>'+datal[i].CreateDate+'</div>'+
            '<span class="course fr">'+status+'</span></li>';
        }

        $(".C_content ul").html(str);
    });

    $(".C_content ul").on("click","li",function(){
    	var c_id = $(this).attr('c_id');
        location.href = 'CustomizedCourse.html?'+'custom_id='+c_id;
    })
})