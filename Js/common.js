if (unescape(window.location.href).split("?").length >= 2) {
    for (var strAfferentP in unescape(window.location.href).split("?")[1].split("&")) {
        if (strAfferentP.split("=").length <= 1) continue;
        if (strAfferentP.split("=")[0] == "intVisit") {
            jsgVisit = GetInt((strAfferentP.split("=")[1]));
        } else if (strAfferentP.split("=")[0] == "strTargetID") {
            jsgTargetID = GetString((strAfferentP.split("=")[1]));
        }
    }
}

if (!window.localStorage.UnionID || !window.localStorage.OpenID) {
    window.location.href = jsgSiteHost + "/Weixin/Index?intVisit=" + jsgVisit + "&strTargetID=" + jsgTargetID;
} else {
    jsgUnionID = GetString(window.localStorage.getItem("UnionID"));
    jsgOpenID = GetString(window.localStorage.getItem("OpenID"));
    jsgMemberID = GetString(window.localStorage.getItem("MemberID"));
    jsgMemberGuide = GetInt(window.localStorage.getItem("MemberGuide"));
    jsgMerchantID = GetString(window.localStorage.getItem("MerchantID"));
    jsgWaiterID = GetString(window.localStorage.getItem("WaiterID"));
    if (jsgUnionID == "" || jsgOpenID == "") window.location.href = jsgSiteHost + "/Weixin/Index?intVisit=" + jsgVisit + "&strTargetID=" + jsgTargetID;
}
var jsgVistHost = jsgDataServer + jsgDataVisit;

$("input").focus(function(){
	$(".footer").css("position","static");
})
$("input").blur(function(){
	$(".footer").css({"position":"fixed"});
})
var mineuser = window.localStorage.getItem("MemberID");
var unid=window.localStorage.getItem("UnionID");
var opid=window.localStorage.getItem("OpenID");
var imgUpload = {
	//ajax请求数据
	    method:function(mdata,success){
	    	//console.log(mdata)
	        $.ajax({
	            type: "POST",
	            url: jsgVistHost,
	            dataType : "json",
	            data: mdata,
	            timeout: 20000,
	            beforeSend: function () {
	            	//$(".loadbox").css("display", "block");
	            },
	            success: function (data) {
	                //console.log(data);
	                success?success(data):function(){};
	                /*if(data.Result==1){
	                	success?success(data):function(){};
	                }else if(data.Result==-99){
	                	console.log(data.Message)
	                }*/
	            },
	            complete: function () {
					//$(".loadbox").css("display", "none");
				},
	            error: function (data) {
	                console.log(data);
	                
	            }
	        });
	    }
	}

function public(strActionName,arrActionParam){
    	var arrActionParam = {
	       	
	    };
    	var strActionName = strActionName;
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    return datSubmit;
    }
    