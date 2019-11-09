/*
封装的js方法
调用：var appObj = CheryCommonCls(); //接受闭包的对象，是不是像实例化
*/
var CheryCommonCls = function () {
    var instance = {
        'PageSize': (location.pathname.substring('/', 8).indexOf("mobile") > 0) ? 10 : 20,
        'GetPost': function (controller, action, data, callback) {
            var url = "/Umbraco/Surface/" + controller + "/" + action;
            $.post(url, data, function (obj) {
                try {
                    callback(JSON.parse(obj));
                } catch (e) {
                    callback(obj);
                }
            })
        },
        'setCookie': function (name, value, expires) {
            if (!expires) {
                expires = 1;
            };
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
        },
        'getCookie': function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null;
        },
        'delCookie': function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = GetCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },
        'getQueryString': function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = decodeURI(window.location.search.substr(1)).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        'formatDate': function (sdate, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        'checkIsIE': function () {
            //是否ie浏览器
            return (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        },
        'getDevice': function GetDeviceType() {
            var browser = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }
            return browser;
        }
    }
    return instance; //返回闭包的对象
}
$(function () {

     //return false;
    var objx = CheryCommonCls();
    if (objx.getDevice().versions["iPhone"] || objx.getDevice().versions["mobile"]) {
        if (window.location.pathname.indexOf("/m/") >-1) {
            return;
        }
        else {
            window.location = window.location.origin+"/m" + window.location.pathname+location.search;
        }
    }
    else {
        if (window.location.pathname.indexOf("/m/") > -1) {
            window.location = window.location.origin+"/"+  window.location.pathname.replace("/m/", "") + window.location.search;
        }
        else {
            return;
        }
    }
});
