(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1])}return r},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0'}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b'}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '))}};$.browserTest(navigator.userAgent)})(jQuery);

var ISIE = $.browser.msie,
	VERSION = $.browser.version,
	U_F = 'undefined',
	IE6 = $.browser.version == "6.0",
	ISIE9lt = $.browser.msie && parseInt($.browser.version)<9,
	ISIE9lte = $.browser.msie && parseInt($.browser.version)<=9;

if(typeof console != 'object'){
	var console={log:function(){}};
}

var cep_url = '';
var cms_url = '';
var cms_sel_url = '';
var ds_url = '';
var sms_url = '';
var login_url = '';

var webXY = location.protocol;
	if(webXY == "http:"){
		cep_url = 'http://uba1.roewe.com.cn';
		cms_url = 'http://cms.cep.roewe.com.cn';
		cms_sel_url = 'http://www.roewe.com.cn';
		ds_url = 'http://openapi.roewe.com.cn';
		sms_url = 'http://cep.roewe.com.cn/';
		login_url = 'http://member.roewe.com.cn/roewe-member-server';
	}
	if(webXY == "https:"){
		cep_url = 'https://uba1.roewe.com.cn';
		cms_url = 'https://cms.cep.roewe.com.cn';
		cms_sel_url = 'https://www.roewe.com.cn';
		ds_url = 'https://openapi.roewe.com.cn';
		sms_url = 'https://cep.roewe.com.cn/';
		login_url = 'https://member.roewe.com.cn/roewe-member-server';
	}

var code;

//运行提示框
var walert={
	washow:0,
	wa:'',
	shade:'',
	contdiv:'',
	butok:'',
	loadimg:'',
	txt:'',
	text:function(t,img){
		img = typeof img == U_F ? 'load' : img;
		walert.createwa();
		walert.txt.text(t);
		switch(img){
		case 'load':walert.loadimg.attr('src','images/loading.gif');walert.contdiv.attr('class','contdiv contdivload');break;
		case 'ok':walert.loadimg.attr('src','images/20_tick.png');walert.contdiv.attr('class','contdiv contdivok');break;
		case 'wa':walert.loadimg.attr('src','images/20_alert.png');walert.contdiv.attr('class','contdiv contdivwa');break;
		case 'er':walert.loadimg.attr('src','images/20_alert.png');walert.contdiv.attr('class','contdiv contdiver');break;
		}
		walert.loadimg[img?'show':'hide']();
		return walert;
	},
	ok:function(t,fun){
		walert.createwa();
		if(t===false){
			walert.butok.hide();
		}else{
			t=t || '确 定';
			fun=typeof fun==U_F?0:fun;
			walert.butok.fadeIn(500).val(t);
			if(fun!=0){
				walert.butok.unbind('click').click(fun);
			}
		}
		walert.butok[0].focus();
		return walert;
	},
	show:function(){
		walert.createwa();
		walert.washow=1;
		walert.jista();
		walert.wa.show();
		walert.butok.unbind('click').click(walert.close);
		walert.butok[0].focus();
		return walert;
	},
	close:function(){
		walert.createwa();
		walert.washow=0;
		walert.wa.hide();
		$('body').css('overflow','auto');
		return walert;
	},
	createwa:function(){
		if(walert.wa==''){
			walert.wa=$('<div>').attr({'class':'walert',id:'walert'});
			walert.wa.html('<div class="contdiv"><div class="cont"><img class="loadimg" src="images/loading.gif" /><span class="text"></span></div><div class="butts"><input type="button" class="BUTN2 butnok" value="确 定" /></div></div><div class="shade"></div>');
			walert.shade=walert.wa.children('.shade');
			walert.contdiv=walert.wa.children('.contdiv');
			walert.butok=walert.contdiv.find('.butnok');
			walert.loadimg=walert.contdiv.find('.loadimg');
			walert.txt=walert.contdiv.find('.text');
			walert.wa.appendTo('body');
			$(window).resize(walert.jista);
		}
	},
	jista:function(){
		if(walert.wa!='' && walert.washow==1){
			$('body').css('overflow','hidden');
			var $w=$(window),w=$w.width(),h=$w.height(),w2=w/2,h3=h/3;
			walert.wa.css('top',$w.scrollTop());
			walert.shade.css({width:w,height:h});
			walert.contdiv.css({left:w2-360/2,top:h3-120/2});
		}
	}
};

