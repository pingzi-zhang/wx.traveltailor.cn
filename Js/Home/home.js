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

    //定以开始加载数
    var home_count=3;
    //定义后台数据总数
    var datatotal;


    /*下拉刷新*/
    var myScroll;
    document.addEventListener('touchmove',function(e){
        e.preventDefault();
    },false);
    //onload,DOMContentLoaded,$(document).ready()
    window.addEventListener('DOMContentLoaded',getScroll,false);
    //上拉调用
    function pullData(direction) {
         setTimeout(function(){
             imgUpload.method(public('Index_GetBannerList'),function (data) {
       
                var bannerimg=data.List;
                var str="";
                for(var i in bannerimg){
                    str+='<div class="swiper-slide"><img src="'+bannerimg[i].PictureUrl+'" /></div>';
                }
                $('#myWrapper').html(str);
                 myScroll.refresh();
            });
         },1000)


    }
    //上拉加载
    function pullDownUpData(direction) {
        setTimeout(function(){
        function public2(strActionName,arrActionParam){
            home_count+=3;
            var arrActionParam = {
                "Skip":home_count,
                "Take":"3"
            };
            var strActionName = strActionName;
            var strActionParam = JSON.stringify(arrActionParam);
            var strRequest = GetVisitData(strActionName, strActionParam);   
            var datSubmit = { strRequest: strRequest };
            return datSubmit;
        }

        imgUpload.method(public2('Index_GetHotTailorPage'),function (data) {
            if(home_count<datatotal){
                var hot=data.List;
                var str="";
                var sex='';
                for(var i in hot){
                    if(hot[i].Sex==0){
                        sex = '女';
                    }else{
                        sex='男';
                    }
               
                   str+='<li h_id="'+hot[i].TailorID+'">'+
                        '<img src="'+hot[i].IndexUrl+'" >'+
                        '<p class="hot_word">'+hot[i].Lable+'</p>'+
                        '<p>'+hot[i].Inaword+'</p>';
                        //'<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span>'+hot[i].Occupation+'</span></p></li>';
                    if(hot[i].Occupation==""){
                        str+='<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span><span>'+hot[i].Occupation+'</span></p></li>';
                    }else{
                        str+='<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span>·<span>'+hot[i].Occupation+'</span></p></li>';
                    }
                }
                $(".selling").append(str) 
                myScroll.refresh();
            }
          
        });
         
         
         },2000)


    }



    //下拉刷新上拉加载
    function getScroll(){
        var pullDown=document.getElementById('pullDown');
        var topHeight=pullDown.offsetHeight+40;
        myScroll=new iScroll("homeiscroll",{
            vScrollbar:false,
            topOffset:topHeight,
            onRefresh:function(){
                if(pullDown.className.match('loading1')){
                    pullDown.className="";
                    pullDown.querySelector('.pullDownLabel').innerHTML="下拉刷新……";
                }else if(pullUp.className.match('loading1')){
                    pullUp.className="";
                    pullUp.querySelector('.pullUpLabel').innerHTML="上拉加载……";
                }
            },
            onScrollMove:function(){
                if(this.y>5 && !pullDown.className.match("flip")){
                    pullDown.className='flip';
                    pullDown.querySelector(".pullDownLabel").innerHTML="松开手开始刷新……";
                    this.minScrollY=0;
                }else if(this.y<(this.maxScrollY-5) && !pullUp.className.match("flip")){
                   
                    if(home_count>datatotal){
                        pullUp.className='';
                        pullUp.querySelector('.pullUpLabel').innerHTML="已经到底了";
                        return false;
                    }
                    pullUp.className='flip';
                    pullUp.querySelector(".pullUpLabel").innerHTML="松开手开始刷新……";
                    this.minScrollY=0;
                }
            },

            onScrollEnd:function(){
                if(pullDown.className.match('flip')){
                    pullDown.className='loading1';
                    pullDown.querySelector('.pullDownLabel').innerHTML="加载中...";
                    pullData('down');
                }else if(pullUp.className.match('flip')){
                    if(home_count>datatotal){
                        pullUp.className='';
                        pullUp.querySelector('.pullUpLabel').innerHTML="已经到底了";
                        return false;
                    }else{
                        pullUp.className='loading1';
                        pullUp.querySelector('.pullUpLabel').innerHTML="加载中...";
                        pullDownUpData('down');
                    }

                }
            }

        })
    }



    //调用渲染banner轮播
    imgUpload.method(public('Index_GetBannerList'),function (data) {
       if(data.Result!=1){
        alert(data.Message);
        return false;
       }
        var bannerimg=data.List;
        var str="";
        for(var i in bannerimg){
            str+='<div class="swiper-slide"><img src="'+bannerimg[i].PictureUrl+'" /></div>';
        }
        $('#myWrapper').html(str)
        myScroll.refresh();
    });

    //调用渲染最新管家
    imgUpload.method(public('Index_GetNewestList'),function (data) {
        var bulter=data.List;
        var str="";
        var sex="";
        for(var i in bulter){
            if(bulter[i].Sex==0){
                sex = '女';
            }else{
                sex='男';
            }  
            str+='<li b_id="'+bulter[i].TailorID+'">'+
                '<img src="'+bulter[i].FirstUrl+'" >'+
                '<p>'+bulter[i].Inaword+'</p>';
            if(bulter[i].Occupation==""){
                //console.log(bulter[i].Occupation)
                str+='<p><span>'+bulter[i].Name+'</span><span>'+bulter[i].CityName+'</span>·<span>'+bulter[i].Age+'</span>·<span>'+sex+'</span><span>'+bulter[i].Occupation+'</span></p></li>';
            }else{
                //console.log(bulter[i].Occupation)
                str+='<p><span>'+bulter[i].Name+'</span><span>'+bulter[i].CityName+'</span>·<span>'+bulter[i].Age+'</span>·<span>'+sex+'</span>·<span>'+bulter[i].Occupation+'</span></p></li>';
            }
        
        }
        /*$(".newbulter").html(str)
         myScroll.refresh();*/  
    });
    
    //调用渲染热销产品
    /*function public2(strActionName,arrActionParam){
        var arrActionParam = {
            "Skip":"0",
            "Take":"6"
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);   
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Index_GetHotSellingPage'),function (data) {
        var hot=data.List;
        datatotal=data.Total;
        var str="<h1>热销产品</h1>";
        var sex='';
        for(var i in hot){
            if(hot[i].Sex==0){
                sex = '女';
            }else{
                sex='男';
            }
       
           str+='<li h_id="'+hot[i].TailorID+'">'+
                '<img src="'+hot[i].FirstUrl+'" >'+
                '<p class="hot_word">'+hot[i].ProductName+'</p>'+
                '<p>'+hot[i].Inaword+'</p>'+
                '<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span><span>'+hot[i].Occupation+'</span></p></li>';
            
        }
        $(".selling").html(str) 
         myScroll.refresh();
      
    });
*/

    function public2(strActionName,arrActionParam){
        var arrActionParam = {
            "Skip":"0",
            "Take":"6"
        };
        var strActionName = strActionName;
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);   
        var datSubmit = { strRequest: strRequest };
        return datSubmit;
    }

    imgUpload.method(public2('Index_GetHotTailorPage'),function (data) {
        if(data.Result!=1){
            alert(data.Message);
            return false;
        }
        var hot=data.List;
        datatotal=data.Total;
        var str="<h1>热销产品</h1>";
        var sex='';
        for(var i in hot){
            if(hot[i].Sex==0){
                sex = '女';
            }else{
                sex='男';
            }
       
           str+='<li h_id="'+hot[i].TailorID+'">'+
                '<img src="'+hot[i].IndexUrl+'" >'+
                '<p class="hot_word">'+hot[i].Lable+'</p>'+
                '<p>'+hot[i].Inaword+'</p>';
                //'<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span>'+hot[i].Occupation+'</span></p></li>';
            if(hot[i].Occupation==""){
                str+='<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span><span>'+hot[i].Occupation+'</span></p></li>';
            }else{
                str+='<p><span>'+hot[i].Name+'</span><span>'+hot[i].CityName+'</span>·<span>'+hot[i].Age+'</span>·<span>'+sex+'</span>·<span>'+hot[i].Occupation+'</span></p></li>';
            }
        }
        $(".selling").html(str) 
        myScroll.refresh();
      
    });





    //跳转到管家详情页
    /*$('.newbulter').on('click','li',function(){
        var b_id = $(this).attr('b_id');
        location.href = 'bulterHome.html?'+'bulter_id='+b_id;
    })*/
    //跳转到产品详情页
    $('.selling').on('click','li',function(){
        var h_id = $(this).attr('h_id');
        location.href = 'bulterHome.html?'+'bulter_id='+h_id;
    })
	
})		  