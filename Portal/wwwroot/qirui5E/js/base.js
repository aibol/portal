function isNullOrEmpty(obj) {
    if (typeof (obj) == "undefined") {
        return true;
    }
    if (obj === 0) {
        return false;
    }
    if (obj == null || obj == "" || obj=="null") {
        return true;
    }
    if (typeof (obj) == "object") {
        if ($.isArray(obj)) {
            if (obj.length == 0) {
                return true;
            }
        }
    }
    return false;
}
function showLength(str, len, lastChar) {
    if (isNullOrEmpty(str)) return "";
    if (str.length > len) {
        return str.substring(0, len) + (lastChar==null ? "..." : lastChar);
    }
    return str;
}
$(function () {
    //menu
    var qcloud = {};
    $('[_sub_menu]').hover(function () {
        var _nav = $(this).attr('_sub_menu');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_sub_menu]').each(function () {
                $(this)[_nav == $(this).attr('_sub_menu') ? 'addClass' : 'removeClass']('nav-up-selected');
            });
            $('#' + _nav).stop(true, true).slideDown(200);
        }, 150);
    }, function () {
        var _nav = $(this).attr('_sub_menu');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_sub_menu]').removeClass('nav-up-selected');
            $('#' + _nav).stop(true, true).slideUp(200);
        }, 150);
    });
    //project hover
    $(".project").hover(function () {
        $(this).find("div[class='text']").removeClass().addClass('text-hover');
    }, function () {
        $(this).find("[class='text-hover']").removeClass().addClass('text');
    });
    //weixin modal
    $("#weixin").click(function () {
        $("#weixin_modal").modal("show");
    });
});
//nav-car

$(function () {
    $(".img-list .sub-menu-carshow li ").hover(function () {
        $(this).find(".rqrl-home-Hotmodels-more").show();
    }, function () {
        $(this).find(".rqrl-home-Hotmodels-more").hide();
    });
    //
    $(document).ready(function () {
        function DY_scroll(wraper, prev, next, img, speed, or) {
            var wraper = $(wraper);
            var prev = $(prev);
            var next = $(next);
            var img = $(img).find('ul');
            var w = img.find('li').outerWidth(true);
            var s = speed;
            next.click(function () {
                img.animate({ 'margin-left': -w }, function () {
                    img.find('li').eq(0).appendTo(img);
                    img.css({ 'margin-left': 0 });
                });
            });
            prev.click(function () {
                img.find('li:last').prependTo(img);
                img.css({ 'margin-left': -w });
                img.animate({ 'margin-left': 0 });
            });
            if (or == true) {
                ad = setInterval(function () { next.click(); }, s * 100);
                wraper.hover(function () { clearInterval(ad); }, function () { ad = setInterval(function () { next.click(); }, s * 100); });

            }
        }
        DY_scroll('.img-scroll', '.prev', '.next', '.img-list', 3, false);// 
    });


    //首页-中部滚动
    /* var swiper = new Swiper('.Hotmodels-list .swiper-container', {
         slidesPerView: 3,
         paginationClickable: true,
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',
         spaceBetween: 30,
        
     });
   
     $(".Hotmodels-list .swiper-wrapper .swiper-slide").hover(function () {
         $(this).find(".rqrl-home-Hotmodels-more").show();
     }, function () {
         $(this).find(".rqrl-home-Hotmodels-more").hide();
     });
     
     var swiper = new Swiper('.Hotspot-lsit .swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         slidesPerView: 5,
         spaceBetween: 50,
         breakpoints: {
             1024: {
                 slidesPerView: 4,
                 spaceBetween: 40
             },
             768: {
                 slidesPerView: 3,
                 spaceBetween: 30
             },
             640: {
                 slidesPerView: 2,
                 spaceBetween: 20
             },
             320: {
                 slidesPerView: 1,
                 spaceBetween: 10
             }
         },
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',
         spaceBetween: 30,
         //hashnav: true,
         //hashnavWatchState: true
 
     });*/
});
//
/**/
$(document).ready(function () {
    $(".recruit-more").click(function () {
        $(this).parents('li').find(".recruit-txt").toggle();
    });

});
//侧边栏
$(document).ready(function () {
    $(document).ready(function () {
        $(".side ul li").hover(function () {

            $(this).find(".sidebox").stop().animate({ "width": "144px" }, 200).css({ "opacity": "1", "filter": "Alpha(opacity=100)", "background": "#0a0a0a", "padding-left": "20px" })

        }, function () {

            $(this).find(".sidebox").stop().animate({ "width": "50px" }, 200).css({ "opacity": "1", "filter": "Alpha(opacity=100)", "background": "#333333" })

        });
    });



});