//处理success的结朿
function msgsuccess(m){
	var mt=m.substr(0,2),mg=m.substr(2);
	if(mt!='OK' && mt!='ER' && mt!='MG' && mt!='OJ'){
		mt='PE';
		mg='Server is busy, please re-run the operation！';
	}
	if(mt=='OJ'){
		var mjstr='var mj='+mg;
		eval(mjstr);
		if(typeof mj!=U_F){
			return $.extend(mj,{mt:'OK'});
		}else{
			return {mt:mt,mg:mg};
		}
	}else{
		return {mt:mt,mg:mg};
	}
}

//取得表单中元素的内容
// $.fn.w_getInputs=function(){
// 	var value={};
// 	this.find('input[name],textarea[name],select[name]').each(function(){
// 		var el=$(this),
// 		atype=el.attr('type'),
// 		aname=el.attr('name');
// 		switch(atype){
// 		case "hidden":
// 		case "password":
// 		case "text":
// 			value[aname]=el.val();
// 			break;
// 		case "checkbox":
// 			value[aname]=(el.attr('checked'))?el.val():0;
// 			break;
// 		case "radio":
// 			if(el.attr('checked')){ value[aname]=el.val();}
// 			break;
// 		default:
// 			value[aname]=el.val();
// 		}
// 	});
// 	return value;
// };

// $.fn.w_hoverClass=function(op){
// 	var op=$.extend({},$.fn.w_hoverClass.defaults,op);
// 	var arrcss=op.css.split(' ');
// 	return this.each(function(){
// 		var el=$(this);
// 		el.mouseenter(function(){setclass.call(el,'add');}).mouseleave(function(){setclass.call(el,'remove');});
// 	});

// 	function setclass(z){
// 		e=$(this);
// 		for(var i=0;i<arrcss.length;i++){
// 			e[z+'Class'](arrcss[i]);
// 		}
// 	}
// };

// $.fn.w_hoverClass.defaults={
// 	css:''
// };

//设置某个输入框在没有输入值时的显示文字和样式
// $.fn.w_nullInputState=function(s,c){
// 	if(c==undefined){var c='';}
// 	return this.each(function(){
// 		if(this.value==''){
// 			this.value=s;
// 		}
// 		$(this).focus(function(){
// 			if(this.value==s){
// 				this.value='';
// 				c!='' && $(this).addClass(c);
// 			}
// 		})
// 		.blur(function(){
// 			if(this.value==''){
// 				this.value=s;
// 				c!='' && $(this).removeClass(c);
// 			}
// 		});
// 	});
// };

//jquery扩展内容验证
// $.w_check_isemail=function(val){
// 	var sReg=/[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
// 	if(!sReg.test(val)){
// 		return false;
// 	}else{
// 		return true;
// 	}
// };

//延迟执行一个动作
$.fn.timeRun=function(t,par){
	if(par==undefined){var par=['hide',[100]];}
	return this.each(function(){
		var el=$(this);
		if(t=='stop'){
			clearTimeout(el.data('hidetimenum'));
		}else{
			clearTimeout(el.data('hidetimenum'));
			el.data('hidetimenum',setTimeout(hide,t));
		}
		function hide(){
			if(par[1]==undefined){par[1]=[];}
			el[par[0]].apply(el,par[1]);
		}
	});
};

//移动到某个元素的位置，相当于#
$.goDiv=function(a,b){
	var $id=typeof(a)=='string'?$(a):a;
	b=b||300;
	var c=-3,$id=$(a),pos=$id.offset();
	if(b==-1){
		$(window).scrollTop(pos.top+c)
	}else{
		$('html,body').stop(true).animate({scrollTop:pos.top+c},b,'easeOutExpo');
	}
};

