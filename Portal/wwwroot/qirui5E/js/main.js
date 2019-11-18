//ad
    $(function(){
                $(".slide_img_ul li img").hide();
                $(".slide_img_ul li img").eq(0).show();
                $(".slide_option li").click(function(){
                    var $check_li=$(this), check_index=$(this).index();
                    $check_li.addClass("check_li").siblings().removeClass("check_li");
                    $(".slide_img_ul li img").hide().eq(check_index).fadeToggle(1000);
                })
        
         var ints=window.setInterval(Timers,3000);
        function Timers(){
                    var Allli=$(".slide_option li");
                    var CheckLi=$(".slide_option .check_li"),Cindex=Allli.index($(".slide_option .check_li"));
                    if(Cindex+1==Allli.length){
                        Allli.eq(0).trigger('click');
                    }else{
                        CheckLi.next().trigger('click');
                    }
                }
            $(".slide_option li").hover(function (){
                    ints=window.clearInterval(ints);
            },function(){
                 ints=window.setInterval(Timers,3000);
            })
            })
/*

//index-品牌活动 inmodule-1
$(document).ready(function(){
    $(".inmodule-1 .activity").hover(function(){
        $(".hover").css("display","block");
    },function(){
        $(".hover").css("display","block");
    });
});
*/
//侧边栏
$(document).ready(function(){

    $(".side ul li").hover(function(){

        $(this).find(".sidebox").stop().animate({"width":"114px"},200).css({})    

    },function(){

        $(this).find(".sidebox").stop().animate({"width":"50px"},200).css({})   

    });
});



//回到顶部

function goTop(){

    $('html,body').animate({'scrollTop':1},600);

}


//子页面栏目样式
$(document).ready(function(){
    $('.pagenews-list li:nth-child(3n)').css('margin-right', '0');
});

//招聘

$(document).ready(function () {
    $(".recruit-more").click(function () {
        $(this).parents('li').find(".conter").toggle();
        $(this).parent().parent().parent().find("[class='more']").toggle();
        $(this).parent().parent().parent().find("[class='less']").toggle();
    });
});

////经销商查询
//$(document).ready(function () {
//    $(".ewm a").hover(function () {
//        $(this).parents('li').find(".ewm-hover").toggle();
//    });

//});

//在线留言

$(document).ready(function () {
    $(".collapse-more").click(function () {
        $(this).parents('li').find(".am-collapse").toggle();
        $(this).parent().parent().parent().find("[class='more']").toggle();
        $(this).parent().parent().parent().find("[class='less']").toggle();
    });
});
//用车贴士
$(document).ready(function () {
    $(".Cartips-more").click(function () {
        $(this).parents('li').find(".conter2").toggle();
        //$(this).parents('li .am-g').addClass('hover').slbings().removeClass("hover");
        $(this).parent().parent().parent().find("[class='more']").toggle();
        $(this).parent().parent().parent().find("[class='less']").toggle();
    });
});
//配置表
$(window).load(function () {
                $("#configuration-table .clone").html($("#configuration-table table").clone());
                $("#configuration-table").scrollTop("0");
                $("#configuration-table").scroll(function () {
                    mt = $(this).scrollTop();
                    $("#configuration-table .clone").css("margin-top", mt + "px");
                });
            });
$(window).load(function () {
                $("#configuration-table .clone2").html($("#configuration-table table").clone());
                $("#configuration-table").scrollTop("0");
                $("#configuration-table").scroll(function () {
                    mt = $(this).scrollTop();
                    $("#configuration-table .clone2").css("margin-top", mt + "px");
                });
            });
$(window).load(function () {
                $("#configuration-table .clone3").html($("#configuration-table table").clone());
                $("#configuration-table").scrollTop("0");
                $("#configuration-table").scroll(function () {
                    mt = $(this).scrollTop();
                    $("#configuration-table .clone3").css("margin-top", mt + "px");
                });
            });

/**


**/
$(".postp1").hover(
     function () {
    $(".link01").addClass("linkhover");
  },
     function () {
    $(".link01").removeClass("linkhover");
  }
);

$(".postp2").hover(
     function () {
    $(".link02").addClass("linkhover");
  },
     function () {
    $(".link02").removeClass("linkhover");
  }
);


$(".postp3").hover(
     function () {
    $(".link03").addClass("linkhover");
  },
     function () {
    $(".link03").removeClass("linkhover");
  }
);

$(".postp4").hover(
     function () {
    $(".link04").addClass("linkhover");
  },
     function () {
    $(".link04").removeClass("linkhover");
  }
);


$(".postp5").hover(
     function () {
    $(".link05").addClass("linkhover");
  },
     function () {
    $(".link05").removeClass("linkhover");
  }
);


$(".postp6").hover(
     function () {
    $(".link06").addClass("linkhover");
  },
     function () {
    $(".link06").removeClass("linkhover");
  }
);


$(".postp7").hover(
     function () {
    $(".link07").addClass("linkhover");
  },
     function () {
    $(".link07").removeClass("linkhover");
  }
);


$(".postp8").hover(
     function () {
    $(".link08").addClass("linkhover");
  },
     function () {
    $(".link08").removeClass("linkhover");
  }
);

// 图片对比
$(function () {
    var imageWrap = $('.vfx-image-wrap'),
        topImage = $(this).find('.before-image'),
        divider = $(this).find('.divider-bar'),
        stayBounce = $('.toggle-function');

    imageWrap.on("mousemove", function (e) {
      // 
        var offsets = $(this).offset(),
            fullWidth = $(this).width(),
            mouseX = e.pageX - offsets.left,
            topImage = $(this).find('.before-image'),
            divider = $(this).find('.divider-bar');

        if (mouseX < 0) {
            mouseX = 0;
        } else if (mouseX > fullWidth) {
            mouseX = fullWidth
        }
      $(this).addClass('special');
        divider.css({ left: mouseX, transition: 'none' });
        topImage.css({ width: mouseX, transition: 'none' });
    });
  stayBounce.click(function(){
    $(this).toggleClass('stay');
  });

  imageWrap.on("mouseleave", function () {
    if (!stayBounce.hasClass('stay')) {
      divider.css({  left: '50%', transition: 'all .3s' });
      topImage.css({  width: '50%', transition: 'all .3s' });
    }
  });
});