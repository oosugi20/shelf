/* $.mk_slideshow
****************************************************************************
	
	// フェードイン・フェードアウトのスライドショー
	-----------------------------------------------------------------------
	varsion     : 1.1.1
	author      : http://www.makinokobo.com - oosugi
	last update : 2010.11.16 - oosugi
	Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	-----------------------------------------------------------------------
	
	
	// Use Defalt
	=======================================================================
	$('SELECTOR').mk_slideShow();
		
		Defalt Setting is...
		---------------------------------------------
		startTime: 5000
		speed: 2000
		putTime: 800
		interval: 8000
	
	
	// Use Config
	=======================================================================
	$('SELECTOR').mk_slideShow({
		startTime: 5000,
		speed: 2000,
		putTime: 2000,
		interval: 8000
	});
	
****************************************************************************/
(function(){

$.fn.mk_slideShow = function(config){
	// Default Config
	config = $.extend({
		startTime: 5000,
		speed: 2000,
		putTime: 2000,
		interval: 8000
	},config);
	
	this.each(function(){
		
		// Elements
		var $container = $(this);
		var $items = $container.children();
		var $itemFirst = $items.filter(':first');
		var $item = $items.find('img');
		
		// Values
		var itemsSize = $items.size();
		var maxHeight = 0;
		var maxWidth = 0;
		$items.each(function(){
			maxHeight = Math.max(maxHeight,$(this).height());
			maxWidth = Math.max(maxWidth,$(this).width());
		});
		var num = 0;
		var startTime = config.startTime;
		var speed = config.speed;
		var delay = speed - config.putTime;
		var interval = speed + (speed - delay) + config.interval;
		
		// CSS Setting
		$container.css({
			position: 'relative',
			width: maxWidth+'px',
			height: maxHeight+'px'
		});
		
		$items
			.css({
				position: 'absolute',
				width: maxWidth+'px',
				height: maxHeight+'px'
			})
			.each(function(){
				$(this).css({
					paddingTop: (maxHeight-$(this).find('img').height())/2+'px',
					paddingLeft: (maxWidth-$(this).find('img').width())/2+'px'
				});
			});
		
		// Beginning Display
		$items.hide();
		$itemFirst.show();
		
		// Roop
		var roop = function(){
			$items.filter(':eq('+num+')').fadeOut(speed);
			
			if((num+1)==itemsSize){
				num = 0;
				$itemFirst.delay(delay).fadeIn(speed,function(){
					timeout = setTimeout(function(){ roop(); }, interval);
				});
			}else{
				num++;
				$items.filter(':eq('+num+')').delay(delay).fadeIn(speed,function(){
					timeout = setTimeout(function(){ roop(); }, interval);
				});
			}
		};
		
		// Start
		var timeout = setTimeout(function(){ roop(); },startTime);
		
	});
	
	return this;
};

})(jQuery);