//结束超链接的链接事件
function stopDefault( e )
{
	if ( e && e.preventDefault ){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
	return false;
}

//异步执行
function runtoajax(e,a,fun,href)
{
	var $a=$(a);
	$.ajax({
		url: (href?href:$a.attr('href'))+'-ajaxtrue-1',
		dataType:'html',
		success: function(data){
			if(data.substr(0,3)=='var'){
				var dd=data.substr(3);
				if(typeof(fun)=='function'){
					fun.call(this,a,dd);
				}else{
					$a.text(fun[dd]);
				}
			}else{
				alert('操作失败');
			}
		}
	});
	e && stopDefault(e);
};

//per参数，表示不对宽除高比例值为per的图片进行处理⾿
$.fn.w_fullimg=function(per){
	per=per || 1.5;
	return this.each(function(){
		var p=parseFloat($(this).attr('width')/$(this).attr('height'));
		if(p!=per){
			var self=$(this),
			spar=self.parent(),
			w=spar.width(),
			h=spar.height(),
			top=p>per?0:(h-w/p)/2,
			left=p>per?(w-h*p)/2:0,
			nw=p>per?'auto':w,
			nh=p>per?h:'auto';
			spar.css('position','relative');
			self.css({position:'absolute',width:nw,height:nh,top:top,left:left});
		}
	});
};

$.fn.w_centerimg=function(per){
	per=per || 1.5;
	return this.each(function(){
		var p=parseFloat($(this).attr('width')/$(this).attr('height'));
		if(p!=per){
			var self=$(this),
			spar=self.parent(),
			w=spar.width(),
			h=spar.height(),
			top=p<per?0:(h-w/p)/2,
			left=p<per?(w-h*p)/2:0,
			nw=p<per?'auto':w,
			nh=p<per?h:'auto';
			spar.css('position','relative');
			self.css({position:'absolute',width:nw,height:nh,top:top,left:left});
		}
	});
};

// function formajaxsubmit($form,fun){
// 	walert.text('正在请求...','load').ok(false).show();
// 	$form.ajaxSubmit({
// 		success:function(m){
// 			m=msgsuccess(m);
// 			if(m.mt=='OK'){
// 				walert.close();
// 				fun.apply(null,[m.mg]);
// 			}else if(m.mt=='ER'){
// 				walert.text(m.mg,'wa').show().ok('');
// 			}else{
// 				walert.text(m.mg,'wa').show().ok('');
// 			}
// 		}
// 	});
// }

//cookie操作
// jQuery.cookie = function(name, value, options) {
//     if (typeof value != 'undefined') { // name and value given, set cookie
//         options = options || {};
//         if (value === null) {
//             value = '';
//             options.expires = -1;
//         }
//         var expires = '';
//         if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
//             var date;
//             if (typeof options.expires == 'number') {
//                 date = new Date();
//                 date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
//             } else {
//                 date = options.expires;
//             }
//             expires = '; expires=' + date.toUTCString();
//         }
//         var path = options.path ? '; path=' + (options.path) : '';
//         var domain = options.domain ? '; domain=' + (options.domain) : '';
//         var secure = options.secure ? '; secure' : '';
//         document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
//     } else {
//         var cookieValue = null;
//         if (document.cookie && document.cookie != '') {
//             var cookies = document.cookie.split(';');
//             for (var i = 0; i < cookies.length; i++) {
//                 var cookie = jQuery.trim(cookies[i]);
//                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// };

//视频播放
// var videobox={
// 	el:'',
// 	init:function(){
// 		videobox.el=$('<div id="playvideo_k"><div class="shade"></div><div class="playvideo"><a class="close" onclick="videobox.close();">关闭</a><div class="cont"></div></div></div>');
// 		videobox.el.appendTo('body');
// 	},
// 	play:function(url){
// 		videobox.el.find('.cont').html('');
// 		videobox.el.show();
// 		var $playaim=$('<video width="716" height="402" src="'+url+'" type="video/mp4" controls="controls" preload="none"></video>');
// 		videobox.el.find('.cont').append($playaim);
// 		$playaim.mediaelementplayer({
// 			success: function(media, node) {
// 				media.play();
// 			}
// 		});
// 	},
// 	close:function(){
// 		videobox.el.hide();
// 		videobox.el.find('.cont').html('');
// 	}
// };

//获取GPS
// var getlocation=function(fun,errfun){
// 	// window.navigator.geolocation.getCurrentPosition(function(res){
// 	// 	var poi=new BMap.Point(res.coords.longitude,res.coords.latitude);
// 	// 	var convertor = new BMap.Convertor();
// 	// 	var pointArr = [];
// 	// 	pointArr.push(poi);
// 	// 	convertor.translate(pointArr, 1, 5, function(data){
// 	// 		console.log(data.status);
// 	// 		var geoc = new BMap.Geocoder();
// 	// 		geoc.getLocation(data.points[0], function(rs){
// 	// 			var addComp = rs.addressComponents;
// 	// 			//alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
// 	// 			fun.call(null,{type:'web',lng:res.coords.longitude,lat:res.coords.latitude,city:addComp.city});
// 	// 		});
// 	// 	});
// 	// }, function(error){
// 		var myCity = new BMap.LocalCity();
// 		myCity.get(function(result){
// 			fun.call(null,{type:'web',lng:0,lat:0,city:result.name});
// 		});
// 	//}, {enableHighAccuracy: true,timeout:5000,maximumAge:60000});
// }

//定位省市下拉框
// lbsgeosel={
// 	init:function(){
// 		var options='<option value="省">省</option>';
// 		$.each(allgeo,function(i,item){
// 			options+='<option value="'+item.name+'">'+item.name+'</option>';
// 		});
// 		$('#lbs_k .sheng').html(options);
// 		$('#lbs_k .sheng').change(function(){
// 			$(this).prev().text($(this).val());
// 			$('#lbs_k .shi').html('');
// 			$('#lbs_k .shi').prev().text('市');
// 			lbsgeosel.getshi($(this).val());
// 		});
// 		$('#lbs_k .shi').change(function(){
// 			$(this).prev().text($(this).val());
// 		});
// 	},
// 	getshi:function(v){
// 		if(!v) return false;
// 		var options='<option value="市">市</option>',allshi=[];
// 		$.each(allgeo,function(i,item){
// 			if(item.name==v){
// 				allshi=item.city;
// 				return false;
// 			}
// 		});
// 		$.each(allshi,function(i,item){
// 			options+='<option value="'+item.name+'">'+item.name+'</option>';
// 		});
// 		$('#lbs_k .shi').html(options);
// 	}
// };

// 检查用户状态并加载相应地址
// var lbsselprovince='',lbsselcity='',hasshowbuts2=0;
// function checkandshow(aj){
// 	var cookietime = new Date();
// 	cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));
// 	//$lbs_k=$('<div id="lbs_k"><div class="shade" onclick="$(\'#lbs_k\').hide();$(\'body\').css(\'overflow\',\'auto\');"></div>	<div class="cont_k"><h2></h2><h1>正在定位……<span></span></h1><p class="definfo">请确认您的所在区域，以便我们为您提供更优质和准确的服务</p><p class="selinfo">请准确选择您的所在区域，以便我们为您提供更优质和准确的服务</p><div class="selfsel_k"><div><span>省</span><select class="sheng"></select></div><div><span>市</span><select class="shi"></select></div></div><div class="buts1_k"><a class="butok" href="#">确认</a><a class="butre butsel" href="#">重新选择</a></div><div class="buts2_k"><a class="butself butsel" href="#">手动选择</a></div></div></div>');
// 	//$('body').append($lbs_k);
// 	// $lbs_k.find('.butok').click(function(){
// 	// 	//console.log(lbsselprovince+'|||'+lbsselcity);
// 	// 	if(lbsselcity=='市' || lbsselcity==''){
// 	// 		alert('请选择您所处区域');
// 	// 	}else{
// 	// 		$.cookie('lbs_reload', 1, {expires:cookietime});
// 	// 		$.cookie('lbs_province', lbsselprovince, {expires:cookietime});
// 	// 		$.cookie('lbs_city', lbsselcity, {expires:cookietime});
// 	// 		window.location.href='/';
// 	// 	}
// 	// });
// 	// $lbs_k.find('.butsel').click(function(){
// 	// 	$lbs_k.find('h1').html('选择您所处区域');
// 	// 	$lbs_k.find('.selfsel_k').show();
// 	// 	$lbs_k.find('.buts2_k').hide();
// 	// 	$lbs_k.find('.buts1_k').show();
// 	// 	$lbs_k.find('.buts1_k .butre').hide();
// 	// 	lbsselcity='';
// 	// 	lbsgeosel.init();
// 	// });
// 	// $lbs_k.find('.sheng').change(function(){
// 	// 	lbsselprovince=$(this).val();
// 	// 	lbsselcity='';
// 	// });
// 	// $lbs_k.find('.shi').change(function(){
// 	// 	lbsselcity=$(this).val();
// 	// });
// 	if($.cookie("lbs_city")!=null && $.cookie("lbs_city")!=''){
// 		getlocation(function(op){
// 			if($.cookie("lbs_city")!=op.city && !$.cookie("lbs_reload")){
// 				// $('body').css('overflow','hidden');$lbs_k.show();
// 				// $lbs_k.find('h1').html('您所处区域是- <span>'+op.city+'</span>');
// 				// $lbs_k.find('.buts1_k').show();
// 				// lbsselcity=op.city;
// 				$.cookie('lbs_reload', 1, {expires:cookietime});
// 				$.cookie('lbs_city', op.city, {expires:cookietime});
// 			}else{
// 				// if(aj==1){
// 				// 	window.location.href='/';
// 				// }
// 			}
// 		});
// 	}else{
// 		// var buts2time=setTimeout(function(){
// 		// 	$lbs_k.find('.buts2_k').show();
// 		// 	hasshowbuts2=1;
// 		// },2000);
// 		// $('body').css('overflow','hidden');$lbs_k.show();
// 		getlocation(function(op){
// 			if(!hasshowbuts2){
// 				// clearTimeout(buts2time);
// 				// $lbs_k.find('h1').html('您所处区域是- <span>'+op.city+'</span>');
// 				// $lbs_k.find('.buts1_k').show();
// 				// lbsselcity=op.city;
// 				// 以下二期需要删除
// 				$.cookie('lbs_reload', 1, {expires:cookietime});
// 				$.cookie('lbs_city', op.city, {expires:cookietime});
// 			}
// 		});
// 	}
// }

//投诉建议
// function createCode(){
// 		code = new Array();
// 		var codeLength = 4;//验证码的长度
// 		var checkCode = document.getElementById("checkCode");
// 		checkCode.value = "";

// 		var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

// 		for(var i=0;i<codeLength;i++) {
//    		var charIndex = Math.floor(Math.random()*32);
//    		code +=selectChar[charIndex];
// 		}
// 		if(code.length != codeLength){
// 		   createCode();
// 		}
// 			checkCode.value = code;
// }

// function validate () {
// 		var inputCode = document.getElementById("codes").value.toUpperCase();

// 		if(inputCode.length <=0) {
// 		   alert("请输入验证码!");
// 		   $( "#codes").focus();
// 		   return false;
// 		}
// 		else if(inputCode != code ){
// 		   alert("验证码输入错误！");
// 		   createCode();
// 		   $( "#codes").focus();
// 		   return false;
// 		}
// 		else {
// 		   //alert("成功!");
// 		   return true;
// 		}
// }

// function baidusearch () {
// 	var wd=document.getElementsByName("searchtxt")[0].value;
// 	var link="https://www.baidu.com/s?si=www.roewe.com.cn/&cl=3&ct=2097152&ie=utf-8&tn=baidulocal&word="+encodeURIComponent(wd);
// 	window.open(link);
// }

// function cmssearch () {
// 	var wd=document.getElementsByName("searchtxt")[0].value;
// 	var link=cms_sel_url+'/search/search.html?q='+encodeURIComponent(wd);
// 	var kw=$('#searchtxt').val();
// 	var d={
// 		memberId:$.cookie("_UUID"),  //测试用，需要换成实际的UUID
// 		keyword:kw
// 		};
// 	var url = sms_url+"/cep/cepSearchRanke/insert";
// 	$.getJSON(url+"?callback=?",d,function(data){
// 		if(data) {
// 			 console.log(data);
// 		}
// 	})

// 	window.open(link);
// }

//Rc   start------------------------
// var _PCSCount = 'COUNTER_INSTALL_URL';
// var _Debug;
// var _PCSWebSite;
// var _PCSType;
// var _PCSShow;
// var _PCSShowStr;
// var _PCSIframe;
// var _PCSImage;
// var _PCSText;
// var _PCSPlatform=navigator.platform;
// var _PCSBrowserType;
// var _PCSTerminalType;

// _PCSBrowserType='Others';
// _PCSTerminalType='PC';
//document.write(navigator.userAgent+"<br>");
//document.write(navigator.appVersion+"<br>");
// var browser={
//      versions:function(){
//          var u = navigator.userAgent, app = navigator.appVersion;
// 		 return {
//             trident: u.indexOf('Trident') > -1, //IE内核
//             presto: u.indexOf('Presto') > -1, //opera内核
//             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  //ios终端
//             android: u.indexOf('Android') > -1 && u.indexOf('Linux') > -1, //android终端或者uc浏览器
//             iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
//             iPad: u.indexOf('iPad') > -1, //是否iPad
//              webApp: u.indexOf('Safari') == -1 //是否web应用程序，没有头部与底部
//         };
//      }(),
//      language:(navigator.browserLanguage && navigator.language)
//  }

// if(browser.versions.webKit){
//     _PCSBrowserType="Google";
// }
// if(browser.versions.presto){
//     _PCSBrowserType="Opera";
// }
// if(browser.versions.gecko){
//     _PCSBrowserType="Firefox";
// }
// if(browser.versions.gecko){
//     _PCSBrowserType="Firefox";
// }
// if(browser.versions.trident){
//      _PCSBrowserType="IE";
// }

// if(browser.versions.android){
//     _PCSTerminalType="Android";
// }
// if(browser.versions.iPhone){
//     _PCSTerminalType="iPhone";
// }
// if(browser.versions.iPad){
//     _PCSTerminalType="iPad";
// }



// var _PCSCountPage = _PCSCount + '/count/count.php';
// if( _PCSIframe == true )
// {
// 	var _PCSPageurl = escape(location.href);
// 	var _PCSReferer = escape(document.referrer);
// 	var _PCSPageTitle = document.title;
// }
// else
// {
// 	var _PCSPageurl = escape(top.location.href);
// 	var _PCSReferer = escape(top.document.referrer);
// 	var _PCSPageTitle = top.document.title;
// }

// var _PCSLanguage = (navigator.systemLanguage?navigator.systemLanguage:navigator.language);
// var _PCSColor = screen.colorDepth;
// var _PCSScreenSize = screen.width + '*' + screen.height;
// var _PCSCharset = document.charset

// var _UUID;
// _UUID= _PCSReadCookie( '_UUID' );
// if( _PCSReadCookie( '_UUID' ) == '' ){
// 	_UUID=uuid(32,36);
// 	_PCSWriteCookie( '_UUID', _UUID, 72000 );
// }

// var _ALLOWCOOKIE='1';
// if( _PCSReadCookie( '_UUID' ) == '' ){
// 	_ALLOWCOOKIE='0';
// }

// var _PCSFirstTime;
// var _PCSLastTime;
// _PCSFirstTime = _PCSReadCookie( '_PCSFirstTime' );
// if( _PCSFirstTime == '' )
// {
// 	_PCSFirstTime = GetTime();
// 	_PCSLastTime = _PCSFirstTime;
// 	_PCSWriteCookie( '_PCSFirstTime', _PCSFirstTime, 72000 );
// }
// else
// {
// 	_PCSLastTime = GetTime();
// }

// if( _PCSType == null )
// {
// 	_PCSType = 1;
// }

// _PCSReturnCount = _PCSReadCookie( '_PCSReturnCount' );
// _PCSReturnCount = _PCSReturnCount == '' ? 0 : _PCSReturnCount;

// _PCSReturnTime = _PCSReadCookie( '_PCSReturnTime' );
// if( _PCSReturnTime == '' )
// {
// 	_PCSReturnTime = GetTime();
// 	_PCSWriteCookie( '_PCSReturnTime', _PCSReturnTime, 72000 );
// }

// Temp = _PCSReturnTime.split( '-' )
// _PCSReturnTimeDate = new Date(Temp[0], Temp[1]-1, Temp[2], Temp[3], Temp[4], Temp[5] );
// _PCSNowTimeDate = new Date();

// if( _PCSNowTimeDate - _PCSReturnTimeDate >= 43200000 )
// {
// 	_PCSWriteCookie( '_PCSReturnCount', ++_PCSReturnCount, 72000 );
// 	_PCSWriteCookie( '_PCSReturnTime', GetTime(), 72000 );
// }
// else
// {
// 	_PCSReturnCount = null;
// }


// if( _PCSShow != null && _PCSShow.length > 0 )
// {
// 	var _PCSShowStr = '';
// 	for( i = 0; i < _PCSShow.length; i ++ )
// 	{
// 		_PCSShowStr += "&show[]=" + _PCSShow[i];
// 	}
// }
// else
// {
// 	var _PCSShowStr = "";
// }

// function PCSplugMoz(plug)
// {
// 	PCSfind = "0";
// 	if (tabMime.indexOf(plug) != -1)
//     {
//         if (navigator.mimeTypes[plug].enabledPlugin != null)
//         {
//             PCSfind = "1";
//         }
//     }
// 	return PCSfind;
// }

// function PCSplugIE(plug)
// {
// 	PCSfind = false;
// 	document.write('<SCR' + 'IPT LANGUAGE=VBScript>\n on error resume next \n PCSfind = IsObject(CreateObject("' + plug + '"))</SCR' + 'IPT>\n');
// 	if (PCSfind)
//         return '1';
//     else
//         return '0';
// }

// if(navigator.javaEnabled())
//     _PCSJava='1';
// else
//     _PCSJava='0';


// var _PCSua=navigator.userAgent.toLowerCase();
// var _PCSisMoz  = (navigator.appName.indexOf("Netscape") != -1);
// var _PCSisIE  = (_PCSua.indexOf("msie") != -1);
// var _PCSisMac = (_PCSua.indexOf("mac")!=-1);
// var _PCSisWin = ((_PCSua.indexOf("win")!=-1) || (_PCSua.indexOf("32bit")!=-1));


// if (_PCSisWin && _PCSisIE)
// {
//     var _PCSFlash = PCSplugIE("ShockwaveFlash.ShockwaveFlash.1");
// }

// if (!_PCSisWin || _PCSisMoz)
// {
//     tabMime = "";
//     for (var i=0; i < navigator.mimeTypes.length; i++) tabMime += navigator.mimeTypes[i].type.toLowerCase();
//     var _PCSFlash = PCSplugMoz("application/x-shockwave-flash");
// }
// if( _PCSReturnCount == null )
// {
// 	_PCSReturnCount=0;
// }


// var _PCSCountUrl = _PCSCountPage + '?'
// + 'brower_type=' + _PCSBrowserType
// + '&terminal_type=' + _PCSTerminalType
// + '&from_time=' + encodeURIComponent(GetTime())
// + '&leavel_time=' + ''
// + '&url_refer=' + _PCSReferer
// + '&url_this=' + _PCSPageurl
// + '&language=' + _PCSLanguage
// + '&color=' + _PCSColor
// + '&screensize=' + _PCSScreenSize
// + '&charset=' + _PCSCharset
// + '&flash=' + _PCSFlash
// + '&java=' + _PCSJava
// + '&timezone=' +(new Date()).getTimezoneOffset()/60
// + '&pagetitle=' + encodeURIComponent(_PCSPageTitle)
// + '&returntimes=' + _PCSReturnCount
// + '&tags=' +encodeURIComponent($('meta[name="tagNames"]').length>0?$('meta[name="tagNames"]')[0].content:'')
// + '&member_id=' + _UUID
// + '&loadtime=' + ''
// + '&act=1'    //浏览行为
// + '&platform=' + detectOS()
// + '&allow_cookie='+_ALLOWCOOKIE;


/*+ '&pageurl=' + _PCSPageurl
+ '&referer=' + _PCSReferer
+ '&language=' + _PCSLanguage
+ '&color=' + _PCSColor
+ '&screensize=' + _PCSScreenSize
+ '&debug=' + _Debug
+ '&firsttime=' + _PCSFirstTime
+ '&lasttime=' + _PCSLastTime
+ '&type=' + _PCSType
+ '&charset=' + _PCSCharset
+ '&flash=' + _PCSFlash
+ '&java=' + _PCSJava
+ _PCSShowStr
+ '&timezone=' + (new Date()).getTimezoneOffset()/60
+ '&website='+ _PCSTerminalType+_PCSBrowserType;
if(_PCSImage != null)
_PCSCountUrl += '&image='+ _PCSImage;
if(_PCSText != null)
_PCSCountUrl += '&text='+ _PCSText;
_PCSCountUrl += '&pagetitle=' + _PCSPageTitle;*/

// var d={
// 	brower_type:_PCSBrowserType,
// 	terminal_type: _PCSTerminalType,
// 	from_time: encodeURIComponent(GetTime()) ,
// 	leavel_time: '',
// 	url_refer: _PCSReferer,
// 	url_this: _PCSPageurl,
// 	language:  _PCSLanguage,
// 	color:  _PCSColor,
// 	screensize:  _PCSScreenSize,
// 	charset:  _PCSCharset,
// 	flash:  _PCSFlash,
// 	java:  _PCSJava,
// 	timezone: (new Date()).getTimezoneOffset()/60,
// 	pagetitle:  encodeURIComponent(_PCSPageTitle),
// 	returntimes:  _PCSReturnCount,
// 	tags:  encodeURIComponent($('meta[name="tagNames"]').length>0?$('meta[name="tagNames"]')[0].content:''),
// 	member_id:  _UUID,
// 	loadtime:  '',
// 	act: 1,    //浏览行为
// 	platform: detectOS(),
// 	allow_cookie:_ALLOWCOOKIE
// };

// if( _Debug )
// {
// 	document.write(_PCSCountUrl);
// 	//document.write("<iframe src='" + _PCSCountUrl + "' width=100% height=500></iframe>");
// }
// else
// {
	//提交数据
    // $.getJSON(cep_url+'/cep/behavior-record-api?callback=?', d, function(ret) {
  		// if(ret['status'] == 'ok'){
  			//暂无处理
  		// }
		//alert(ret['status'] );
    // });
//}

// function detectOS() {
//     var sUserAgent = navigator.userAgent;
//     var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
//     var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
//     if (isMac) return "Mac";
//     var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
//     if (isUnix) return "Unix";
//     var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
//     if (isLinux) return "Linux";
//     if (isWin) {
//         var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
//         if (isWin2K) return "Win2000";
//         var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
//         if (isWinXP) return "WinXP";
//         var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
//         if (isWin2003) return "Win2003";
//         var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
//         if (isWinVista) return "WinVista";
//         var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
//         if (isWin7) return "Win7";
// 				var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
//         if (isWin8) return "Win8";
//         var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
//         if (isWin10) return "Win10";
//     }
//     return "other";
// }


function GetTime()
{
	now = new Date();
	year=now.getFullYear();
	Month=now.getMonth()+1;
	Day=now.getDate();
	Hour=now.getHours();
	Minute=now.getMinutes();
	Second=now.getSeconds();

	return year+"-"+Month+"-"+Day+" "+Hour+":"+Minute+":"+Second;
}

// function _PCSReadCookie(name)
// {
//   var cookieValue = "";
//   var search = name + "=";
//   if(document.cookie.length > 0)
//   {
//     offset = document.cookie.indexOf(search);
//     if (offset != -1)
//     {
//       offset += search.length;
//       end = document.cookie.indexOf(";", offset);
//       if (end == -1) end = document.cookie.length;
//       cookieValue = unescape(document.cookie.substring(offset, end))
//     }
//   }
//   return cookieValue;
// }

// function _PCSWriteCookie(name, value, hours)
// {
//   var expire = "";
//   if(hours != null)
//   {
//     expire = new Date((new Date()).getTime() + hours * 3600000);
//     expire = "; expires=" + expire.toGMTString();
//   }
//   document.cookie = name + "=" + escape(value) + expire + "domain=;" + "path=/;";
// }
// function uuid(len, radix) {
//     var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
//     var uuid = [], i;
//     radix = radix || chars.length;

//     if (len) {
//       // Compact form
//       for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
//     } else {
//       // rfc4122, version 4 form
//       var r;

//       // rfc4122 requires these characters
//       uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
//       uuid[14] = '4';

//       // Fill in random data.  At i==19 set the high bits of clock sequence as
//       // per rfc4122, sec. 4.1.5
//       for (i = 0; i < 36; i++) {
//         if (!uuid[i]) {
//           r = 0 | Math.random()*16;
//           uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
//         }
//       }
//     }

//     return uuid.join('');
// }


// function ssologin(){
// 	window.location.href =login_url+'/login?param=roewe&backUrl='+window.location.href;
// }

// function getSession(){
//   $.ajax({
//      async:false,
//      url:login_url+"/getUserInfo",
//      type: "GET",
//      dataType: 'jsonp',
//      jsonp: 'jsoncallback',
//      timeout: 5000,
//      success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
//     // console.log(json.userName);
//     if(json.userName != null && json.userName != "" && json.userName != "null"){
//                showlogined();
//                $("#userName").text(decodeURIComponent(json.userName));
// 			   $("#userName").attr('title',decodeURIComponent(json.userAllName));

//               }else{
//                showunlogined();
//               }
//      }
//    });

//    }

//登陆按钮显示和不显示
// function showlogined(){
//    $("#unlogin").hide();
//    $("#welcome").show();
//   }
//   function showunlogined(){
//    $("#unlogin").show();
//    $("#welcome").hide();

//   }

//首页搜索
// $(function(){
// 	//登陆注册使用
// 	getSession();

// 	if(typeof $.fn.autocomplete!=U_F){
// 		$('#searchtxt').autocomplete(sms_url+'/cep/cepSearchRanke/query',{
// 			dataType:'jsonp',
// 			max:10,
// 			width:141,
// 			autoFill:false,
// 			extraParams:{
// 				record:function(){
// 					return $('#searchtxt').val();
// 				}
// 			},
// 			minChars:0,
// 		 	formatItem: function(data, i, max) {//格式化列表中的条目 row:条目对象,i:当前条目数,max:总条目数
// 				 return data.KEYWORD;//i + '/' + max + ':"' + data.name + '"[' + data.to + ']';
// 		},
// 	        parse: function(data) {
// 	            var result = $.map(data.aadata, function(row) {
// 	                return {
// 	                    data: row,
// 	                    value: "1",
// 	                    result: row.KEYWORD
// 	                }
// 	            });
// 	            return result;
// 	        }
// 		}).result(function(event,data,formatted){
// 				var d={
// 				memberId:$.cookie("_UUID"),  //测试用，需要换成实际的UUID
// 				pageUrl: escape(top.location.href), //window.location.href
// 				pageTitle:encodeURI(document.title),
// 				orderNumber:'33',
// 				btnDescr:encodeURI('官网搜索-'+data.keyword),
// 				btnType:'3'
// 				};
// 				var url = sms_url+"/cep/cepClickLog/insertSelective";
// 				$.getJSON(url+"?callback=?",d,function(data2){
// 					if(data2) {
// 						 console.log(data2);
//         window.location.href=data.forwardUrl;
// 					} else {
//         window.location.href=data.forwardUrl;
// 					}
// 				})
//     });
// 	}

// });

//判断终端类型，若为移动则跳转，只处理访问首页的情况
// if (_PCSTerminalType!="PC"){
// 	  var o_url=top.location.href;
// 	  o_url = o_url.replace("http://","");
// 	  o_url = o_url.replace("\/","");

// 	  if (o_url=="www.roewe.com.cn" || o_url=="roewe.com.cn"){
// 	  	window.location.href="http://www.roewe.com.cn/wap/";
// 	  }
// }

// $.getScript(sms_url+'/cep/js/cherish.js', function(data, status, jqxhr) {
//  var obj = new $.viewRecord();
// 	obj.record();
// 	obj.imgClick(); //?图片点击记录
// });

//getbrand函数需要用到
var g_brandtopid=0;

//top
$('.kf_top').click(function(){
	if(scroll=="off") return;
	$("html,body").animate({scrollTop: 0}, 400);
});