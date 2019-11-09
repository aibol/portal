var ObjCls = function () {
    var instance = {
        'BindBrand': function (dom, defaultText) {
            if (!defaultText) { defaultText = "--请选择--"; }
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetBrand",
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text(defaultText).appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.Id).text(item.Name).appendTo(dom);
                    });

                }
            });
        },
        'BindSeries': function (dom, brandid) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetSeriesByBrandId",
                data: { brandid: brandid },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text('--请选择--').appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.SERIES_ID).text(item.SERIES_NAME).appendTo(dom);
                    });
                }
            });
        },
        'BindModel': function (dom, seriesid) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetModelsBySeriesId",
                data: { seriesid: seriesid },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text('--请选择--').appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.MODEL_ID).text(item.MODEL_NAME).appendTo(dom);
                    });
                }
            });
        },
        'BindModelBySeriesNm': function (dom, seriesnm) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/Vehicle/GetCarModelBySeriesNm",
                data: { seriesName: seriesnm },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text('--请选择--').appendTo(dom);
                    $.each(data, function (index, item) {

                        $("<option></option>").val(item.Id).text(item.Name).appendTo(dom);
                    });
                }
            });
        },
        'BindProvince': function (dom, defaultText, callback) {
            if (!defaultText) { defaultText = "--请选择省份--"; }
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetProvinces",
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text(defaultText).appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.PROVINCE_ID).text(item.PROVINCE_NAME).appendTo(dom);
                    });
                    if (typeof callback == "function") {
                        callback();
                    }
                }
            });
        },
        'BindCity': function (dom, provinceid, defaultText, callback) {
            if (!defaultText) { defaultText = "--请选择城市--"; }
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetCitysByProvinceId",
                data: { provinceid: provinceid },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text(defaultText).appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.CITY_ID).text(item.CITY_NAME).appendTo(dom);
                    });
                    if (typeof callback == "function") {
                        callback();
                    }
                }
            });
        },
        'BindDealerSimple': function (dom, cityid) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetDealerByCityid",
                data: { cityid: cityid },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text('--请选择经销商--').appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option data-tel='" + item.SALES_PHONE + "' data-addr='" + item.ADDRESS + "'></option>").val(item.DEALER_CODE).text(item.DEALER_NAME).appendTo(dom);
                    });
                }
            });
        },
        'BindDealerByProvinceCity': function (dom, provinceid, cityid) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetDealersByProvinceIdOrCityId",
                data: { province: province, city: city },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    $("<option></option>").val('').text('--请选择--').appendTo(dom);
                    $.each(data, function (index, item) {
                        $("<option></option>").val(item.DEALER_ID).text(item.DEALER_NAME).appendTo(dom);
                    });
                }
            });
        },
        'GetDealerNews': function (dom, TYPE, TITLE, PageSize, PageIndex) {
            dom.empty();
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetDealerNews",
                data: { TYPE: TYPE, TITLE: TITLE, PageSize: PageSize, PageIndex: PageIndex },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        dom.val(dom.val() + "\r\n" + item.TYPE + "  " + item.TITLE);
                    }
                }
            });
        },
        'GetProvince': function (callback) {
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetProvinces",
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetCity': function (data, callback) {
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetCitysByProvinceId",
                data: data,
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetDealerList': function (data, callback) {
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetDealersByMod",
                data: data,
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetCarSeries': function (data, callback) {
            $.ajax({
                url: "/Umbraco/Surface/Vehicle/GetCarSeries",
                data: data,
                method: 'post',
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetModel': function (seriesid, callback) {
            $.ajax({
                url: "/Umbraco/Surface/vehicle/GetCarModel",
                data: { seriesid: seriesid },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetModelBySeriesNm': function (seriesnm, callback) {
            $.ajax({
                url: "/Umbraco/Surface/Vehicle/GetCarModelBySeriesNm",
                data: { seriesCode: seriesnm },
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetLoanPackage': function (data, callback) {
            $.ajax({
                url: "/Umbraco/Surface/Carloan/GetAllLoanPackage",
                data: data,
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
        'GetDealersAndProvider': function (data, callback) {
            $.ajax({
                url: "/Umbraco/Surface/ajax/GetDealersAndProvider",
                data: data,
                method: 'post',
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                }
            });
        },
    };
    return instance;
};