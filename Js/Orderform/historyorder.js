$(function(){
	
    var zonum;
    var door_count=10;
    var pagesize=3;
    var fal=true;
    if(jsgMemberID==""){
        $('.noorder').show();
        $('.noorder button').on('click',function(){
            location.href='../Home/home.html';
        });
    }
	 //调用渲染当前订单
    function public2(strActionName,arrActionParam){
        var arrActionParam = {
            TravelerID:mineuser, 
		    Skip: "0", 
		    Take: "10"
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Order_GetOrderHistoryList'),function (data) {
        zonum=data.Total;
 		var datal= data.List;
 		var str='';
        if(datal==''){
            $('.noorder').show();
            $('.noorder button').on('click',function(){
                location.href='../Home/home.html';
            })
        }else{
            for(var i in datal){
                var datagoodl=datal[i].GoodsList;
                str+='<div class="orderbox" order_id="'+datal[i].OrderID+'"><div class="order-title"><img src="'+datal[i].TailorHead+'"><div>'+
                    '<p><span>'+datal[i].TailorName+'&nbsp;&nbsp;</span><span>'+datal[i].StatusText+'</span></p>'+
                    '<p>'+datal[i].CreateTime+'</p></div></div>'
                for(var j in datagoodl){
                    str+='<div class="line"></div>'+
                        '<div class="order-detail2" gd_id="'+datagoodl[j].GoodsID+'">'+
                        '<p><span>'+datagoodl[j].Name+''+datagoodl[j].Quantity+'</span><span>￥'+datagoodl[j].SellPrice+'</span></p></div>';
                }

                var creat=datal[i].CreateTime;
                //console.log(creat)
                var time = new Date(creat.replace("-","/"));
                var b = 15; //分钟数
                time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
                //console.log(time)  
               
                /*if(datal[i].Status==0){
                    str+='<div class="line2"></div><div class="again"><a href="#">再来一单</a></div>';
                }*/
                str+='</div>';

            }
            $(".historybox").html(str)

        }
 		
    });
   

        //下滑加载
    var scrollHeight = $(document).height();
    $(window).bind("scroll",function () {

        var scrollTop= $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (Math.floor(scrollTop + windowHeight) >= scrollHeight) {
            if(fal==true){
                pullDownUpData();
            }

        }
    });


    function pullDownUpData() {
        //fal=false;
        door_count=door_count+3;

        function public2(strActionName,arrActionParam){
            var arrActionParam = {
                TravelerID:mineuser, 
                Skip: door_count, 
                Take: pagesize
            };

            var strActionName = strActionName;
            var strActionParam = JSON.stringify(arrActionParam);
            var strRequest = GetVisitData(strActionName, strActionParam);
            var datSubmit = { strRequest: strRequest };
            return datSubmit;
        }

        imgUpload.method(public2('Order_GetOrderHistoryList'),function (data) {
           
             if(data.Message=="成功获取！"){
                if(door_count>=zonum){
                    fal=false;
                }else{
                    fal=true;
                }

            }
            var datal= data.List;
            var str='';
            
            for(var i in datal){
                var datagoodl=datal[i].GoodsList;
                str+='<div class="orderbox" order_id="'+datal[i].OrderID+'"><div class="order-title"><img src="'+datal[i].TailorHead+'"><div>'+
                    '<p><span>'+datal[i].TailorName+'&nbsp;&nbsp;</span><span>'+datal[i].StatusText+'</span></p>'+
                    '<p>'+datal[i].CreateTime+'</p></div></div>'
                for(var j in datagoodl){
                    str+='<div class="line"></div>'+
                        '<div class="order-detail2" gd_id="'+datagoodl[j].GoodsID+'">'+
                        '<p><span>'+datagoodl[j].Name+''+datagoodl[j].Quantity+'</span><span>￥'+datagoodl[j].SellPrice+'</span></p></div>';
                }
                /*if(datal[i].Status==0){
                    str+='<div class="line2"></div><div class="again"><a href="#">再来一单</a></div>';
                }*/
                str+='</div>';

            }
            $(".historybox").append(str)
        });

    }

     $(".his_content").on("click",".orderbox",function(){
        var gd_id =$(this).attr('order_id');
        location.href = 'orderNopay.html?'+'goodt_id='+gd_id;
    });

})