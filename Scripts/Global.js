if (window.localStorage) {
} else {
    alert("当前浏览器不支持本地存储(localStorage)！");
}
/*********************全局变量开始*********************/
var jsgSiteHost = window.location.protocol + "//" + window.location.host; 
var jsgWxJsapiAuthorize = jsgSiteHost + "/Weixin/WxJsapiAuthorize"
var jsgWxPayServer = "http://payapi2.traveltailor.cn";// "http://paytest.traveltailor.cn";   "http://payapi2.traveltailor.cn"
var jsgDataServer = "http://wxapi.traveltailor.cn";// "http://wxapitest.traveltailor.cn"; "http://wxapi.traveltailor.cn"
var jsgDataVisit = "/Gate/VisitChannel";
var jsgImageServer = "http://imgapi.traveltailor.cn";// "http://imgapi.nihaott.com:8015";  "http://imgapi.traveltailor.cn"
var jsgImageUpload = "/Picture/UploadPicture";
var jspPartnerID = "A001";
var jspApplyID = "zhtt2hvWxApi2_1.0";
var jspSignKey = "1234567812345678"; //1234567812345678  //1
var jsgSubmit = "";
var jsgDefaultTime = new Date(1900, 1, 1);
var jsgUnionID = "", jsgOpenID = "", jsgMemberID = "";//MemberID游客的ID //MerchantID商户ID//MerchantID      jsgMemberGuide！=0 显示管家
var jsgMemberGuide = 0, jsgVisit = 0, jsgTargetID = "", jsgMerchantID = "", jsgWaiterID = "",jsgMemberName="",jsgMemberMobile="",jsgMemberI="",jsgMemberAdress="",jsgMemberRegion="";//正式

/*var jsgUnionID = "oqLbTw5lRruD7MooEDeAT_qN8Ad0", jsgOpenID = "oHJjFv6rnfJzd_HhS2h-6uwjqVns", jsgMemberID = "92474db14ed3451888c057e0984973f3", jsgMemberGuide = 0, jsgVisit = 0, jsgTargetID = "",jsgMerchantID = "", jsgWaiterID = "";//测试
window.localStorage.setItem("UnionID", "oqLbTw5lRruD7MooEDeAT_qN8Ad0");//测试
window.localStorage.setItem("OpenID", "oHJjFv6rnfJzd_HhS2h-6uwjqVns");//测试
window.localStorage.setItem("MemberID", "b6904708fa294e8b9d58a4c14b7bd78d");//测试
window.localStorage.setItem("MemberGuide", 0);//测试*/

