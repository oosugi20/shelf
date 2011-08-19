;/* $.fn.mk_toggle.js
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 0
	@author      : http://www.makinokobo.com - oosugi@skillpartners.co.jp
	@last update : 2011.06.03 - oosugi@skillpartners.co.jp
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	usage:
	
	
****************************************************************************/
(function($){


$(function(){
	$('#footerMenu').mk_toggle({
		button: '#footerMenu-head > p.menuSwitch a',
		area: '#footerMenu-body'
	});
});


$.fn.mk_toggle = function(options){
	if(!this.size()) return this;
	
	//default options
	var defaults = {
		button: '.ui-mk_toggle-btn',
		area: '.ui-mk_toggle-area',
		textOpen: 'open',
		textClose: 'close',
		classOpen: 'ui-open',
		classClose: 'ui-close',
		speed: 600
	};
	
	var o = $.extend(defaults, options);
	
	this.each(function(){
		var $this = $(this);
		var $btn = $this.find(o.button);
		var $area = $this.find(o.area);
		
		//init
		$area.hide();
		$btn.text(o.textOpen).removeClass(o.classOpen).addClass(o.classClose);
		
		//button click action
		$btn.toggle(
			function(e){
				$area.stop(false,true).slideDown(o.speed);
				$btn.text(o.textClose).removeClass(o.classClose).addClass(o.classOpen);
				e.preventDefault();
			},
			function(e){
				$area.stop(false,true).slideUp(o.speed/2);
				$btn.text(o.textOpen).removeClass(o.classOpen).addClass(o.classClose);
				e.preventDefault();
			}
		);
	});
	
	return this;
};

})(jQuery);







