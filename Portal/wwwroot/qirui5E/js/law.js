(function(e){
	//条款
	$.app = $.app || {};
	$.app.law = {
		show: function(){
			$(".law").fadeIn(500);
			$(".law-content").css({
				height: $(window).height()-200
			})
		},
		close: function(){
			$(".law").fadeOut(500);
		}
	};

	$(".law .close").click(function(e){
		e.preventDefault();
		$.app.law.close();
	});
	
	$("#law-content").niceScroll($.app.scollBarOptions);
	
})(jQuery);