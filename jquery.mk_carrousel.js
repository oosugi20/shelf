/* $.fn.mk_carrousel
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 0
	@author      : http://www.makinokobo.com - kobo@makinokobo.com
	@last update : 2011.06.09 - oosugi@skillpartners.co.jp
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	usage:
	
	
****************************************************************************/
;(function($){


$(function(){
	$('.ui-carrousel').mk_carrousel();
	$('.mainvisual').mk_carrousel({
		list: 'ul.contents',
		navClass: 'nav'
	});
});


$.fn.mk_carrousel = function(options){
	if(!this.size()) return this;
	
	//default options
	var defaults = {
		list: 'ul.list',
		item: 'li',
		speed: 500,
		effect: 'easeOutQuart',
		fn_onPrev: null,
		fn_onNext: null,
		auto: true,
		interval: 5000,
		navClass: 'ui-carrousel-nav',
		currentClass: 'ui-current'
	};
	
	var o = $.extend(defaults, options);
	
	this.each(function(){
		var $this = $(this);
		var $list = $this.find(o.list);
		var $item = $list.find(o.item);
		var displayW = $list.innerWidth();
		var itemNum = $item.size();
		var itemW = $item.outerWidth();
		var itemMl = $item.css('margin-left').replace('px','')*1;
		var itemMr = $item.css('margin-right').replace('px','')*1;
		var itemW_ = itemW + itemMl + itemMr;
		var listW = itemW_ * itemNum;
		
		var $display = $('<div/>').css({
			'position': 'relative',
			'width': displayW + 'px',
			'overflow': 'hidden'
		});
		
		var $nav = $('<ul/>').attr('class', o.navClass);
		var navItem = '<li/>';
		
		var displayNum = Math.floor(displayW / itemW_);
		var displayIndex = 0;
		var math_left = function(){ return 0 - displayIndex * displayNum * itemW_; };
		var timer;
		//var flag = false;
		
		
		//nav
		$this.append($nav);
		var displaySectionNum = Math.ceil(itemNum / displayNum);
		for(var i=1;i<=displaySectionNum;i++){
			$nav.append($(navItem).html('<a href="#">'+i+'</a>'));
		}
		var $navBtn = $this.find('.'+o.navClass+' li a');
		
		
		//functions
		var fn_current = function(){
			$navBtn.parent().removeClass(o.currentClass)
				.eq(displayIndex).addClass(o.currentClass);
		};
		
		var fn_next = function(callback){
			//if(flag) return;
			//flag = true;
			$list.stop(true,false).clearQueue([]).animate({ 'left': math_left() + 'px' }, o.speed, o.effect, function(){
				if(callback) callback();
				if(o.fn_onNext) o.fn_onNext();
				//flag = false;
			});
			fn_current();
			displayIndex++;
		};
		
		var fn_prev = function(callback){
			//if(flag) return;
			//flag = true;
			$list.stop(true,false).clearQueue([]).animate({ 'left': math_left() + 'px' }, o.speed, o.effect, function(){
				if(callback) callback();
				if(o.fn_onPrev) o.fn_onPrev();
				//flag = false;
			});
			displayIndex--;
		};
		
		var fn_slide = function(callback){
			//if(flag) return;
			if(displayIndex < itemNum / displayNum){
				fn_next(callback);
			}
			else{
				//flag = true;
				displayIndex = 0;
				$list.stop(true,false).clearQueue([]).animate({ 'left': 0 + 'px' }, o.speed, o.effect, function(){
					//flag = false;
					displayIndex++;
				});
				fn_current();
			}
		};
		
		var fn_auto = function(){
			if(o.auto){
				timer = setInterval(function(){
					fn_slide();
				}, o.interval);
			}
		};
		
		
		//init
		$this.css({
			'overflow': 'hidden'
		});
		
		$list
			.width(listW)
			.css({
				'position': 'relative'
			})
			.wrap($display);
		
		$navBtn.each(function(){
			$(this).click(function(e){
				displayIndex = $navBtn.index($(this));
				clearInterval(timer);
				fn_slide(function(){
					fn_auto();
				});
				e.preventDefault();
			});
		});
		fn_current();
		fn_slide(function(){
			fn_auto();
		});
	});
	
	return this;
};

})(jQuery);







