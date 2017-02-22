$(function(){
	function public2(strActionName,arrActionParam){
    	var arrActionParam = {
	       	"TravelerID":jsgMemberID
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
   }
	imgUpload.method(public2('My_GetTravelerInfo'),function (data) {
		var datam=data.Model;
		var str="";
		var head = "";
		if(datam.HeadUrl){
			head = datam.HeadUrl;
		}
		var iden,sex,birth;
		datam.Identity==''?iden="未填写":iden=datam.Identity;
		datam.Sex==0?sex="女":sex="男";
		datam.Birth==''?birth="未填写":birth=datam.Birth;//<div class="headupdate"><img src="'+datam.HeadUrl+'" /></div>
		str+='<ul><li class="head changeHead" id="writehead" bir_head="'+head+'"><a>头像</a><div class="goods-info-user-img headupdate"><img id="headUrl" src='+head+'></div></li>'+
			'<li class="name" id="name" n_id="'+datam.Name+'"><a>姓名</a><span class="nameupdate"><b>'+datam.Name+'</b></span></li>'+
			'<li class="birthday" id="birthday" bir_id="'+birth+'"><a>出生日期</a><span class="birthupdate"><b>'+birth+'</b></span></li>'+
			'<li class="sex" id="sex" s_id="'+sex+'"><a>性别</a><span class="sexupdate"><b>'+sex+'</b></span></li>'+
			/*'<li class="tel" id="tel" dm_id="'+datam.Mobile+'"><a>手机</a><span class="mobileupdate"><b>'+datam.Mobile+'</b></span></li>'+*/
			'<li class="identityCard" id="identityCard" car_id="'+iden+'"><a>身份证</a><span class="caridupdate"><b>'+iden+'</b></span></li></ul>';

		$(".profile").html(str);
	});
	//点击更换姓名
	$(".profile").on("click",".name",function(){
		var n_id = "";
		if($(this).attr('n_id')){
			var n_id = $(this).attr('n_id');
		}
		location.href='minenameupdate.html?'+'name_id='+n_id;
	})
	//点击更该出生日期
	$(".profile").on("click",".birthday",function(){
		var bir_id = "";
		if($(this).attr('bir_id')){
			bir_id = $(this).attr('bir_id');
		}
		location.href='minebirthupdate.html?'+'bir_id='+bir_id;
	})
	
	//点击更该性别
	$(".profile").on("click",".sex",function(){
		var s_id = "";
		if($(this).attr('s_id')){
			s_id = $(this).attr('s_id');
		}
		location.href='minesexupdate.html?'+'sex_id='+s_id;
	})
	//点击更该手机号
	$(".profile").on("click",".tel",function(){
		var dm_id = "";
		if($(this).attr('dm_id')){
			dm_id = $(this).attr('dm_id');
		}
		location.href='minemobileupdate.html?'+'mob_id='+dm_id;
	})
	//点击更该身份证
	$(".profile").on("click",".identityCard",function(){
		var car_id = "";
		if($(this).attr('car_id')){
			car_id = $(this).attr('car_id');
		}
		location.href='minecaridupdate.html?'+'car_id='+car_id;
	})
	//点击更换头像
	$(".profile").on("click",".changeHead",function(){
		/*fnUploadImg(window.location.href,mineuser);*/
		fnUploadImg(window.location.href,mineuser);
	})	
	
})