//回到顶部

function goTop(){

    $('html,body').animate({'scrollTop':0},600);

}


function ActionPost(options) {
    var op = {};
    $.extend(op, {
        cache: true,
        type: "POST",
        dataType: "json",
        error: function (request) {
            Console.Log("Connection error");
        }
    }, options);

    $.ajax(op);
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function GetInt(str) {
    return parseInt(str);
}

function GetByLen(str, len) {
    str = "" + str;
    if (str.length > len) {
        str = str.substr(0, len);
    }
    return str;
}

function GetCheckValue(ck) {
    var $ck = $(ck);
    return $ck[0] && ($ck[0].checked || $ck[0].getAttribute("checked") || $ck.attr("checked")) || false;
}


function HandleData(obj) {
    for (var key in obj) {
        obj[key] = GetDate(obj[key]);
    }
}

function GetDate(val) {
    var str = "" + val;
    if (str.length < 19 && str.length > 10 && str[10] == "T") {
        str = str.replace("T", " ");
        return str;
    }
    else {
        return val;
    }
}


function LoadForm($form, obj) {
    //HandleData(obj);
    if (obj == null) {
        obj = $form;
        $form = null;
    }
    if ($form == null) {
        $form = $(document.body);
    }
    for (var key in obj) {
        var $dom = $form.find("[name='" + key + "']");
        if ($dom.length == 0) {
            $dom = $form.find("#" + key);
        }
        $dom.each(function () {
            SetControl(this, key, obj[key]);
        });
    }
}

function SetControl(control, key, value) {
    var $control = $(control);
    var tagName = $control[0].tagName;
    var type = $control.attr('type');
    if (value == "null") {
        value = "";
    }
    if (tagName == 'INPUT') {
        if (type == 'radio') {
            $control.attr('checked', $control.val() == value);
        } else if (type == 'checkbox') {
            var val = value > 0 ? true : false;
            var check = GetCheckValue($control);
            if (check != val) {
                $control.click();
            }
        } else if (type == 'date') {
            var str = "" + value;
            if (str.length >= 10) {
                str = str.substr(0, 10);
            }
            $control.val(str);
        } else if (type == 'time') {
            var str = "" + value;
            if (str.length >= 10) {
                str = str.substr(11, 8);
            }
            $control.val(str);
        } else if (type == 'datetime-local') {
            $control.val(value);
        }
        else {
            $control.val(GetDate(value));
        }
    } else if (tagName == 'SELECT') {
        $control.val(value);
    } else if (tagName == 'TEXTAREA') {
        $control.text(value);
    }
    else {
        $control.text(GetDate(value));
    }
}

function GetControlValue(control) {
    var tagName = $(control)[0].tagName;
    var type = $(control).attr('type');
    if (tagName == 'INPUT') {
        if (type == 'radio') {
            if (GetCheckValue(control)) {
                return $(this).val();
            }
        } else if (type == 'checkbox') {
            var val = GetCheckValue(control);
            return val;
        }
        else {
            return $(control).val();
        }
    } else if (tagName == 'SELECT') {
        return $(control).val();
    } else if (tagName == 'TEXTAREA') {
        return $(control).val();
    }
    else {
        return $(control).text();
    }
}

function GetFileSizeText(pos, size) {
    var fileSize = 0;
    if (size > 1024 * 1024) {
        fileSize = (Math.round(pos * 100 / (1024 * 1024)) / 100).toString() + "/" + (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    }
    else {
        fileSize = (Math.round(pos * 100 / 1024) / 100).toString() + "/" + (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
    }
    return fileSize;
}

$.extend({
    /** 
     1. 设置cookie的值，把name变量的值设为value   
    example $.cookie(’name’, ‘value’);
     2.新建一个cookie 包括有效期 路径 域名等
    example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
    3.新建cookie
    example $.cookie(’name’, ‘value’);
    4.删除一个cookie
    example $.cookie(’name’, null);
    5.取一个cookie(name)值给myvar
    var account= $.cookie('name');
    **/
    cookie: function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

});

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * 
 * return URL参数字符串
 */
var urlEncode = function (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};

function GetLocalUrl(url) {
    var frontUrl = window.location.toString();
    var urls = frontUrl.split("//");
    var toUrl = "";
    if (url.substr(0, 1) == "/") {
        var extUrls = urls[1].split("/");
        var baseUrl = urls[0] + "//" + extUrls[0];
        toUrl = baseUrl + url;
    }
    else {
        var temp = urls[1].substr(0, urls[1].lastIndexOf("/") + 1) + url;
        var temps = temp.split("/");
        var delCount = 0;
        for (var i = temps.length - 1 ; i >= 0 ; i--) {
            var val = temps[i];
            if (val == ".") {
                temps.splice(i, 1);
            }
            else if (val == "..") {
                temps.splice(i, 1);
                delCount++;
            }
            else {
                if (delCount > 0) {
                    temps.splice(i, 1);
                    delCount--;
                }
            }
        }
        toUrl = urls[0] + "//" + temps.join("/");
    }
    return toUrl;
}
function ajaxPost(options) {
    var op = {};
    $.extend(op, {
        cache: true,
        type: "POST",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            //TODO error process window.location.href = "error-500.html";
        }
    }, options);
    $.ajax(op);
}
var sysConfig = function () {
    return {
        baseAjaxUrl: "/SysConfig/",
        /*enum*/
        //绑定当前控件
        bindDropDownList: function (enumType, ctrlID, value, parentID) {
            var ctrl;
            if (typeof (ctrlID) == "object") {
                ctrl = ctrlID;
            } else {
                ctrl = $("#" + ctrlID);
                if (ctrl.length == 0) {
                    ctrl = $("[name='" + ctrlID + "']");
                }
            }
            if (parentID == null) {
                parentID = 0;
            }
            var firstOption;
            //如果父ID等于-1，则直接清空ctrl的option
            if (parentID == -1) {
                //清空Ctrl的options
                firstOption = ctrl.find("option[value='']");
                ctrl.find("option").remove();
                ctrl.append(firstOption);
                return;
            }
            //加载主Ctrl
            ajaxPost({
                cache: true,
                async: false,
                data: {
                    enumType: enumType,
                    parentId: parentID
                },
                url: sysConfig.baseAjaxUrl + "GetEnumList",
                success: function (data) {
                    var r = eval("(" + data + ")");
                    var enumData = r.data;
                    //清空Ctrl的options
                    firstOption = ctrl.find("option[value='']");
                    ctrl.find("option").remove();
                    ctrl.append(firstOption);
                    $(enumData).each(function (index) {
                        var val = enumData[index];
                        //如果存在选中值，则选中该项目，并触发选中事件
                        if (value != null && value == val.EnumId) {
                            ctrl.append("<option value='" + val.EnumId + "' selected='true'>" + val.EnumName + "</option>");
                        } else {
                            ctrl.append("<option value='" + val.EnumId + "'>" + val.EnumName + "</option>");
                        }
                    });
                }
            });
        },
        //绑定多级级联控件最多支持三级级联
        bindDropDownLists: function (enumType, mainCtrlID, mainValue, secondCtrlID, secondValue, thirdCtrlID, thirdValue, mainCtrlParentID) {
            var mainCtrl;
            if (typeof (mainCtrlID) == "object") {
                mainCtrl = mainCtrlID;
            } else {
                mainCtrl = $("#" + mainCtrlID);
                if (mainCtrl.length == 0) {
                    mainCtrl = $("[name='" + mainCtrlID + "']");
                }
            }
            //加载主Ctrl的值
            sysConfig.bindDropDownList(enumType, mainCtrlID, mainValue, mainCtrlParentID);
            //加载二三级的change事件
            if (secondCtrlID != null) {
                mainCtrl.on("change", function () {
                    sysConfig.bindDropDownList(enumType, secondCtrlID, secondValue, mainCtrl.val());
                    //如果存在第三级Ctrl，清空第三级ctrl的值(parentID=-1)
                    if (thirdCtrlID != null) {
                        sysConfig.bindDropDownList(enumType, thirdCtrlID, thirdValue, -1);
                    }
                });
                if (mainCtrl.val() != null && mainCtrl.val() != "") {
                    sysConfig.bindDropDownList(enumType, secondCtrlID, secondValue, mainCtrl.val());
                }
            }
            if (thirdCtrlID != null) {
                var secondCtrl;
                if (typeof (secondCtrlID) == "object") {
                    secondCtrl = secondCtrlID;
                } else {
                    secondCtrl = $("#" + secondCtrlID);
                    if (secondCtrl.length == 0) {
                        secondCtrl = $("[name='" + secondCtrlID + "']");
                    }
                }
                secondCtrl.on("change", function () {
                    sysConfig.bindDropDownList(enumType, thirdCtrlID, thirdValue, secondCtrl.val());
                });
                if (secondCtrl.val() != null && secondCtrl.val() != "") {
                    sysConfig.bindDropDownList(enumType, thirdCtrlID, thirdValue, secondCtrl.val());
                }
            }
        }
    }
}();