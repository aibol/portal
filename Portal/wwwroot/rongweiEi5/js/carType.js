var carTypeModule = carTypeModule || {};
var url = '/api/m/cartype/cartype';


carTypeModule.getCar = function(parentid, callback){
	$.getJSON(url + parentid + '.js', function(ret){
		if(ret){
		    if($.isFunction(callback)){
				callback(ret);
				var cur = ret[0].id;
			}
		}
	});
	
}