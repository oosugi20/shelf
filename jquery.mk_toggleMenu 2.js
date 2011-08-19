;/* $.mk_toggleMenu
****************************************************************************
	
	-----------------------------------------------------------------------
	@varsion     : 1.3
	@requiers    : jquery.js, jquery.mk_location.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.10.31 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	-----------------------------------------------------------------------
	
	$('SELECTOR').mk_toggleMenu();
	=========================================================================
	
	
	Config
	-------------------------------------------------------------------------
	$('SELECTOR').mk_toggleMenu({
		downSpeed: 200,
		upSpeed: 100,
		children: 'ul',
		openButton: '+',
		closeButton: '-',
		openClass: 'open',
		closeClass: 'close'
	});
	
****************************************************************************/

(function($){

$.fn.mk_toggleMenu = function(config){
	// defalt
	config = $.extend({},$.mk_toggleMenu.defaults,config);
	
	// values
	var downSpeed = config.downSpeed;
	var upSpeed = config.upSpeed;
	var children = config.children;
	var openButton = config.openButton;
	var closeButton = config.closeButton;
	var openClass = config.openClass;
	var closeClass = config.closeClass;
	var currentClass = config.currentClass;
	var button = '<span class="mk_toggleMenu-button">'+openButton+'</span>';
	
	// closeButton img cache
	if(closeButton.match(/src\=\"/)){
		var imgsrc = openButton.substr(openButton.indexOf('src="')+5);
		imgsrc = imgsrc.substr(0,imgsrc.indexOf('"'));
		var imgCache = new Object();
		imgCache = new Image();
		imgCache.src = imgsrc;
	}
	
	// action
	this.each(function(){
		if($(this).children(children).size()!=0){
			$(this)
				.prepend(button)
				.children('.mk_toggleMenu-button')
					.click(function(){
						if($(this).html()==closeButton){
							$(this)
								.html(openButton);
							if($(this).parent().find('a.'+currentClass).size()!=0){
								$(this)
									.removeClass('mk_toggleMenu-button-currentOpen')
									.addClass('mk_toggleMenu-button-currentClose');
							}else{
								$(this)
									.removeClass('mk_toggleMenu-button-open')
									.addClass('mk_toggleMenu-button-close');
							}
							$(this).parent()
								.removeClass(openClass)
								.addClass(closeClass)
								.children(children).stop(false,true).slideUp(upSpeed);
						}else if($(this).html()==openButton){
							$(this)
								.html(closeButton);
								if($(this).parent().find('a.'+currentClass).size()!=0){
									$(this)
										.removeClass('mk_toggleMenu-button-currentClose')
										.addClass('mk_toggleMenu-button-currentOpen');
								}else{
									$(this)
										.removeClass('mk_toggleMenu-button-close')
										.addClass('mk_toggleMenu-button-open');
								}
							$(this).parent()
								.addClass(openClass)
								.removeClass(closeClass)
								.children(children).stop(false,true).slideDown(downSpeed);
						}
					});
		};
		
		
		// begiing
		$(this).addClass(closeClass).children(children).slideUp(0);
		$(this).children('.mk_toggleMenu-button').addClass('mk_toggleMenu-button-close');
		$(this).mk_current({className: currentClass});
		$(this).filter('.'+currentClass).addClass(openClass).removeClass(closeClass)
			.children(children).slideDown(0)
			.end()
			.children('.mk_toggleMenu-button')
				.html(closeButton)
				.removeClass('mk_toggleMenu-button-close')
				.addClass('mk_toggleMenu-button-currentOpen');
		$(this).find('.mk_toggleMenu-button').css({
			cursor: 'pointer'
		});
	});
	
	return this;
};


$.mk_toggleMenu = {
	version: 1.3,
	defaults: {
		downSpeed: 200,
		upSpeed: 100,
		children: 'ul',
		openButton: '+',
		closeButton: '-',
		openClass: 'open',
		closeClass: 'close',
		currentClass: 'current'
	}
};


})(jQuery);