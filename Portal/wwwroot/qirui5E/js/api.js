function openChat() {
    try {
        var url = "https://onlinechat.mychery.com/chat/chatClient/chatbox.jsp?companyID=8101&configID=14&pagereferrer=%e5%ae%98%e7%bd%91PC&enterurl=";
       // var url = "http://chery.live800.com/chat/chatClient/chatbox.jsp?companyID=9030&configID=1&enterurl=";
       //  var url = "http://care3.live800.com/live800/chatClient/chatbox.jsp?companyID=8101&configID=953&enterurl=";
        //var url="http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=135575&jid=2323390648&configID=19556&lan=zh&chatType=0&accept=1&enterurl=";
        url += encodeURIComponent(document.URL || window.location);
        url += "&timestamp=" + new Date().getTime();
        //width=570,height=424
        window.open(url, "800chatbox", "toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=900,height=570");
    } catch (e) { }
}

function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = yScroll;
    } else {
        pageHeight = windowHeight;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = xScroll;
    } else {
        pageWidth = windowWidth;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}

function playVideo(src) {

    $("html").css("overflow", "hidden");

    var videoContainer = $(".chery-video-player");
    var size = getPageSize();
    var width = size[2];
    var height = size[3];
    $(videoContainer).css({
        "width": width + "px",
        "height": height + "px",
        "display": "block"
    });

    var videoPlayer = $(videoContainer).find("video")[0];
    if ((width * 16 / 9) >= height) {
        videoWidth = Math.floor(16 * height / 9);
        $(videoPlayer).css({
            "width": videoWidth + "px",
            "height": height + "px",
            "top": "0px",
            "left": (width - videoWidth) / 2 + "px"
        });
    } else {
        videoHeight = Math.floor(width * 16 / 9);
        $(videoPlayer).css({
            "width": width,
            "height": videoHeight + "px",
            "top": (height - videoHeight) / 2 + "px",
            "left": "0px"
        });
    }
    $(videoPlayer).attr("src", src);
    videoPlayer.play();
}

function shutVideo() {
    var videoContainer = $(".chery-video-player");
    var videoPlayer = $(videoContainer).find("video")[0];
    videoPlayer.pause();
    $(videoPlayer).attr("src", "");
    $(videoContainer).css({
        "display": "none"
    });

    $("html").css("overflow", "auto");
}

function showPrivacyPage() {
    $("html").css("overflow", "hidden");

    var privacyContainer = $(".chery-privacy-paper");
    var size = getPageSize();
    var width = size[2];
    var height = size[3];
    $(privacyContainer).css({
        "width": width + "px",
        "height": height + "px",
        "display": "block"
    });

    var privacyContent = $(privacyContainer).find(".chery-privacy-paper-content")[0];
    var contentWidth = Math.floor(width * 0.8);
    var contentHeight = Math.floor(height * 0.8);
    $(privacyContent).css({
        "width": contentWidth + "px",
        "height": contentHeight + "px",
        "top": (height - contentHeight) / 2 + "px",
        "left": (width - contentWidth) / 2 + "px"
    });
}

function closePrivacyPage() {

    var privacyContainer = $(".chery-privacy-paper");
    $(privacyContainer).css({
        "display": "none"
    });

    $("html").css("overflow", "auto");
}


function showConfirmWindow() {
    $("html").css("overflow", "hidden");

    var confirmContainer = $(".chery-booking-confirm");
    var size = getPageSize();
    var width = size[2];
    var height = size[3];
    $(confirmContainer).css({
        "width": width + "px",
        "height": height + "px",
        "display": "block"
    });

    var confirmContent = $(confirmContainer).find(".chery-booking-confirm-content")[0];
    var contentWidth = 800;
    var contentHeight = 300;
    $(confirmContent).css({
        "width": contentWidth + "px",
        "height": contentHeight + "px",
        "top": (height - contentHeight) / 2 + "px",
        "left": (width - contentWidth) / 2 + "px"
    });
}

function closeConfirmWindow() {
    var confirmContainer = $(".chery-booking-confirm");
    $(confirmContainer).css({
        "display": "none"
    });

    $("html").css("overflow", "auto");
}

function format(num) {
    var result = [], counter = 0;
    num = (num || 0).toString().split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    };
    return result.join('');
};

function jumpNum(domId, num, duration, format, times) {
    var container = $(domId);
    var times = times || 20;
    var format = format || function (a) { return a };

    var count = times;
    var n = 0;
    var c = Math.floor(num / times);

    var timeout = function () {
        setTimeout(function () {
            count--;
            n = n + c;
            container.text(format(n));
            if (count > 0) {
                timeout();
            } else {
                container.text(format(num));
            }
        }, duration / times);
    };
    timeout();
};

function lazyLoad(domId) {
    var imgs = $(domId + " img");
    for (var index = 0; index < imgs.length; index++) {
        var img = imgs[index];
        var imgSrc = $(img).attr("lazy-src");
        if ("" != imgSrc && null != imgSrc) {
            $(img).attr("src", imgSrc);
        }
    }
}

function arryContains(arry, key) {
    var matchFlag = false;
    $.each(arry, function (idx, val) {
        if (val == key) {
            matchFlag = true;
        }
    });
    return matchFlag;
}
