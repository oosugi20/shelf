;/* $.mk_tab
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0
	@requiers    : jquery.js, jquery.mk_cookie.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.10.30 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	$('SELECTOR').mk_tab();
	=========================================================================
	タブメニュー表示プラグイン。
	表示動作を起こしたい要素に対して実行する。
	
	
	-------------------------------------------------------------------------
	#Config
	-------------------------------------------------------------------------
	$('SELECTOR').mk_tab({
		navi: '.mk_tabNavi',//タブナビゲーションに対して指定する
		body: '.mk_tabBody',//タブコンテンツに対して指定する
		currentClass: 'current',//currentのclass名
		speed: 200,
		cookie: true,
		fixedHeight: true
	});
	
****************************************************************************/
(function(){

/* tab setting
=========================================== */
$(function(){
	$('.home-tab').mk_tab({
		navi: 'ul.nav li',
		body: '.body',
		currentClass: 'ui-current'
	});
	
	$('.ui-tab').mk_tab({
		navi: '.part-tabButtonA li',
		body: '.sectionLv1-body',
		currentClass: 'ui-current',
		currentImg: true,
		cookie: false
	});
});


$.fn.mk_tab = function(config){
	config = $.extend({},$.mk_tab.defaults,config);
	
	var $containers = $(this);
	$containers.find(config.body).hide();
	
	return this.each(function(){
		var $container = $(this);
		var $navi = $(this).find(config.navi);
		var $naviItems = $navi.find('a');
		var $bodys = $(this).find(config.body);
		
		//current image
		if(config.currentImg){
			$navi.each(function(){
				var $this = $(this);
				var $btn = $this.find('img');
				var src = $btn.attr('src');
				var srcOn = src.replace(/(\.jpg|\.jpeg|\.gif|\.png)/,'_cr$1');
				$this.css({'background': 'url('+srcOn+') no-repeat'});
			});
		}
		
		// fixed height
		if(config.fixedHeight){
			$bodys.wrapAll($('<div/>',{ 'class': 'mk_tabViewport'}));
			var $viewport = $container.find('.mk_tabViewport');
			var maxH = 0;
			$bodys.each(function(){
				maxH = Math.max(maxH, $(this).outerHeight());
			});
			if(navigator.userAgent.indexOf("MSIE 6") != -1){
				$viewport.height(maxH);
			}else{
				$viewport.css({ minHeight: maxH+'px' });
			}
		}
		
		var num = 0;
		var currentNum = 0;
		
		// cookie read
		if(config.cookie){
			var containerID = $containers.index($container);
			var cookieName = $(this).attr('class')+containerID;
			var cookieValue = $.mk_cookie.read(cookieName);
			if(cookieValue){
				num = cookieValue;
				currentNum = cookieValue;
			}
		}
		
		// begging
		$bodys.eq(num).show();
		$naviItems.removeClass(config.currentClass).css({cursor: 'pointer'})
			.eq(num).addClass(config.currentClass).css({cursor: 'default'});
		
		// action
		$naviItems
			.unbind('click.mk_smoothScroll')
			.bind('mk_tab',function(){
				currentNum = num;
				$naviItems.removeClass(config.currentClass).css({cursor: 'pointer'})
					.eq(num).addClass(config.currentClass).css({cursor: 'default'});
				$bodys.hide().eq(num).fadeIn(config.speed);
				
				// cookie create
				if(config.cookie) $.mk_cookie.create({ name: cookieName, value: num});
				return false;
			})
			.click(function(){
				num = $naviItems.index(this);
				if(num!=currentNum) $(this).trigger('mk_tab');
				return false;
			});
	});
};


$.mk_tab = {
	version: 1.0,
	defaults: {
		navi: '.mk_tabNavi',
		body: '.mk_tabBody',
		currentClass: 'current',
		currentImg: false,
		speed: 200,
		cookie: true,
		fixedHeight: true
	}
};


})(jQuery);