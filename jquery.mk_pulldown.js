;/* $.mk_pulldownMenu
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	varsion     : 1.0
	author      : http://www.makinokobo.com - oosugi
	last update : 2010.10.20 - oosugi
	Copyright   : Copyright (c) 2011 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	
	$('SELECTOR').mk_pulldownMenu();
	=========================================================================
	動作を起こしたい要素に対して実行する。
	動作を起こしたい要素はひとまとめに要素で囲んでおく必要がある。
	
	
	-------------------------------------------------------------------------
	#Sample - ul#globalnavi > li > ul.menu-lv2
	-------------------------------------------------------------------------
	$('#glovalnavi li').mk_pulldownMenu();
	
	
	-------------------------------------------------------------------------
	#Sample - div#sample > div.section > div.unit
	-------------------------------------------------------------------------
	$('#sample .section').mk_pulldownMenu({
		children: '.unit'
	});
	
	
	-------------------------------------------------------------------------
	#Config
	-------------------------------------------------------------------------
	$('SELECTOR').mk_pulldownMenu({
		downSpeed: 200,
		upSpeed: 50,
		delay: 300,
		children: 'ul'
	});
	
****************************************************************************/
(function($){

$.fn.mk_pulldownMenu = function(options){
	//default options
	var defaults = {
		downSpeed: 200,
		upSpeed: 50,
		delay: 300,
		children: 'ul'
	};
	
	var o = $.extend(defaults, options);
	var timeout;
	var start = false;
	
	return this
		.mouseenter(function(){
			clearTimeout(timeout);
			$(this).siblings().children(o.children).stop(false,true).slideUp(o.upSpeed);
			$(this).children(o.children).stop(false,true).slideDown(o.downSpeed);
		})
		.mouseleave(function(){
			var $this = $(this);
			timeout = setTimeout(function(){ $this.children(o.children).stop(false,true).slideUp(o.upSpeed); }, o.delay);
		});
};

})(jQuery);