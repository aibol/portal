(function ($) {
    //下拉框响应
    $("html").click(function (e) {
        $(".combo-options").slideUp(200);
        $('.field-combo .combo-text').removeClass('active')
        $('.price_calculate .field-combo').removeClass('cur')
    });
    $(".field-combo .combo-text").click(function (e) {
        e.stopPropagation();
        var btn = $(this);
        var combo = btn.closest(".field-combo");
        // console.log(combo, combo.hasClass("readonly"))
        if (combo.hasClass("disabled") || combo.hasClass("readonly")) {
            return;
        } else {
            $(".combo-options").slideUp(100) ;
            
            $(this).addClass('active')
            $(this).parent().addClass('cur')
            $(this).next(".combo-options").slideDown(200);
            // $(this).parent().find('.combo-text').removeClass('active')
        };
    });
    //用户同意条款
    $('.field').delegate('input[type=checkbox]','change',function(e) {
        var that = $(this);
        if (that.prop("checked")) {
            that.closest("label").addClass("checked");
        } else {
            that.closest("label").removeClass("checked");
        };
    })
    $(".field-combo .combo-options").delegate("a", "click", function (e) {
        
        e.preventDefault();
        
        var btn = $(this);
        var optionsContainer = btn.closest(".combo-options");
        optionsContainer.find("a").removeClass("selected");
        btn.addClass("selected");
        var value = btn.attr("data-value");
        var text = btn.html();
       
        optionsContainer.prev(".combo-text").text(text).addClass("selected");
        var input = optionsContainer.next("input").val(value);
        input.triggerHandler("change");
        input.setValid();
         
    });
    $.fn.getComboData = function () {
        var option = $(this).closest(".field-combo").find(".combo-options a.selected");
        return {
            value: option.attr("data-value"),
            name: option.html()
        }
    };
    $.fn.setComboData = function (value) {
       
        var input = $(this);
        var combo = input.closest(".field-combo");
        combo.find(".combo-options a").removeClass("selected");
        var option = combo.find(".combo-options a[data-value=\"" + value + "\"]");
        //add by pino
        if (option.length == 0) {
            option = combo.find(".combo-options a:contains(" + value + ")");
        }
        if (option.length) {
            option.addClass("selected");
            var text = option.html();
            combo.find(".combo-text").text(text);
            input.val(value);
            input.trigger("change");
        };
    };
    $.fn.selectOption = function (index) {
        
        var input = $(this);
        var combo = input.closest(".field-combo");
        var options = combo.find(".combo-options a");
        $(options.eq(index)).trigger("click");
    };
    $.fn.resetCombo = function () {
        var combo = $(this).closest(".field-combo");
        combo.find('span').text('请选择');
        var options = combo.find(".combo-options a");
        options.removeClass("selected");
        var input = $(this);
        combo.find(".combo-text").text(input.attr("placeholder"));
        input.val("");
    };
    $.fn.setDisable = function () {
        var combo = $(this).closest(".field-combo");
        // var options = combo.find(".combo-options a");
        // options.removeClass("selected");
        var input = $(this);
        // combo.find(".combo-text").text(input.attr("placeholder"));
        // input.val("");
        combo.addClass("disabled")
        input.prop("disabled", true);
    };
    $.fn.setEnable = function () {
        var combo = $(this).closest(".field-combo");
        var input = $(this);
        combo.removeClass("disabled")
        input.prop("disabled", false);
    };
    $.fn.setInvalid = function () {
        var field = $(this).closest(".field");
        field.addClass("invalid");
    };
    $.fn.setValid = function () {
        var field = $(this).closest(".field");
        field.removeClass("invalid");
    };

    $.fn.loadOptions = function (data, value, name, noChooseAll) {
        $(this).resetCombo();
        var placeholder = $(this).attr('placeholder') || "请选择";
        var value = value || "value";
        var name = name || "value";
        var optionsContainer = $(this).prev(".combo-options");
        if (optionsContainer.length == 0) {
            return;
        };
        var inHTML = "<ul>";
        if (!noChooseAll) {
            inHTML += "<li>";
            inHTML += "<a href=\"javascript:void(0);\">" + placeholder + "</a>";
            inHTML += "</li>";
        }
        for (var index = 0, len = data.length; index < len; index++) {
            var d = data[index];
            inHTML += "<li>";
            inHTML += "<a data-value=\"" + d[value] + "\" href=\"javascript:void(0);\">" + d[name] + "</a>";
            inHTML += "</li>";
        };
        inHTML += "</ul>";

        optionsContainer.empty().append(inHTML);
    };

    //textbox
    $.fn.setReadOnly = function () {
        var input = $(this);
        input.closest(".field").addClass("readonly");
    };
    $.fn.removeReadOnly = function () {
        var input = $(this);
        input.closest(".field").removeClass("readonly");
    };
    $(".field-text").delegate("input", "keydown", function (e) {
        var input = $(this);
        if (input.closest(".field").hasClass("readonly")) {
            e.preventDefault();
        };
    });
    $.fn.Interval = {};
    var count = 60;
    //add by pino for 发送短信按钮点击
    $.fn.SendSMS = function (phone, type, callback) {
        $.fn.ClearSMSInterval();

        var btn = $(this);

        CountDown(btn);
        $.fn.Interval = setInterval(function () { CountDown(btn); }, 1000);

        $.post("/Umbraco/Surface/Sms/SendSms", {
            model: {
                Phone: phone,
                Type: type
            }
        }, function (resOjb) {
            if (typeof callback == "function") {
                try {
                    callback(JSON.parse(resOjb));
                } catch (e) {
                    callback(resOjb);
                }
            }
        });
    };
    $.fn.ClearSMSInterval = function () {
        var btn = $(this);
        if ($.fn.Interval) {
            btn.removeClass('disabled').text('获取验证码');
            clearInterval($.fn.Interval);
            count = 60;
        }
    };
    function CountDown(btn) {
        btn.addClass('disabled');
        btn.text("(" + count + ")秒后重新发送");
        if (count == 0) {
            btn.removeClass('disabled').text("重新发送")
            clearInterval($.fn.Interval);
        }
        count--;
    }
    
    $.fn.carModels = function () {
        var inHTML = "";
        inHTML += "<div class=\"check-list\">";
        inHTML += "<label class=\"title\">车系选择</label>";
        inHTML += "<div class=\"list\">";
        inHTML += "<ul>";
        inHTML += "</ul>";
        inHTML += "</div>";
        inHTML += "</div>";

        var input = $(this).css({
            "display": "none"
        });

        var list = $(inHTML);
        input.replaceWith(list);
        list.append(input);

        list.delegate("input[type=checkbox]", "change", function (e) {
 
            var chk = $(this);
            if (chk.prop("checked")) {
                chk.closest("label").addClass("checked");
            } else {
                chk.closest("label").removeClass("checked");
            };

            input.triggerHandler("change", [chk.attr("name")]);
        });
        //绑定车系选择
        input.loadModels = function (data) {
            var ul = $(this).closest(".check-list").find("ul");
            var inHTMLA = "";
            var inHTMLH = "";
            for (var index = 0, len = data.length; index < len; index++) {
                var d = data[index];
                if (d.Name.indexOf("艾瑞泽") > -1) {
                    inHTMLA += "<li>";
                    inHTMLA += "<label>";
                    inHTMLA += "<input type=\"checkbox\" name=\"" + d.Id + "\" enname=\"" + d.NameEn + "\">";
                    inHTMLA += "<span>" + d.Name + "</span>";
                    inHTMLA += "</label>";
                    inHTMLA += "</li>";
                }
                else if (d.Name.indexOf("瑞虎") > -1) {
                    inHTMLH += "<li>";
                    inHTMLH += "<label>";
                    inHTMLH += "<input type=\"checkbox\" name=\"" + d.Id + "\" enname=\"" + d.NameEn + "\">";
                    inHTMLH += "<span>" + d.Name + "</span>";
                    inHTMLH += "</label>";
                    inHTMLH += "</li>";
                }
            };
            inHTMLA = "<span style=" + "\"padding-left: 30px;\"" + ">艾瑞泽系：</span>" + inHTMLA
            inHTMLH = "<br/><span style=" + "\"padding-left: 30px;\"" + ">瑞虎系：</span>" + inHTMLH
            var inHTML = inHTMLA + inHTMLH;
            ul.empty().append(inHTML);
        };
        // 获取车系选择的选择项
        input.getValue = function () {
            var chks = $(this).closest(".check-list").find("input[type=checkbox]");
            var result = [];
            for (var index = 0, len = chks.length; index < len; index++) {
                var chk = $(chks[index])
                if (chk.prop("checked")) {
                    result.push(chk.attr("name"));
                };
            };
            return result;
        };

        input.checkAll = function () {
            var container = $(this).closest(".check-list");
            var chks = container.find("input[type=checkbox]");
            chks.prop("checked", true);

            var labels = container.find(".list label");
            labels.addClass("checked");
        };
		
		 input.checkcarModel = function (carmodel) {
			 var container = $(".check-list");
			 var chks = container.find('.list label input[enname='+carmodel+']');
			 chks.prop("checked", true);
			 var labels = chks.parent();
			 labels.addClass("checked");
		};

        return input;
    };


    $.app = $.app || {};
    $.app.scollBarOptions = {
        cursorcolor: "#252525",
        cursoropacitymin: "0.4",
        cursorborder: "0 none",
        cursorwidth: "8px",
        background: "#dcdcdc",
        zindex: 9
    };
    //提交成功
    $(".pop-success").delegate(".btn-return", "click", function (e) {
        e.preventDefault();
        $(this).closest(".pop-success").fadeOut(200);
    });
    $("body").niceScroll($.app.scollBarOptions);
    //绑定数据源

    $(".popup").delegate(".close", "click", function (e) {
        $(this).closest(".popup").fadeOut(200);
    });

    //拖动条
    $.fn.slider = function (options) {
        var inHTML = "";
        inHTML += "<div class=\"slide-bar\">";
        inHTML += "<div class=\"inner-bar\">";
        inHTML += "<div class=\"block\" href=\"javascript:void(0)\">";
        inHTML += "<span class=\"line\">";
        inHTML += "<span class=\"label\">50%</span>";
        inHTML += "</span>";
        inHTML += "</div>";
        inHTML += "</div>";
        inHTML += "</div>";

        var container = $(inHTML);
        var input = $(this);
        input.replaceWith(container);
        container.append(input);

        var defaults = {
            min: 0,
            max: 100,
            step: 1,
            range: [0, 100],
            format: "%s%"
        };

        var settings = $.extend({}, defaults, options);

        var _this = input;
        block = container.find(".block");
        _this.settings = settings;
        _this.onDragStart = function () {
            _this.dragging = true;
            block.addClass("dragging");
            _this.cover = $("<div class=\"drag-cover\"></div>");
            $("body").append(_this.cover);

            $(window).on("mousemove touchmove", _this.onDrag);
            $(window).on("mouseup touchend", _this.onDragEnd);
        };

        _this.onDrag = function (e) {
            if (_this.dragging == true) {
                var eX = e.clientX || e.pageX;
                if (eX == undefined) {
                    eX = e.originalEvent.touches[0].clientX || e.originalEvent.touches[0].pageX;
                };

                var w = eX - block.width() - container.offset().left;
                var barW = container.width();

                var range = _this.settings.range;
                var step = _this.settings.step;
                var min = _this.settings.min;
                var max = _this.settings.max;

                // console.log(_this.settings.range[1]-_this.settings.range[0])
                var stepW = barW / (range[1] - range[0]);

                if (w < min * stepW) {
                    w = min * stepW;
                } else if (w > max * stepW) {
                    w = max * stepW;
                } else {
                    w = parseInt(w / stepW / step, 10) * step * stepW;
                };

                block.closest(".inner-bar").css({
                    width: w
                });

                var percentage = parseInt(w / stepW / step, 10) * step + range[0];

                var text = _this.settings.format.replace("%s", percentage);
                block.find(".label").text(text);
                input.val(percentage);
                input.trigger("change");
            };
        };

        _this.onDragEnd = function () {
            if (_this.cover) {
                _this.cover.remove();
            };
            _this.dragging = false;
            block.removeClass("dragging");

            $(window).off("mousemove touchmove", _this.onDrag);
            $(window).off("mouseup touchend", _this.onDragEnd);
        };

        block.on("mousedown touchstart", function (e) {
            if (block.closest(".field").hasClass("readonly")) {
                return;
            }
            _this.onDragStart();
        });

        input.setValue = function (value) {
            var percentage = parseInt(value, 10);

            var range = _this.settings.range;
            var step = _this.settings.step;
            var min = _this.settings.min;
            var max = _this.settings.max;

            percentage = percentage > max ? max : percentage < min ? min : percentage;

            var barW = container.width();
            var stepW = barW / (range[1] - range[0]);

            var text = _this.settings.format.replace("%s", percentage);
            block.find(".label").text(text);

            block.closest(".inner-bar").css({
                width: percentage * stepW
            });

            input.val(percentage);
            input.trigger("change");
        };

        return input;
    };
})(jQuery);