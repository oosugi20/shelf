;/* localnavi
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0.2
	@require     : jquery.js, jquery.effects.core.js jquery.mk_imgHoverSwap.js, jquery.mk_soothScroll.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2011.04.14 - oosugi
	
	/////////////////////////////////////////////////////////////////////////
	
****************************************************************************/

(function($){


$(function(){
	var t = $('#headerLogo').css('top').replace('px','') * 1;
	var hash = window.location.hash;
	
	// ローカルナビのスムーススクロール設定（ロゴの位置までずらす）
	$('#localnavi').mk_smoothScroll({
		speed: 1000, // スピードを入力
		shift: -t,
		easing: 'easeInOutQuart'
	});
	
	// ハッシュ付きURLで飛んできた場合
	if(hash){
		var id = hash.replace('#','');
		var target = $('div#'+hash).offset().top;
		scrollTo(0,target-t);
	}
	
	
	var $lnavi = $('#localnavi');
	var $lnavi_li = $lnavi.find('li');
	var $lnavi_img = $lnavi.find('img');
	
	var $sec = $('div.section:regex(id,sec-.*?)');
	
	if($sec.size()){
		var secY_array = [];
		
		
		$sec.each(function(){
			var thisY = Math.floor($(this).offset().top);
			var thisId = $(this).attr('id');
			secY_array.push({id:thisId, y:thisY});
		});
		
		
		// crrent image pre load
		$lnavi_img.each(function(){
			var src = $(this).attr('src');
			var srcCr = src.replace(/_on\.|_out\./,'_cr.');
			$('<img/>',{
				'src': srcCr
			});
		});
		
		
		var thisID;
		var prevID;
		// window scroll event
		$(window).bind('scroll.mk_lnavActive', function(e){
			var pageY = $(window).scrollTop();
			
			$.each(secY_array, function(i,val){
				if( (pageY - val.y) >= -t ){
					thisID = val.id;
				}
			});
			
			if( pageY < secY_array[0].y -t ){
				thisID = '';
			}
			
			if(prevID != thisID){
				
				prevID = thisID;
				
				$lnavi_img.each(function(){
					var $img = $(this);
					var src = $img.attr('src');
					
					if( src.indexOf('_cr.') || src.indexOf('_on.') ){
						var outSrc = src.replace(/_cr\.|_on\./,'_out.');
						$img.attr('src',outSrc);
					}
				});
				
				
				$lnavi_img.mk_imgHoverSwap();
				
				var $active = $lnavi_li.find('a:[href$=#'+thisID+']');
				
				
				if($active.size()){
				
					var $active_img = $active.find('img');
					var actImgSrc = $active_img.attr('src');
					var actImgSrcCr = actImgSrc.replace(/_out\./,'_cr.');
					$active_img.attr('src',actImgSrcCr);
					
					
					$active_img.unbind('mouseleave').unbind('mouseenter');
					
					$active_img
						.mouseenter(function(){
							var src = $(this).attr('src');
							$(this).attr('src',src.replace(/_cr\./,'_on.'));
						})
						.mouseleave(function(){
							var src = $(this).attr('src');
							$(this).attr('src',src.replace(/_on\./,'_cr.'));
						});
					
					/*
					if(navigator.userAgent.indexOf("MSIE 6") != -1){
						DD_belatedPNG.fix(DD_belatedPNG_target);
					}
					*/
				}
			}
			
		});
		
	}
	
});


})(jQuery);
