/*!
 * $.fn.mk_imgGallery
 *
 * Copyright (c) 2011 Skill Partners Inc. All Rights Reserved.
 *
 * @require: jquery.js
 * @version: 1.0.0
 * @create: 2011-08-22 [oosugi@skillpartners.co.jp]
 * @modify: not yet
 */

(function($){ //start jquery


/**
 * ソートボタンのfunction
 */
$.fn.mk_imgGallery = function(options){
	//default options
	var defaults = {
		items: 'ul.items',
		sortBtn: 'ul.nav li.sort ul',
		sortAllBtn: 'ul.nav li.all'
	};
	var o = $.extend(defaults, options);
	
	this.each(function(){
		var $this = $(this);
		var $items = $this.find(o.items);
		var $item = $items.find('li');
		var $sortBtn = $this.find(o.sortBtn);
		var $sortBtnItem = $sortBtn.find('li a');
		var $sortAllBtn = $this.find(o.sortAllBtn);
		
		$sortBtnItem.click(function(e){
			var $this = $(this);
			var thisClass = $this.parent().attr('class');
			var $target = $item.filter('.' + thisClass);
			
			$item.hide();
			$target.fadeIn(200);
			$.mk_imgGallery($target);
			
			e.preventDefault();
			e.stopPropagation();
		});
		
		$sortAllBtn.click(function(e){
			$item.fadeIn(200);
			$.mk_imgGallery($item);
			
			e.preventDefault();
			e.stopPropagation();
		});
	});
	
	return this;
};


/**
 * ランダムに並び替えるfunction
 */
$.mk_imgGallery = function($items){
	var $items = $items;
	
	//$配列をランダムに並び替え
	$items = (function($items){
		var arr = $.makeArray($items);
		var arrI = arr.length;
		
		while (arrI) {
			var j = Math.floor(Math.random() * arrI);
			var t = arr[--arrI];
			arr[arrI] = arr[j];
			arr[j] = t;
		}
		
		return $(arr);
	})($items);
	
	
	var space = {
		width: $items.parent().width(),
		height: 9999,
		top: 0,
		left: 0
	};
	
	var spaces = [];
	spaces.push(space);
	
	var anime = function($item, top, left){
		$item.stop(false, true).animate({
			'top': top,
			'left': left
		}, {
			duration: 600
		});
	};
	
	
	$items.each(function(){
		var $item = $(this);
		var itemW = $item.outerWidth();
		var itemH = $item.outerHeight();
		
		spaces.sort(function(a, b){
			return a['top'] - b['top'];
		});
		
		
		var deleteArray = (function(){
			var l = spaces.length;
			var i;
			for (i=0; i<l; i++) {
				if (spaces[i].width <= 0 || spaces[i].height <= 0) {
					spaces.splice(i, 1);
					return;
				}
			}
		})();
		
		
		(function(){
			var l = spaces.length;
			var i;
			for (i=0; i<l; i++) {
				if (spaces[i].width >= itemW && spaces[i].height >= itemH) {
					anime($item, spaces[i].top, spaces[i].left);
					
					spaces.push({
						width: spaces[i].width - itemW,
						height: itemH,
						top: spaces[i].top,
						left: spaces[i].left + itemW
					});
					
					spaces.push({
						width: spaces[i].width,
						height: spaces[i].height - itemH,
						top: spaces[i].top + itemH,
						left: spaces[i].left
					});
					
					spaces.splice(i, 1);
					return;
				}
				else {
					var ll = spaces.length;
					var ii;
					for (ii=0; ii<ll; ii++) {
						if (spaces[ii].width >= itemW && spaces[ii].height >= itemH) {
							anime($item, spaces[ii].top, spaces[ii].left);
							
							spaces.push({
								width: spaces[ii].width - itemW,
								height: itemH,
								top: spaces[ii].top,
								left: spaces[ii].left + itemW
							});
							
							spaces.push({
								width: spaces[ii].width,
								height: spaces[ii].height - itemH,
								top: spaces[ii].top + itemH,
								left: spaces[ii].left
							});
							
							spaces.splice(ii, 1);
							return;
						}
					}
				}
			}
		})();
	});
};


/**
 * init function
 */
$.mk_imgGallery.init = function($container){
	var $items = $container.find('li');
	var containerH = $container.height();
	$container.css({
		'position': 'relative',
		'height': containerH
	});
	
	$items.css({
		'position': 'absolute'
	});
	
	$items.hide();
	$items.fadeIn(200);
	$.mk_imgGallery($items);
};


})(jQuery); //end jquery





/*
 * Release Notes:
 *
 * 2011-08-22 [oosugi@skillpartners.co.jp]
 *   # ファイル作成
 */




/**
 * 実行例
 */

(function($){

$(function(){
	/**
	 * fire init
	 */
	$(function(){
		$('ul.items li').css({
			opacity: 0
		});
	});
	
	$(window).load(function(){
		$.mk_imgGallery.init($('ul.items'));
		$('ul.items li').animate({ opacity: 1 }, 300);
	})
	
	
	/**
	 * set $.fn.mk_imgGallery
	 */
	$(function(){
		$('#showWindow').mk_imgGallery();
	});
});

})(jQuery);