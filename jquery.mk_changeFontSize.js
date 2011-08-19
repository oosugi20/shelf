;/* $.mk.changeFontSize
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0
	@requier     : jquery.js, jquery.mk_cookie.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.11.02 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	
	
****************************************************************************/

(function($){


$.fn.mk_changeFontSize = function(config){
	config = $.extend({},$.mk_changeFontSize.defaults,config);
	
	
	var $targetArea = $(config.area);
	
	var $container = this;
	var $buttons = $container.find('.small, .medium, .large');
	var $small = $buttons.filter('.small');
	var $medium = $buttons.filter('.medium');
	var $large = $buttons.filter('.large');
	
	
	var $smallImg = $small.find('img');
	var smallImgSrc = $smallImg.attr('src');
	var smallDot = smallImgSrc.lastIndexOf('.');
	var smallImgSrcOn = smallImgSrc.substr(0,smallDot)+'_on'+smallImgSrc.substr(smallDot);
	var $smallImgOn = $('<img/>',{ 'src': smallImgSrcOn });
	
	var $mediumImg = $medium.find('img');
	var mediumImgSrc = $mediumImg.attr('src');
	var mediumDot = mediumImgSrc.lastIndexOf('.');
	var mediumImgSrcOn = mediumImgSrc.substr(0,mediumDot)+'_on'+mediumImgSrc.substr(mediumDot);
	var $mediumImgOn = $('<img/>',{ 'src': mediumImgSrcOn });
	
	var $largeImg = $large.find('img');
	var largeImgSrc = $largeImg.attr('src');
	var largeDot = largeImgSrc.lastIndexOf('.');
	var largeImgSrcOn = largeImgSrc.substr(0,largeDot)+'_on'+largeImgSrc.substr(largeDot);
	var $largeImgOn = $('<img/>',{ 'src': largeImgSrcOn });
	
	// begging
	var cookie = $.mk_cookie.read('mk_changeFontSize');
	if(cookie==config.small){
		var fontSize = config.small;
		$smallImg.attr('src',smallImgSrcOn);
	}
	else if(cookie==config.large){
		var fontSize = config.large;
		$largeImg.attr('src',largeImgSrcOn);
	}
	else{
		var fontSize = config.medium;
		$mediumImg.attr('src',mediumImgSrcOn);
	}
	$targetArea.css({ fontSize: fontSize });
	
	
	// switch function
	var _switch = function(fontSize){
		if(config.animate){
			$targetArea.stop(true,false).animate({ fontSize: fontSize },config.speed);
		}else{
			$targetArea.css({ fontSize: fontSize },config.speed);
		}
		$.mk_cookie.create({
			name: 'mk_changeFontSize',
			value: fontSize
		});
		
		$smallImg.attr('src',smallImgSrc);
		$mediumImg.attr('src',mediumImgSrc);
		$largeImg.attr('src',largeImgSrc);
	};
	
	// bind
	$small.bind('mk_chageFontSize',function(){
		_switch(config.small);
		$smallImg.attr('src',smallImgSrcOn);
	});
	$medium.bind('mk_chageFontSize',function(){
		_switch(config.medium);
		$mediumImg.attr('src',mediumImgSrcOn);
	});
	$large.bind('mk_chageFontSize',function(){
		_switch(config.large);
		$largeImg.attr('src',largeImgSrcOn);
	});
	
	// action
	$buttons
		.css({
			cursor: 'pointer'
		})
		.mouseenter(function(){
			$(this).stop(true,false).animate({ opacity: 0.7 }, 200);
		})
		.mouseleave(function(){
			$(this).stop(true,false).animate({ opacity: 1 }, 100);
		})
		.click(function(){
			$(this).trigger('mk_chageFontSize');
			$(this).css({ opacity: 1 });
		});
	
	return this;
};


$.mk_changeFontSize = {
	version: 1.0,
	defaults: {
		small: '100%',
		medium: '116.7%',
		large: '133.4%',
		area: '#main',
		hover: true,
		animate: true,
		speed: 200
	}
};


})(jQuery);
