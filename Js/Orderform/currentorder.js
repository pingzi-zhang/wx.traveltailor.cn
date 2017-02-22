$(function(){

    var zonum;
    var door_count=20;
    var pagesize=3;
    var fal=true;

    if(jsgMemberID==""){
        $('.noorder').show();
        $('.noorder button').on('click',function(){
            location.href='../Home/home.html';
        });
    }
    var strOrderID = GetParameterValue("strOrderID");
    //alert("订单号：" + strOrderID);
    var strPayResult = GetParameterValue("intResult");
    //alert("支付结果：" + strPayResult);
    if (strPayResult == "1") {
        $.ajax({
            url: jsgWxPayServer + "/UniformOrder/WxPaySucceedSynchro",
            type: "POST",
            dataType: "JSON",
            async: false,
            data: "strOrderID=" + strOrderID,
            beforeSend: function () { },
            success: function (data) {
                if (data.Result == 1) {
                    //alert(data.Message);
                } else {
                    //alert(data.Message);
                }
            },
            complete: function () { },
            error: function (data) {
                var aa = JSON.stringify(data);
                alert("error" + aa);
            }
        });
    }
    //获取地址栏参数判断是否有传值并改变状态
    //var strurl=decodeURI(location.search);
    //if(strurl!=""){
    //    function getUrlParam(){
    //        //var url=decodeURI(location.search);
    //        var str = strurl.substr(1);
    //        var arr = str.split('&');
    //        var obj={};
    //        arr.forEach(function(v,i){
    //            var arr2 = v.split('=');
    //            obj[arr2[0]] = arr2[1];
    //        })
    //        return obj;
    //    }
    //    var bulterurlhomr=getUrlParam();
    //    var urlstrOrderID=bulterurlhomr.strOrderID;
    //    var urlintResult=bulterurlhomr.intResult;

    //    if(urlintResult==1){
    //        $.ajax({
    //            url:jsgWxPayServer+"/UniformOrder/WxPaySucceedSynchro",
    //            type: "POST",
    //            dataType: "JSON",
    //            async:false,
    //            data: "strOrderID="+urlstrOrderID,
    //            beforeSend: function () {},
    //            success: function (data) {
    //                if(data.Result==1){
    //                    //alert(data.Message);
    //                }else {
    //                    //alert(data.Message);
    //                }
    //            },
    //            complete: function () {},
    //            error: function (data) {
    //                var aa=JSON.stringify(data);
    //                alert("error"+aa);
    //            }              
    //        });
    //    }
        
    //}


	 //调用渲染当前订单
    function public2(strActionName,arrActionParam){
        var arrActionParam = {
            TravelerID:mineuser, 
		    Skip: "0", 
		    Take: "20"
        };

        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Order_GetOrderCurrentList'),function (data) {
        zonum=data.Total;
        var datal= data.List;
        var str='';
        if(zonum==0){
            $('.noorder').show();
            $('.noorder button').on('click',function(){
                location.href='../Home/home.html';
            });

        }else{
            for(var i in datal){

                var datagoodl=datal[i].GoodsList;
                str+='<div class="orderbox"><div class="order_dian" orde_id="'+datal[i].OrderID+'"><div class="order-title"><img src="'+datal[i].TailorHead+'"><div>'+
                    '<p><span>'+datal[i].TailorName+'&nbsp;&nbsp;</span><span>'+datal[i].StatusText+'</span></p>'+
                    '<p>'+datal[i].CreateTime+'</p></div></div>'
                for(var j in datagoodl){
                    var zonum=datagoodl[j].SellPrice*datagoodl[j].Quantity;
                    str+='<div class="line"></div>'+
                        '<div class="order-detail2">'+
                        '<p><span>'+datagoodl[j].Name+''+datagoodl[j].Quantity+'</span><span>￥'+zonum+'</span></p></div></div>';
                }

                if(datal[i].Status==0){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>去支付</button><button>取消</button></div>';
                }else if(datal[i].Status==2){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分消费</button></div>';
                }else if(datal[i].Status==3){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已消费</button></div>';
                }else if(datal[i].Status==8){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分完成</button></div>';
                }else if(datal[i].Status==9){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已完成</button></div>';
                }else if(datal[i].Status==-1){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已取消</button></div>';
                }else if(datal[i].Status==-2){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分退订</button></div>';
                }else if(datal[i].Status==-3){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已退订</button></div>';
                }else if(datal[i].Status==-10){
                    str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已关闭</button></div>';
                }else if(datal[i].Status==1){
                     //str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>申请退款</button></div>';
                }

                    str+='</div>'
                //alert(str);
                //18255418982
            }
             $(".currentbox").html(str);
        }
       

        $(".refund").on("click","button",function(){
            var _val=$(this).text();
            var orde_id = $(this).parent().attr('orde_id');
            if(_val=="申请退款"){

                location.href="refoundreson.html?"+'order_id='+orde_id;
            }else if(_val=="去支付"){
                var orde_id = $(this).parent().attr('orde_id');
                OrderformPayment(orde_id);
                
            }else if(_val=="取消"){
                function public2(strActionName,arrActionParam){
                    var arrActionParam = {
                        OrderID:orde_id
                    };
                    console.log(arrActionParam)
                    var strActionName = strActionName;
                    var strActionParam = JSON.stringify(arrActionParam);
                    var strRequest = GetVisitData(strActionName, strActionParam);
                    var datSubmit = { strRequest: strRequest };
                    return datSubmit;
                }

                imgUpload.method(public2('Index_CancelOrder'),function (data) {
                    if(data.Result==1){
                        alert("取消成功");
                        location.href="historyOrder.html";
                    }else if(data.Result==-1){
                        alert("取消失败");
                        return false;
                    }else if(data.Result==-99){
                        alert(data.Message);
                        return false;
                    }
                });
            }

        });


 
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

        imgUpload.method(public2('Order_GetOrderCurrentList'),function (data) {
           
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
                    str+='<div class="orderbox"><div class="order_dian" orde_id="'+datal[i].OrderID+'"><div class="order-title"><img src="'+datal[i].TailorHead+'"><div>'+
                        '<p><span>'+datal[i].TailorName+'&nbsp;&nbsp;</span><span>'+datal[i].StatusText+'</span></p>'+
                        '<p>'+datal[i].CreateTime+'</p></div></div>'
                    for(var j in datagoodl){
                        str+='<div class="line"></div>'+
                            '<div class="order-detail2">'+
                            '<p><span>'+datagoodl[j].Name+''+datagoodl[j].Quantity+'</span><span>￥'+datagoodl[j].SellPrice+'</span></p></div></div>';
                    }
                    if(datal[i].Status==0){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>去支付</button><button>取消</button></div>';
                        }else if(datal[i].Status==2){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分消费</button></div>';
                        }else if(datal[i].Status==3){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已消费</button></div>';
                        }else if(datal[i].Status==8){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分完成</button></div>';
                        }else if(datal[i].Status==9){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已完成</button></div>';
                        }else if(datal[i].Status==-1){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已取消</button></div>';
                        }else if(datal[i].Status==-2){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>部分退订</button></div>';
                        }else if(datal[i].Status==-3){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已退订</button></div>';
                        }else if(datal[i].Status==-10){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>已关闭</button></div>';
                        }else if(datal[i].Status==1){
                            str+='<div class="line2"></div><div class="refund" orde_id="'+datal[i].OrderID+'"><button>申请退款</button></div>';
                        }

                    str+='</div>'
                    //alert(str);
                    //18255418982
                }
            $(".currentbox").append(str);

            $(".refund").on("click","button",function(){
                var _val=$(this).text();
                var orde_id = $(this).parent().attr('orde_id');
                if(_val=="申请退款"){

                    location.href="refoundreson.html?"+'order_id='+orde_id;
                }else if(_val=="去支付"){
                    var orde_id = $(this).parent().attr('orde_id');
                    OrderformPayment(orde_id);
                    
                }else if(_val=="取消"){
                    function public2(strActionName,arrActionParam){
                        var arrActionParam = {
                            OrderID:orde_id
                        };
                        console.log(arrActionParam)
                        var strActionName = strActionName;
                        var strActionParam = JSON.stringify(arrActionParam);
                        var strRequest = GetVisitData(strActionName, strActionParam);
                        var datSubmit = { strRequest: strRequest };
                        return datSubmit;
                    }

                    imgUpload.method(public2('Index_CancelOrder'),function (data) {
                        console.log(data)
                        if(data.Result==1){
                            alert("取消成功");
                            location.href="historyOrder.html";
                        }else if(data.Result==-1){
                            alert("取消失败");
                            return false;
                        }else if(data.Result==-99){
                            alert(data.Message);
                            return false;
                        }
                    });
                }

            });
     
        });



    }
    

    $(".cur_content").on("click",".order_dian",function(){
        var orde_id = $(this).attr('orde_id');
        location.href ='orderNopay.html?'+'goodt_id='+orde_id;
    });
});