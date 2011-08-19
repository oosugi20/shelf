;/* $.mk_styleAdjust_icon
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0.1
	@requires    : jquery.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.11.04 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	アイコン画像を各ブラウザで差異を最小限におさえ行間の中央に調整するプラグイン。
	IE 6 メイリオ環境では若干上のずれる。
	純正 IE 6 環境でメイリオがインストールされているPCは小数であろうことから現状はこれで可とする。
	
	Config
	-------------------------------------------------------------------------
	[適応箇所の文字サイズ] * [任意] px 分、左右にmarginをとる。
	
	$(SELECTOR).mk_styleAdjust_icon({
		marginRight: 1/4, // 文字サイズ * 1/4 px 分 margin-right
		marginLeft : 0.2  // 文字サイズ * 0.2 px 分 margin-left
	});
	
	$(SELECTOR).mk_styleAdjust_icon({
		marginLeft: 0, // 文字サイズ * 0 px 分 margin-left つまり、margin-left: 0
	});
	
	
****************************************************************************/

(function($){

$(function(){
	$('img.mk_styleAdjust_icon').mk_styleAdjust_icon();
});


$.fn.mk_styleAdjust_icon = function(config){
	
	config = $.extend({},$.mk_styleAdjust_icon.defaults,config);
	
	return this.each(function(){
		var $this = $(this);
		var w = $this.width();
		var h = $this.height();
		var fz = Number($this.css('font-size').replace('px',''));
		var mr = fz*config.marginRight;
		var ml = fz*config.marginLeft;
		
		var $wrap = $('<span/>',{
			'class': config.iconClass
		});
		
		if(navigator.userAgent.indexOf("MSIE 6") != -1){
			$wrap.css({
				position: 'relative',
				top: '0.5em',
				paddingRight: w+mr+ml+'px'
			});
		}
		
		$this.wrap($wrap);
		
		if(h>fz){
			$this.css({
				marginTop: '-'+(h-fz)+'px',
				marginBottom: '-'+(h-fz)+'px'
			});
		}
		
		$this.css({
			verticalAlign: 'middle',
			marginRight: mr+'px',
			marginLeft: ml+'px'
		});
		
		// 親要素が上にマイナスマージンしてたとき用
		var parentMt = $this.parent().parent().css('margin-top').replace('px','');
		if($this.closest('a').size()){
			parentMt = $this.parent().parent().parent().css('margin-top').replace('px','');
		}
		
		if(parentMt<0){
			$this.css({
				position: 'relative',
				top: parentMt/2+'px'
			});
		}
		
		if(navigator.userAgent.indexOf("MSIE 6") != -1){
			$this.css({
				verticalAlign: 'baseline',
				position: 'absolute',
				top: '0',
				marginTop: '-'+h/2+'px',
				marginBottom: 0,
				marginRight: 0,
				marginLeft: ml
			});
			if(parentMt<0){
				$this.css({
					top: (parentMt/2)*(-1)+'px'
				});
			}
		}
		
	});
	
};


$.mk_styleAdjust_icon = {
	version: '1.0.1',
	defaults: {
		iconClass: 'mk_styleAdjust_icon',
		marginRight: 1/4,
		marginLeft : 1/4
	}
};


})(jQuery);
