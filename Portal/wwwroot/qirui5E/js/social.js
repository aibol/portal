(function($){
	
	$(".social").click(function(e){
		$(".social").hide();
	});

	$(".social a").click(function(e){
		e.stopPropagation();
	});

})(jQuery)