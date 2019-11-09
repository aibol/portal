// document.write("<script language=javascript src='/assets/js/DealerJson.js'/></script>");
(function ($) {
    //var animateSeriesArry = ["tiggo5x","tiggo8","tiggot19","arrizogx","arrizoex", "tiggo3x","arrizo5sportOfficial","arrizo5","tiggo7sport","t1a","tiggo7Year2018"];
    var scrollController = new ScrollMagic.Controller({ container: "body" });

    (function () {
        // /*数字跳动*/
        // var numberFormat = function (num) {
        //     var result = [], counter = 0;
        //     num = (num || 0).toString().split('');
        //     for (var i = num.length - 1; i >= 0; i--) {
        //         counter++;
        //         result.unshift(num[i]);
        //         if (!(counter % 3) && i != 0) { result.unshift(','); }
        //     };
        //     return result.join('');
        // };

        // var scene = new ScrollMagic.Scene({
        //     triggerElement: "#infos",
        //     offset: 132 - $(window).height() / 2
        // }).on("start", function (event) {
        //     animateAll();
        // }).addTo(scrollController);
        // var start = new RegExp(/^\d+/);
        // var end = new RegExp(/^\D+/);
        // var animateAll = function () {
        //     $("#infos-1").animateNumber({
        //         number: eval($("#infos-1").attr("data-value")),//58900,
        //         numberStep: function (now, tween) {
        //             var number = Math.floor(now),
        //             target = $(tween.elem);
        //             target.text(numberFormat(number));
        //         }
        //     }, 500);
        //     $("#infos-2").animateNumber({
        //         number: eval($("#infos-2").attr("data-value")),
        //         numberStep: function (now, tween) {
        //             var number = Math.floor(now),
        //             target = $(tween.elem);
        //             var unit = $("#infos-2").attr("data-unit");
        //             if (unit == "point") {
        //                 target.text(number / 10 + ($("#infos-2").attr("data-ext") || ""));
        //             } else if (unit == "int") {
        //                 target.text(numberFormat(number) + ($("#infos-2").attr("data-ext") || ""));
        //             } else {
        //                 target.text((number / 10).toFixed(1) + ($("#infos-2").attr("data-ext") || ""));
        //             }
        //         }
        //     }, 500);
        //     $("#infos-3").animateNumber({
        //         number: eval($("#infos-3").attr("data-value")),
        //         numberStep: function (now, tween) {
        //             var number = Math.floor(now),
        //             target = $(tween.elem);
        //             var unit = $("#infos-3").attr("data-unit");
        //             if (unit == "point") {
        //                 target.text(number / 10 + ($("#infos-3").attr("data-ext") || ""));
        //             } else if (unit == "int") {
        //                 target.text(numberFormat(number) + ($("#infos-3").attr("data-ext") || ""));
        //             }
        //             else {
        //                 target.text(number / 10 + ($("#infos-3").attr("data-ext") || ""));
        //             }
        //         }
        //     }, 500);
        //     $("#infos-4").animateNumber({
        //         number: eval($("#infos-4").attr("data-value")),
        //         numberStep: function (now, tween) {
        //             var number = Math.floor(now),
        //             target = $(tween.elem);
        //             var unit = $("#infos-4").attr("data-unit");
        //             if (unit == "point") {
        //                 target.text(number / 10 + ($("#infos-4").attr("data-ext") || ""));
        //             } else if (unit == "int") {
        //                 target.text(numberFormat(number) + ($("#infos-4").attr("data-ext") || ""));
        //             } else {
        //                 target.text(numberFormat(number) + ($("#infos-4").attr("data-ext") || ""));
        //             }
        //         }
        //     }, 500);
        // };
    
        //卖点部分
        $("#high-lights-stage .list").slick({
            dots: true,
            infinite: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000
        });
        var imgs = $("#high-lights-stage .list img");
        imgs.on("load", function () {
            var img = $(this);
            var h = img.height();
            if (h) {
                $("#high-lights-stage").css({
                    height: h
                });
            };
        });
        $(".high-lights .stage-wrapper").hide();
        $(".high-lights .nav-bar a").click(function (e) {
            e.preventDefault();
            $(".high-lights .nav-bar a").removeClass("selected");
            var target = $(this).addClass("selected").attr("data-target");

            $(".high-lights .stage-wrapper").fadeOut(500).removeClass("shown");
            var t = $(".high-lights .stage-wrapper#" + target).show().addClass("shown");//fadeIn(250);
            if (t.children('.list').length == 0) {
                t.css('position', 'relative');
            }
            t.find(".list").slick("slickNext");
        });
        $($(".high-lights a").eq(0)).click();
   
        //配置部分
        $("#nav-configuration a").click(function (e) {
            e.preventDefault();
            $("#nav-configuration a").removeClass("selected");
            $(".config-table tbody").hide();
            var index = $("#nav-configuration a").index($(this));
            $(".config-table tbody").eq(index).show();
            $("#nav-configuration a").eq(index).addClass("selected");
        });
        $("#nav-configuration a").eq(0).click();
    
        //gallery
        var w = 0;
        $(".gallery .list ul li").each(function (i, obj) {
            w += $(obj).outerWidth(true);
        });
        $(".gallery .list ul").css({
            width: w
        });

        var c = $("#gallery-list").jcarousel();
        $(".gallery .list .prev").on("jcarouselcontrol:active", function () {
            $(this).addClass('active').removeClass("inactive");
        }).on("jcarouselcontrol:inactive", function () {
            $(this).addClass('inactive').removeClass("active");;
        }).jcarouselControl({
            carousel: c,
            target: "-=1"
        });

        $(".gallery .list .next").on("jcarouselcontrol:active", function () {
            $(this).addClass("active").removeClass("inactive");;
        }).on("jcarouselcontrol:inactive", function () {
            $(this).addClass("inactive").removeClass("active");;
        }).jcarouselControl({
            carousel: c,
            target: "+=1"
        });

        var wcheck = function () {
            var btns = $(".gallery .list .navigation");
            if (btns.filter(".inactive").length >= 2) {
                btns.hide();
            } else {
                btns.show();
            };
        };
        wcheck();

        $("#gallery-list").delegate("a", "click", function (e) {
            e.preventDefault();
            var btn = $(this);
            var type = btn.attr("data-type");
            var url = btn.attr("data-url");

            var imageStage = $("#gallery-stage .image-stage");


            imageStage.empty().fadeIn(500);

            switch (type) {
                case "image":
                    var html = "<img src=" + url + ">";
                    imageStage.append(html);
                    break;
            }
        });

        $($("#gallery-list a[data-type=image]").eq(0)).click();
    })();
})(jQuery);