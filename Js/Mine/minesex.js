$(function(){
	var mineuser = window.localStorage.getItem("MerchantID");
	function getUrlParam(){
        //?city=%E7%9F%B3%E5%AE%B6%E5%BA%84&indate=2016-8-19&outdate=2016-8-24
        //?city=石家庄&indate=2016-8-19&outdate=2016-8-24
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
   	var urlbudet=urlbulterdetail.sex_id;
   	$(".na").val(urlbudet);
	var slideSelector = function(){
           /* this.wrapper = document.querySelector('.slide-selector')*/
            this.init();
        };
        slideSelector.prototype = {
            init:function(){
                if(!document.querySelector('.slide-selector')){
                    var _div = document.createElement('div');
                    _div.className = 'slide-selector';
                    this.wrapper = _div;
                    document.querySelector('.login').appendChild(_div);
                }else{
                    this.wrapper = document.querySelector('.slide-selector');
                }

                this.bindEvent();
            },
            tpl: '<header class="slide-header"><div class="slide-title">{title}</div><span class="slide-cancel">取消</span></header>'+
            '<div class="slide-options">{content}</div>',
            bindEvent:function(){
                var that = this;

                this.wrapper.addEventListener('click',function(e){
                    var ev = e || window.event, target = ev.target || ev.srcElement;
                    if(target.tagName.toUpperCase() == "P"){
                        var selectedData = target.getAttribute('data');
                        var txt = target.innerHTML;
                        that.data.callback({
                            selected:selectedData,
                            txt:txt
                        });
                        that.hide();
                        return;
                    }
                    if(target.className == 'slide-cancel'){
                        that.hide()
                    }

                },false)
            },
            show:function(data){
                this.data = data;
                this.render();
                this.wrapper.className = this.wrapper.className+' slide-active';
                document.querySelector('.mask-layer').className
                        = document.querySelector('.mask-layer').className+' show';
            },
            render:function(){
                var _data = this.data, str='';
                _data.data.forEach(function(v,i){
                    str += '<p class="slide-option" data="'+i+'">'+v+'</p>';
                });
                this.tpl = this.tpl.replace('{title}',_data.title).replace('{content}',str);
                this.wrapper.innerHTML = this.tpl;
            },
            hide:function(){
                this.wrapper.className = this.wrapper.className.replace('slide-active','');
                document.querySelector('.mask-layer').className=document.querySelector('.mask-layer').className.replace('show','');

            }
        };


        var ss = new slideSelector();

        document.querySelector('.na').addEventListener('click',function(){
            ss.show({
                title:'请选择您的性别',
                init: 1,
                data:['女','男'],
                callback:function(selected){
         			var sexid=selected.selected;
         			console.log(sexid)
                    document.querySelector('.na').value = selected.txt;
                    $("#save").on("click",function(){
						function public2(strActionName,arrActionParam){
					    	var arrActionParam = {
						       	"MemberID":jsgMemberID,
						       	"Sex":sexid
						    };
					    	var strActionName = strActionName;
						    var strActionParam = JSON.stringify(arrActionParam);
						    var strRequest = GetVisitData(strActionName, strActionParam);
						    var datSubmit = { strRequest: strRequest };
						    return datSubmit;
					   }
						imgUpload.method(public2('My_UpdateMemberSex'),function (data) {
							console.log(data)
							if(data.Result==1){
								location.href="../../Html5/Mine/mineEditprofile.html"
							}
						});
						
					})
                }
            });
        },false)
})