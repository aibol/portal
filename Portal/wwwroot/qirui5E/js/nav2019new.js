 /**
     * 部导航菜单菜单 hover 效果
     */
    $('.nav_index .nav-left li').hover(function(){
         $(this).addClass('active').siblings().removeClass('active')
         if($(this).hasClass('active')) {
            $(this).find('.dropdown-menus').fadeIn().parent().siblings().find('.dropdown-menus').hide()
         }
      },function(){
        $(this).find('.dropdown-menus').hide()
    })

    /**
     * 导航下拉菜单
     */
    $('.dropdown-menus .tabs li').hover(function(){
        $(this).addClass('active').siblings().removeClass('active')
        if($(this).hasClass('active')) {
            // console.log($(this).index())
           $('.tabs-panel-wrap .tabs-panel').eq($(this).index()).fadeIn().siblings().hide()
        }
    },function(){
        
    })

    /**
     * 下拉菜单hover效果
     */
    $('.tabs-panel-wrap .panel-item').hover(function(){
        $(this).find('.panel-item-btn-group').fadeIn().parent().siblings().find('.panel-item-btn-group').hide()
    },function(){
        $(this).find('.panel-item-btn-group').hide()
    })