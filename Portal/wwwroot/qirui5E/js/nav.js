(function($){
	$.app = $.app || {};
	$.app.nav = {
		expand: function(){
			$(".main-nav .nav-icon").show();
			$("#topbar").hide();
		},
		shrink: function(){
			$(".main-nav .nav-icon").hide();
			$("#topbar").show();
		},
		checkBottom: function(){
			if (this.isAtBottom()){
				$(".main-nav").addClass("at-bottom");
			}else{
				$(".main-nav").removeClass("at-bottom");
			}
			
		},
		float: function(progress){
			this.progress = progress;
			var nav = $(".nav-container");
			var navHeight = nav.height();
			var winHeight = $(window).height();

			nav.css({
				"top": (winHeight - navHeight) * progress + "px",
				"bottom": "auto"
			});
		},
		shouldShrink: function(progress){
			var progress = progress || this.progress;
			var navHeight = $(".nav-container").height();
			var winHeight = $(window).height();
			return ((winHeight - navHeight) * progress) > navHeight;
		},
		shouldExpand: function(progress){
			var progress = progress || this.progress;
			var navHeight = $(".nav-container").height();
			var winHeight = $(window).height();
			return ((winHeight - navHeight) * progress) <= navHeight;
		},
		isAtBottom: function(){
			var nav = $(".nav-container")
			var navHeight = nav.height();
			var winHeight = $(window).height();
			var top = parseInt(nav.css("top"), 10);
			//console.log(top, winHeight, navHeight)
			return top+navHeight >= winHeight;
		}
	};

	$("#nav-car-series").click(function(e){
		e.preventDefault();
		var container = $(".nav-cars");
		if (!container.is("hidden")) {
			container.show();
			var items = container.find(".car-series");
			for (var index = 0; index < items.length; index ++) {
				var item = items[index];
				$(item).animate({
					"margin-left": "0px"
				}, 300 + 150 * index);
			};
		}
	});
	$("#nav-deaer-query").click(function (e) {
	    e.preventDefault();
	    $("#social").fadeIn(250);
	});

	$(".nav-cars .btn-close").click(function(e){
		e.preventDefault();
		var container = $(".nav-cars").hide();
		var items = container.find(".car-series").css({
			"margin-left": -$(window).width()
		});
	});

	$(".nav-cars .car-series").css({
		"margin-left": -$(window).width()
	});

	$("#nav-deaer-query").click(function(e){
		e.preventDefault();
		$(".social").fadeIn(500);
	});

	//搜索bar
	$("input[name=search]").on("focus", function(e){
		$(".btn-search").addClass("shown");
	}).on("blur", function(e){
		$(".btn-search").removeClass("shown");
	});
	$('.btn-do-search').click(function () {
	    location.href =encodeURI( "/search?keywords=" + $("input[name=search]").val());
	});
})(jQuery);