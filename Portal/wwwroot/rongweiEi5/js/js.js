$(window).ready(function () {
	//ei5落地页-美图排序 弹层
	$('.ei5w7 li').click(function (event) {
		var im_tan = $(this).attr('zib');
		$('.mg6_jjtan_slick').slickGoTo(im_tan-1);
	});
	$('.ei5w7 li').click(function (event) {
		$('.Rw_jjtan').addClass('cur');
		var mg6_jjtan_slick = $('.Rw_jjtan .mg6_jjtan_slick img').height();
		var jj_img = $('.Rw_jjtan .con .gb_im').height();
		var jj_ul = $('.Rw_jjtan .con ul').height();
		$('.Rw_jjtan .con').css('margin-top', -((mg6_jjtan_slick + jj_img + jj_ul) / 2));

	});
	$('.Rw_jjtan .con .gb_im').click(function (event) {//关闭弹层
		$('.Rw_jjtan').removeClass('cur');
	});
});

$(window).load(function () {
	//13个车型站下载的二维码不同
	var carName=$('body').data('car');
	var car={
	'ei5':'/images/down/Ei5.jpg',
	};
	var carCodeApp = {
	  'ei5':'/images/app/ei5.png',
	};

	//ei5落地页
	function newWidth() {
		//ei5 详情弹出
		$(".ei5btn").click(function () {
			$("html,body").css("overflow", "hidden")
			var swt_but_name = $(this).data("sum");
			$(".ei5deitem").each(function () {
				if ($(this).data("sum") == swt_but_name) {
					$(".ei5Det").addClass('cur');
					$(this).parent().css("z-index", "100");
					$(this).find("img").each(function () {
						var new_src = $(this).data("src");
						$(this).attr("src", new_src);
					});
				}
				if ($(this).css("display") == "block") {
					$(this).slick({ infinite: false });
				}
			})
			$(".ei5deitem").load(function () {
				var dtImgh = $(".DeTextul").siblings("img").height();
				$(".DeTextul").height($(".ei5deitem").height() - dtImgh - 30);
			})
			var dtImgh = $(".DeTextul").siblings("img").height();
			$(".DeTextul").height($(".ei5deitem").height() - dtImgh - 30);
			$(".DeTextul").mCustomScrollbar();

		})

		var bodyw = $(window).width();
		if (bodyw > 1280) {
			$(".fixedi5 ,.ei5deitem").height(bodyw * 730 / 1920);
		} else {
			$(".fixedi5 ,.ei5deitem").height(534);
		}
		var eith = $(".ei5deitem").height();
		var eitw = $(".ei5deitem").width();
		$(".fixedi5").css("margin-top", ($(window).height() - eith) / 2 + "px")
		$(".fixedi5").css("margin-left", ($(window).width() - eitw) / 2 + "px")

		// $(".DeTextul").mCustomScrollbar();
		$(".ei5deC").click(function () {
			$(".ei5Det").removeClass("cur");
			$(".fixedi5").css("z-index", "11");
			$("html,body").css("overflow", "auto");
		})
	}
	
	newWidth();
	//频幕变化 resize
	$(window).resize(function () {
		newWidth()
	});
})