//停留时间 
(function() {
    // window.onload = function () {
		window.localStorage.setItem('startTime', new Date().getTime())
    // }
    window.addEventListener("pagehide", function(){
		window._dtm.push({
			'v': '1',
			'tid':'5',
			'ds': 'web',
			'dl': window.location.href,
			't':'timing',
			'utt': new Date().getTime() - localStorage.getItem('startTime'),
			'host':window.location.host,
			'port':'443',
			'media': 100013
		});
    });
})()

    // // vue中实现pv
// router.afterEach((to,from) => {
	// setTimeout(()=>{ //页面跳转统计埋点
		// window._dtm.push({'v':'1','t':'pageview','ds': 'web','dl': window.location.href, 'host':window.location.host,'port':'443',tid: 5, media: 100014, in: to.query.id});
	// },0);
// });

    
        