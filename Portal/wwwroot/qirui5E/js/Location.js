
var CurrentLocation = {};
var locationModule = {};
(function ($) {
      locationModule = {
        locationResolver: function (callback) {
            var geolocation = new BMap.Geolocation();
            try {
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {

                        var location = {
                            city: r.address.city,
                            lat: r.point.lat,
                            lng: r.point.lng,
                            province: r.address.province
                        };
                        if (typeof callback == "function") {
                            callback(location);
                        }

                    } else {
                        if (typeof callback == "function") {
                            callback(location);
                        }
                    }
                }, {
                    enableHighAccuracy: true
                })
            } catch (ex) {
                if (typeof callback == "function") {
                    callback(location);
                }
            }
        },
        /*
         * 根据地址获得经纬度
         */
        getPoint: function (address, calback) {
            var geocoder = new BMap.Geocoder();
            //默认为南京  
            var longitude = 118.807395;
            var latitude = 32.065315;
            //获取起始地址经纬度  
            geocoder.getPoint(address, function (point) {
                if (point) {
                    if (typeof callback == "function") {
                        calback(point);
                    }
                 
                } else {
                    if (typeof callback == "function") {
                        calback(point);
                    }
                }
            });
        }
    }
    locationModule.locationResolver(function (location) {     
        CurrentLocation = location;
    });
})(jQuery);