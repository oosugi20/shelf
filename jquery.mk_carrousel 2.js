/* $.fn.mk_carrousel
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 0.1
	@author      : http://www.makinokobo.com - kobo@makinokobo.com
	@last update : 2011.07.04 - oosugi@skillpartners.co.jp
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	usage:
	
	
****************************************************************************/
;(function($){
$(window).load(function(){



//セッティングここから
////////////////////////////////////////////////////////////////////


	//1段目の設定
	$('#mainVisual.ui-carrousel').mk_carrousel({
		speed: 10000, //スライドのスピード
		captionTimeout: 3000 //キャプションが出てくるタイミング
	});
	
	
	//2段目の設定
	$('#home-pickupCM .ui-carrousel').mk_carrousel({
		speed: 3000, //スライドのスピード
		captionTimeout: 3000 //キャプションが出てくるタイミング
	});
	
	//3段目の設定
	$('#home-modelTimes .ui-carrousel').mk_carrousel({
		speed: 3000, //スライドのスピード
		captionTimeout: 3000 //キャプションが出てくるタイミング
	});
	
	//4段目右の設定
	$('#home-interview .ui-carrousel').mk_carrousel({
		auto: false, //この行をコメントアウトするとスライドオン
		speed: 3000, //スライドのスピード
		captionTimeout: 3000 //キャプションが出てくるタイミング
	});
	
	//4段目左の設定
	$('#home-cmGirls, #home-yakutama').mk_carrousel({
		auto: false, //変更しない
		roop: false, //変更しない
		captionTimeout: 3000 //キャプションが出てくるタイミング
	});


////////////////////////////////////////////////////////////////////
// セッティングここまで




});

$.fn.mk_carrousel = function(options){
	//default options
	var defaults = {
		items: 'ul',
		item: 'li',
		caption: '.caption',
		captionTimeout: 3000,
		roop: true,
		auto: true,
		speed: 3000,
		easing: 'linear'
	};
	
	var o = $.extend(defaults, options);
	
	this.each(function(){
		var $elm = $(this);
		var $items = $elm.find(o.items);
		var $item = $items.find(o.item);
		var itemS = $item.size();
		var itemW = $item.width();
		
		if(o.roop){
			var cloneI = 0;
			function cloneItem(){
				var elmW = $elm.width();
				var cloneS = Math.ceil(elmW/itemW)*2;
				
				if($(o.items+' '+o.item,$elm).size()<=cloneS){
					for(var i = cloneI; i<=cloneS; i++){
						if($item.eq(cloneI).size()){
							$items.append($item.eq(cloneI).clone());
							cloneI++;
						}
						else{
							cloneI = 0;
						}
					};
				}
			}
			cloneItem();
			$(window).resize(function(){
				cloneItem();
			});
		};
		
		function anime(){
			var left = $(o.items, $elm).css('left').replace('px','')*1 - itemW || -itemW;
			
			$items.animate({
				'left': left
			}, {
				duration: o.speed,
				easing: o.easing,
				complete: function(){
					if(Math.abs(left) >= itemS*itemW){
						left = 0;
						$(this).css('left',0);
					}
					auto();
				},
				queue: false
			});
		}
		
		function auto(){
			if(o.auto){
				anime();
			}
		};
		var $caption = $(o.caption ,$elm);
		$caption.show();
		var captionH = $caption.height() + $item.css('margin-top').replace('px','')*1 + $item.css('margin-bottom').replace('px','')*1;
		var pb = $items.css('padding-bottom').replace('px','');
		if(navigator.userAgent.indexOf("MSIE 6") != -1){
			$caption.css('bottom', -captionH-pb-1);
		}
		else{
			$caption.css('bottom', -captionH-pb);
		}
		
		var captionTimeout = setTimeout(function(){
			$.each($caption, function(index, val){
				var cT = setTimeout(function(){
					$caption.eq(index).animate({
						'bottom': (navigator.userAgent.indexOf("MSIE 6") != -1) ? -1 : 0
					}, 100);
				}, 50*index);
				
			});
			setTimeout(function(){
				auto();
			}, 1000);
		}, o.captionTimeout);
	});
	
	return this;
};

})(jQuery);