/*********************全 局变量结束*********************/
/*********************访问开始*********************/
function GetRandomString(intLength) {
    intLength = intLength || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < intLength; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function GetTimeStamp() {
    var dtmNow = new Date();
    dtmNow.setMinutes(dtmNow.getMinutes() + dtmNow.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
    //alert(dtmNow.toLocaleString());
    return dtmNow.getTime().toString();
}
function GetSignMd5(strActionName, strActionParam, strTimeStamp) {
    var strSign = jspApplyID;
    strSign += "&" + jspSignKey;
    strSign += "&" + strActionName;
    strSign += "&" + strActionParam;
    strSign += "&" + strTimeStamp;
    return CryptoJS.MD5(strSign);//$.md5(strRequest)
}
function GetVisitData(strActionName, strActionParam) {
    var arrVisitValue = { PartnerID: jspPartnerID, ApplyID: jspApplyID, ActionName: strActionName, ActionParam: strActionParam };
    var strVisitValue = JSON.stringify(arrVisitValue);
    var strVisitID = GetRandomString(16);
    strVisitValue = CryptoJS.AES.encrypt(strVisitValue, CryptoJS.enc.Utf8.parse(strVisitID), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    strVisitValue = encodeURI(strVisitValue);
    strVisitValue = strVisitValue.replace(/\+/g, '%2B');
    //strVisitValue = strVisitValue.replace(/\ /g, '%2B');
    strVisitValue = strVisitValue.replace(/\=/g, '%4S');
    var strTimeStamp = GetTimeStamp();
    var strSign = GetSignMd5(strActionName, strActionParam, strTimeStamp.toString());
    var arrRequest = { VisitID: strVisitID, VisitValue: strVisitValue, TimeStamp: strTimeStamp.toString(), Sign: strSign.toString() };
    var strRequest = JSON.stringify(arrRequest);
    return strRequest;
}
/*********************访问结束*********************/
/*********************全局函数开始*********************/
function GetString(objValue) {
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return "";
    } else {
        return new String(objValue);
    }
}
function GetInt(objValue) {
    var intValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        intValue = parseInt(objValue);
    }
    return intValue;
}
function GetFloat(objValue) {
    var fltValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        fltValue = parseFloat(objValue);
    }
    return fltValue;
}
function GetDatetime(objValue) {
    var dtmValue = jsgDefaultTime;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        dtmValue = new Date(objValue);
    }
    return dtmValue;
}
function IsEmail(strEmail) {
    var regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    return regEmail.test(strEmail);
}
function GetParameterValue(strKey) {
    var strUrl = window.location.href;
    var intStart = strUrl.indexOf("?") + 1;
    var arrParameter = {};
    if (intStart !== 0) {
        var strQuery = strUrl.substring(intStart);
        var arrParaKey = strQuery.split("&");
        var arrSingle = [];
        var i = 0;
        for (; i < arrParaKey.length; i++) {
            arrSingle = arrParaKey[i].split("=");
            if (i === arrParaKey.length - 1) {
                var sIndex = arrSingle[1].indexOf("#");
                if (sIndex !== -1) {
                    arrSingle[1] = arrSingle[1].substring(0, sIndex);
                }
            }
            arrParameter[arrSingle[0]] = arrSingle[1]
        }
    }
    return decodeURIComponent(arrParameter[strKey] || "");
}
/*********************全局函数结束*********************/
function GetMemberID() {
    var arrParam = { UnionID: jsgUnionID,OpenID: jsgOpenID};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Com_GetMemberByWxID", strParam);
    $.ajax({
        type: "POST",
        url: jsgDataServer + jsgDataVisit,
        data: jsgSubmit,
        dataType: "json",
        async: false,
        beforeSend: function () {
        },
        success: function (objResult) {
            if (objResult.Result == 1) {
                var strMemberID = objResult.Model.MemberID;
                var strMemberGuide = objResult.Model.Guide;
                var strMerchantID = objResult.Model.MerchantID;
                var strWaiterID = objResult.Model.WaiterID;
                window.localStorage.setItem("MemberID", strMemberID);
                window.localStorage.setItem("MemberGuide", strMemberGuide);
                window.localStorage.setItem("MerchantID", strMerchantID);
                window.localStorage.setItem("WaiterID", strWaiterID);
                jsgMemberID = strMemberID; jsgMemberGuide = strMemberGuide; jsgMerchantID = strMerchantID; jsgWaiterID = strWaiterID;
            }else {
                alert(objResult.Message);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
    });
    return false;
}

function Denglu(){
    
    if(jsgMemberID==""){
        //location.href=jsgSiteHost+"/Mine/login.html"
        location.href="../Mine/login.html"
    }else{
        location.href="../Mine/mine.html"
    }
}

/*********************微信开始*********************/
/*********************微信脚本授权开始*********************/
var jsdWxJsapiAuthorize = $.Deferred();
function GetWxJsapiAuthorize(strHref) {
    $.ajax({
        url: jsgWxJsapiAuthorize,
        type: "POST",
        dataType: "JSON",
        data: { strUrl: strHref },
        success: function (objResult) {
            if (objResult.Result == 1) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: objResult.AppID, // 必填，公众号的唯一标识wx024418cfeab498fc
                    timestamp: objResult.Timestamp, // 必填，生成签名的时间戳
                    nonceStr: objResult.Noncestr, // 必填，生成签名的随机串
                    signature: objResult.Signature,// 必填，签名，见附录1
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    jsdWxJsapiAuthorize.resolve();
                    return jsdWxJsapiAuthorize.promise();
                });
                wx.error(function (res) {
                    alert("wx.error:" + res)
                });
            } else {
                alert(objResult.Message);
            }
        }, complete: function (XMLHttpRequest, textStatus) {},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	alert("失败了")
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

/*********************微信脚本授权结束*********************/
/*********************微信扫码开始*********************/
var jsdWxScancode = $.Deferred();
function WxScancode() {
    wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
        	//alert(JSON.stringify(res));
            jsdWxScancode.resolve(res.resultStr);
            return jsdWxScancode.promise();
        }
    });
}
/*********************微信扫码结束*********************/
/*********************处理二维码字符串并处理开始*********************/
function WxScanCancel(strHref) {
    GetWxJsapiAuthorize(strHref);
    $.when(jsdWxJsapiAuthorize).done(function () {
        WxScancode();
        $.when(jsdWxScancode).done(function (strResult) {
        	getConsumer(strResult);
            $.when(scanCodeFlag).done(function(scanCodeValue){
            	scanCodeBack(scanCodeValue);
            })
        });
    });
}
//根据扫码的结果获取消费码
var scanCodeFlag = $.Deferred();//得到正确的订单编码
function getConsumer(strResult){
	var arrActionParam = {
   		"Consume":strResult,
   		"TaitorID":jsgMemberID
   };
	var strActionName = "My_GetOrderByConsume";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = { strRequest: strRequest };
	$.ajax({
        type: "POST",
        url: jsgDataServer + jsgDataVisit,
        dataType : "json",
        data: datSubmit,
        timeout: 20000,
        beforeSend: function () {
        },
        success: function (objResult) {
        	if(objResult.Result == 1){
        		if(objResult.Model.OrderID){
        			scanCodeFlag.resolve(objResult.Model.OrderID);
                	return scanCodeFlag.promise();
        		}else{
        			alert("objResult.Model.OrderID为空了");
        		}
        	}else{
        		alert(objResult.Message);
        	}
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });
}
//退单的函数
function scanCodeBack(scanCodeValue){
	var arrActionParam = {
   		"strOrderID":scanCodeValue
  };
	$.ajax({
        type: "POST",
        url:jsgWxPayServer + "/UniformOrder/RefundOrder",
        dataType : "json",
        data: arrActionParam,
        timeout: 20000,
        beforeSend: function () {
        },
        success: function (objResult) {
        	if(objResult.Result == 1){
        		alert("退单成功");
        		window.location.reload();
        	}else{
        		alert(objResult.Message);
        	}
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });
}
//消费码查询商家消费处理
function ScanCodeConsume(strHref) {
    GetWxJsapiAuthorize(strHref);
    $.when(jsdWxJsapiAuthorize).done(function () {
        WxScancode();
        $.when(jsdWxScancode).done(function (strResult) {
        	getConsumeInfo(strResult);
        });
    });
}


function getConsumeInfo(scanCodeValue){
	var merchantID = localStorage.getItem("MerchantID");
	var waiterID = localStorage.getItem("WaiterID");
	var arrActionParam = {
   		"Consume":scanCodeValue,//消费码 
		"WaiterID":waiterID,//商家用户编码
		"MerchantID":merchantID
   };
	var strActionName = "My_CheckConsume";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = { strRequest: strRequest };
	$.ajax({
        type: "POST",
        url: jsgDataServer + jsgDataVisit,
        dataType : "json",
        data: datSubmit,
        timeout: 20000,
        beforeSend: function () {
        },
        success: function (objResult) {
        	/*alert("结果"+JSON.stringify(objResult))*/
        	if(objResult.Result == 1){
        		alert("消费成功");
        		window.location.reload();
        	}else{
        		alert(objResult.Message);
        	}
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });
}
/*********************消费码查询商家消费处理结束*********************/
/*********************处理二维码字符串并处理结束*********************/
/*********************上传头像开始*********************/
var jsdUploadImage = $.Deferred();
function UploadImage() {
    var images = {
        localId: []
    };
    wx.chooseImage({
        count: 1,
        success: function (res) {
            images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            var i = 0,
            length = images.localId.length;
            UploadChoose();
            function UploadChoose() {
                wx.uploadImage({
                    localId: images.localId[i],
                    success: function (res) {
                    	/*alert("res"+JSON.stringify(res))*/
                        jsdUploadImage.resolve(res.serverId, images.localId[i]);
                        return jsdUploadImage.promise();
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            }
        }
    });
}
var jsdGetHeadUrl=$.Deferred();
function GetHeadUrl(strMediaID){
	$.ajax({
        type: "POST",
        url: jsgImageServer + "/Picture/GetWxPicture",
        dataType : "json",
        data: {strMediaID:strMediaID},
        timeout: 20000,
        beforeSend: function () {
        },
        success: function (objResult) {
        	if(objResult.Result==1){
                jsdGetHeadUrl.resolve(objResult.SaveUrl);
                return jsdGetHeadUrl.promise();
        	}else{
        		alert(objResult.Message);
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });	

}

function fnUploadImg(strHref,mineuser) {
    GetWxJsapiAuthorize(strHref);
    $.when(jsdWxJsapiAuthorize).done(function () {
        UploadImage();
        $.when(jsdUploadImage).done(function (strResult, imgSrc) {
        	GetHeadUrl(strResult);
        	$.when(jsdGetHeadUrl).done(function(strHeadUrl){
				var arrActionParam = {"MemberID":mineuser,"Head":strHeadUrl};
			    var strActionParam = JSON.stringify(arrActionParam);
			    var strRequest = GetVisitData("My_UpdateMemberHead", strActionParam);
			    var datSubmit = { strRequest: strRequest };
				$.ajax({
			        type: "POST",
			        url: jsgDataServer + jsgDataVisit,
			        dataType : "json",
			        data: datSubmit,
			        timeout: 20000,
			        beforeSend: function () {
			        },
			        success: function (objResult) {
			        	if(objResult.Result==1){
							$("#headUrl").attr("src",jsgImageServer+strHeadUrl);
			        	}else{
			        		alert(objResult.Message);
			        	}
			        },
			        complete: function (XMLHttpRequest, textStatus) {
			        },
			        error: function (XMLHttpRequest, textStatus, errorThrown) {
			            alert(XMLHttpRequest.status);
			            alert(XMLHttpRequest.readyState);
			            alert(textStatus);
			            alert(errorThrown);
			        }
			   });
        	});
			//alert("ID+"+strResult);
			/*$("#print").val(strResult )*/
            //$("#headUrl").attr("src", imgSrc);

	    });
    });
}
/*********************上传头像结束*********************/
/*********************微信付款开始*********************/
var jsdGetWxPayUnified = $.Deferred();
function GetWxPayUnified(strOrderID) {
    if (GetString(strOrderID) == "") {
        alert("GetWxPayUnified：" + "strOrderID为空！");
        return false;
    }
    var strOpenID = "";
    if (window.localStorage.OpenID) strOpenID = GetString(window.localStorage.OpenID);
    if (strOpenID == "") {
        alert("GetWxPayUnified：" + "strOpenID为空！");
        return false;
    }
    $.ajax({
        url: jsgWxPayServer + "/UniformOrder/UniformOrderWx",
        type: "POST",
        dataType: "JSON",
        data: { strOrderID: strOrderID, strOpenID: strOpenID },
        //cache: false,
        //async: true,
        beforeSend: function () {},
        success: function (objResult, strStatus, jqXHR) {
            if (objResult.Result == 1) {
                jsdGetWxPayUnified.resolve(objResult);
                return jsdGetWxPayUnified.promise();
            } else {
                $(".loadbox").css("display", "none");
                alert("GetWxPayUnified：返回结果" + objResult.Result);
                return false;
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
}
function OrderformPayment(strOrderID) {
    GetWxPayUnified(strOrderID);
    $.when(jsdGetWxPayUnified).done(function (objResult) {
        if (objResult.Result == 1) {
            var json = objResult.PayParameter;
            callpay();
            function jsApiCall() {
                WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                json,
                function (res) {
                    //WeixinJSBridge.log(res.err_msg);
                    //var objOrder = {strOrderID:strOrderID};
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        //alert("支付成功！");
                        //alert(strOrderID);
                        //window.location.href = 'http://wx.nihaott.com/Traveler1/WxPayResult?strOrderID=' + strOrderID + '&intResult=1'
                        $.ajax({
                            url:jsgWxPayServer+"/UniformOrder/WxPaySucceedSynchro",
                            type: "POST",
                            dataType: "JSON",
                            async:false,
                            data: "strOrderID="+strOrderID,
                            beforeSend: function () {},
                            success: function (data) {
                                if(data.Result==1){
                                    alert(data.Message);
                                }else {
                                    alert(2+data.Message);
                                }
                            },
                            complete: function () {},
                            error: function (data) {
                                var aa=JSON.stringify(data);
                                alert("error"+aa);
                            }
                        });
                        window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";

                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        alert("失败！");
                        //window.location.href = 'http://wx.nihaott.com/Traveler1/WxPayResult?strOrderID=' + strOrderID + '&intResult=-1'
                        window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        alert("已取消！");
                        //window.location.href = 'http://wx.nihaott.com/Traveler1/WxPayResult?strOrderID=' + strOrderID + '&intResult=0'
                        window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";
                    }
                }
                );
            }
            function callpay() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                }
                else {
                    jsApiCall();
                }
            }
        } else {
            alert(objResult.Message)
        }
    });
}
var jsdNewOrderform = $.Deferred();
function NewOrderform(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList){

    var strUnionID="";
    if(window.localStorage.UnionID) strUnionID=window.localStorage.UnionID;
    if(GetString(strUnionID)==""){
        alert("NewOrderform：strUnionID为空!");
        return false;
    }
    var strOpenID="";
    if(window.localStorage.OpenID) strOpenID=window.localStorage.OpenID;
    if(GetString(strOpenID)==""){
        alert("NewOrderform：strOpenID为空!");
        return false;
    }
    var arrParam={"TailorID": strTailorID,"TravelerID":strTravelerID,"Name":strName,"Mobile": strMobile,"Identity": strIdentity,"SmsCode":strSmsCode,"UnionID":strUnionID,"OpenID":strOpenID,"GoodsList":stjGoodsList};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Index_CreateOrder", strParam);
    $.ajax({
        type: "POST",
        url: jsgDataServer + jsgDataVisit,
        dataType : "json",
        data: jsgSubmit,
        timeout: 20000,
        beforeSend: function () {
            $(".loadbox").css("display", "block");
        },
        success: function (objResult) {
            if(objResult.Result==1){
                jsdNewOrderform.resolve(objResult.Model);
                return jsdNewOrderform.promise();
            }else{
                $(".loadbox").css("display", "none");
                alert("NewOrderform：返回值：" + objResult.Result + "，错误：" + objResult.Message);
                
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });
}
function OrderformPayment1(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList){
    NewOrderform(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList);
    $.when(jsdNewOrderform).done(function (objResult) {
        jsgMemberID = objResult.TravelerID; jsgMemberGuide = 0;
        var strOrderID = objResult.OrderID
        window.localStorage.setItem("MemberID", jsgMemberID);
        window.localStorage.setItem("MemberGuide", jsgMemberGuide);
        GetWxPayUnified(strOrderID);

        $.when(jsdGetWxPayUnified).done(function (objResult) {
            $(".loadbox").css("display", "none");
            if (objResult.Result == 1) {
                var json = objResult.PayParameter;
                callpay();
                function jsApiCall() {
                    WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    json,
                    function (res) {
                        //WeixinJSBridge.log(res.err_msg);
                        //var objOrder = {strOrderID:strOrderID};
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert("支付成功！");
                            //alert(strOrderID);
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=1';
                           
                            //window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";

                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            alert("失败！");
                            //window.location.href = 'http://wx.nihaott.com/Traveler1/WxPayResult?strOrderID=' + strOrderID + '&intResult=-1'
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=-1';
                            //window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("已取消！");
                            //window.location.href = 'http://wx.nihaott.com/Traveler1/WxPayResult?strOrderID=' + strOrderID + '&intResult=0'
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=0';
                            //window.location.href=jsgSiteHost+"/Html5/Orderform/currentorder.html";
                        }
                    }
                    );
                }
                function callpay() {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                    }
                    else {
                        jsApiCall();
                    }
                }
            } else {
                alert(objResult.Message)
            }
        });
    });
}


function NewOrderform2(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList){
    var strUnionID="";
    if(window.localStorage.UnionID) strUnionID=window.localStorage.UnionID;
    if(GetString(strUnionID)==""){
        alert("NewOrderform：strUnionID为空!");
        return false;
    }
    var strOpenID="";
    if(window.localStorage.OpenID) strOpenID=window.localStorage.OpenID;
    if(GetString(strOpenID)==""){
        alert("NewOrderform：strOpenID为空!");
        return false;
    }
    var arrParam={"TailorID": strTailorID,"TravelerID":strTravelerID,"Name":strName,"Mobile": strMobile,"Identity": strIdentity,"SmsCode":strSmsCode,"UnionID":strUnionID,"OpenID":strOpenID,"GoodsList":stjGoodsList};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Index_CreateOrder", strParam);
    $.ajax({
        type: "POST",
        url: jsgDataServer + jsgDataVisit,
        dataType : "json",
        data: jsgSubmit,
        timeout: 20000,
        beforeSend: function () {
            $(".loadbox").css("display", "block");
        },
        success: function (objResult) {
            if(objResult.Result==1){
                jsdNewOrderform.resolve(objResult.Model);
                return jsdNewOrderform.promise();
            }else{
                $(".loadbox").css("display", "none");
                alert("NewOrderform：返回值：" + objResult.Result + "，错误：" + objResult.Message);
                
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert(errorThrown);
        }
   });
}
function OrderformPayment2(strTailorID,strUnionID,strOpenID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,strRegionID,strAddress,datPlay,stjGoodsList){
    NewOrderform2(strTailorID,strTravelerID,strName,strMobile,strIdentity,strSmsCode,stjGoodsList);
    $.when(jsdNewOrderform).done(function (objResult) {
        jsgMemberID = objResult.TravelerID; jsgMemberGuide = 0;
        var strOrderID = objResult.OrderID;
        window.localStorage.setItem("MemberID", jsgMemberID);
        window.localStorage.setItem("MemberGuide", jsgMemberGuide);
       // GetWxPayUnified(strOrderID);

        //$.when(jsdGetWxPayUnified).done(function (objResult) {
            $(".loadbox").css("display", "none");
            if (objResult.Result == 1) {
                var json = objResult.PayParameter;
                alert(json);
                callpay();
                function jsApiCall() {
                    WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    json,
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert("支付成功！");
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=1';

                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            alert("失败！");
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=-1';
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("已取消！");
                            window.location.href = jsgSiteHost+'/Html5/Orderform/currentorder.html?strOrderID=' + strOrderID + '&intResult=0';
                        }
                    }
                    );
                }
                function callpay() {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                    }
                    else {
                        jsApiCall();
                    }
                }
            } else {
                alert(objResult.Message)
            }
        });
    //});
}
/*********************微信付款结束*********************/
/*********************微信结束*********************/

