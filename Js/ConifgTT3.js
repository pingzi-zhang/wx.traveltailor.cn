var jscHttpUrl = "http://ttwxapi.traveltailor.cn";//数据接口访问域名
//var jscImageUrl = "http://ttimgapitest.nihaott.com";//图片接口访问域名
var jscPartnerID = "zhtt3Test";//伙伴编码
var jscApplyID = "wxtt3Test";//应用编码
var jscSignKey = "w1F3BK8HrFE9dd6H";//验签密码
var jscSubmit = "";//提交参数
var jscDefaultTime = new Date(1900, 1, 1);//默认日期时间
var jscParameter = "", jscRequest = "";
var jscWxJsapiParameters = "";//微信付款需要的统一下单参数
var jscOrderID = "";//订单号
var jscTimeout = 20000;
/*********************接口地址begin*********************/
var jscGetSnsapiAuthorizeWx = "/";//获取微信用户信息授权地址
var jscGetJsapiAuthorizeWx = "/";//获取微信普通授权地址
var jscGetMemberLoginUnionOpen = "/LoginRegister/GetMemberLoginUnionOpen";//根据微信编码获取会员登录信息
var jscGetHomeList = "/Home/GetMemberList";//
var jscGetValidPage = "/Orderform/GetValidPage";//
var jscMinShengWxPay = "/Orderform/CreateMsWxOrderform";//民生银行微信公众号支付
/*********************接口地址end*********************/
function GetRandomStringTT3(intLength) {
    intLength = intLength || 16;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < intLength; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function GetTimeStampTT3() {
    var dtmNow = new Date();
    dtmNow.setMinutes(dtmNow.getMinutes() + dtmNow.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
    return dtmNow.getTime().toString();
}
function GetSignMd5TT3(strActionParam, strTimeStamp) {
    var strSign = jscApplyID;
    strSign += "&" + jscSignKey;
    strSign += "&" + strActionParam;
    strSign += "&" + strTimeStamp;
    return CryptoJS.MD5(strSign);
}
function GetVisitDataTT3(strActionParam) {
    var arrVisitValue = { PartnerID: jscPartnerID, ApplyID: jscApplyID, ActionParam: strActionParam };
    var strVisitValue = JSON.stringify(arrVisitValue);
    var strVisitID = GetRandomStringTT3(16);
    strVisitValue = CryptoJS.AES.encrypt(strVisitValue, CryptoJS.enc.Utf8.parse(strVisitID), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    strVisitValue = encodeURI(strVisitValue);
    strVisitValue = strVisitValue.replace(/\+/g, '%2B');
    strVisitValue = strVisitValue.replace(/\=/g, '%4S');
    var strTimeStamp = GetTimeStampTT3();
    var strSign = GetSignMd5TT3(strActionParam, strTimeStamp.toString());
    var arrRequest = { VisitID: strVisitID, VisitValue: strVisitValue, TimeStamp: strTimeStamp.toString(), Sign: strSign.toString() };
    var strRequest = JSON.stringify(arrRequest);
    return strRequest;
}
/*********************微信支付begin*********************/
function WxJsapiPay() {
    WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    jscWxJsapiParameters,//josn串
     function (res) {
         var strResult = res.err_msg;
         alert(strResult);
         alert(jsgSiteHost + "/Html5/OrderDetails.html?strOrderID=" + jscOrderID + "&intResult=1");
         //WeixinJSBridge.log(res.err_msg);
         if (strResult == "get_brand_wcpay_request:ok") {//成功
             window.location.href = jsgSiteHost + "/Html5/OrderDetails.html?strOrderID=" + jscOrderID + "&intResult=1";
         } else if (strResult == "get_brand_wcpay_request:fail") {
             window.location.href = jsgSiteHost + "/Html5/Orderform/currentOrder.html?strOrderID=" + jscOrderID + "&intResult=-1";
         } else if (strResult == "get_brand_wcpay_request:cancel") {
             window.location.href = jsgSiteHost + "/Html5/Orderform/currentOrder.html?strOrderID=" + jscOrderID + "&intResult=0";
         }
     }
     );
}
function WeChatPayment () {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', WxJsapiPay, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', WxJsapiPay);
            document.attachEvent('onWeixinJSBridgeReady', WxJsapiPay);
        }
    }
    else {
        WxJsapiPay();
    }
}
/*********************微信支付end*********************/
/*********************创建民生银行微信支付订单begin*********************/
var jsdCreateMsWxOrderform = $.Deferred();
function CreateMsWxOrderform(strTailorID, strGoodsList, strUnionID, strOpenID, strTravelerID, strName, strMobile, strIdentity, strSmsCode, strRegionID, strAddress, datPlay) {
    arrParameter = { "strTailorID": strTailorID, "strGoodsList": strGoodsList, "strUnionID": strUnionID, "strOpenID": strOpenID, "strTravelerID": strTravelerID, "strName": strName, "strMobile": strMobile, "strIdentity": strIdentity, "strSmsCode":strSmsCode, "strRegionID": strRegionID, "strAddress": strAddress, "datPlay": datPlay};
    jscParameter = JSON.stringify(arrParameter);
    jscRequest = "strRequest=" + GetVisitDataTT3(jscParameter);
    $.ajax({
        url: jscHttpUrl + "/Orderform/CreateMsWxOrderform",
        data: jscRequest,
        type: "POST",
        timeout: jscTimeout,
        cache: false,
        async: true,
        dataType: "JSON",
        beforeSend: function () {
        },
        success: function (objResult, strStatus, jqXHR) {
            if (objResult.Result) {
                //alert(JSON.stringify(objResult));
                if (objResult.Result == 1) {
                    jsdCreateMsWxOrderform.resolve(objResult.Model);
                    return jsdCreateMsWxOrderform.promise();
                } else {
                    alert(objResult.Message);
                }
            } else {
                alert(JSON.stringify(objResult));
            }
        },
        complete: function () {
        	$(".loadbox").hide();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
/*********************创建民生银行微信支付订单end*********************/
/*********************民生银行微信支付begin*********************/
function MsWxOrderform(strTailorID, strGoodsList, strUnionID, strOpenID, strTravelerID, strName, strMobile, strIdentity, strSmsCode, strRegionID, strAddress, datPlay) {
    jsdCreateMsWxOrderform = $.Deferred();
    CreateMsWxOrderform(strTailorID, strGoodsList, strUnionID, strOpenID, strTravelerID, strName, strMobile, strIdentity, strSmsCode, strRegionID, strAddress, datPlay);
    $.when(jsdCreateMsWxOrderform).done(function (objResult) {
		jsgMemberID = objResult.TravelerID;
		jsgMemberGuide = 0;
		jsgMerchantID = objResult.MerchantID;
		jsgWaiterID = objResult.WaiterID;
		jsgMemberName=objResult.Name;
		jsgMemberMobile=objResult.Mobile;
		jsgMemberI=objResult.Identity;
		jsgMemberAdress=objResult.Address;
		jsgMemberRegion=objResult.RegionID;
        window.localStorage.setItem("MemberID", objResult.TravelerID);
        window.localStorage.setItem("MemberGuide", 0);
        window.localStorage.setItem("MerchantID", objResult.MerchantID);
        window.localStorage.setItem("WaiterID", objResult.WaiterID);
        window.localStorage.setItem("MemberName", objResult.Name);
        window.localStorage.setItem("MemberMobile", objResult.Mobile);
        window.localStorage.setItem("MemberI", objResult.Identity);
        window.localStorage.setItem("MemberAdress", objResult.Address);
        window.localStorage.setItem("MemberRegion", objResult.RegionID);
        jscOrderID=objResult.OrderID;
        jscWxJsapiParameters = objResult.WxUnified;
        WeChatPayment();
    });
}

/*********************民生银行微信支付end*********************/