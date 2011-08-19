;/* $.mk_styleAdjust_tableInnerBoxHeight
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0
	@requiers    : jquery.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.10.29 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	table の th や td 内に div 等で背景処理などのためにボックスを入れたときに、
	それらの高さを列ごとに揃えるプラグイン。
	また、thやtdに指定したvertical-alignをpadding-topで調整することで実現。
	
****************************************************************************/

(function($){

// imgを内包するときは $(window).load(function(){ }); に変更
$(function(){
	
	// 対象にしたいテーブルの「行」を選択 
	// =================================================================
	
	$('div.prt-table02 > table > thead > tr','#contents') 
	
	// -----------------------------------------------------------------
	// 【注意】
	// -----------------------------------------------------------------
	// 1. 「>」を使って選択しないと入れ子になった table にも反映されてしまう。
	// 2. 「thead」や「tbody」は、HTML上記載していなくても、
	//    ブラウザ側であるものとして解釈するので、必ず記載する。
	// 3. 高さを揃えたいボックスの padding-top と padding-bottom が
	//    列ごとに違う場合には未対応。
	// =================================================================
	
	.mk_styleAdjust_tableInnerBoxHeight({
	
	
	// 高さを揃えたいボックスを選択
	// =================================================================
		
		innerBox: 'th > span'
		
	// =================================================================
	
	});
});


$.fn.mk_styleAdjust_tableInnerBoxHeight = function(config){
	config = $.extend({},$.mk_styleAdjust_tableInnerBoxHeight.defaults,config);
	
	return this.each(function(){
		var $innerBox = $(this).find(config.innerBox);
		var PT = Number($innerBox.css('padding-top').replace('px',''));
		var PB = Number($innerBox.css('padding-bottom').replace('px',''));
		
		var $parent = $innerBox.closest('th,td');
		var parentH = $parent.height();
		var parentPT = Number($parent.css('padding-top').replace('px',''));
		
		var innerBoxSetH = parentH - PT - PB;
		
		// vertical-align が top 以外が入っているか判定
		var VAjudge = [];
		$innerBox.each(function(){
			var VA = $(this).closest('th,td').css('vertical-align');
			VAjudge.push(VA);
		});
		
		// 入っている時だけ各$innerBoxそれぞれに対し調整して実行
		if($.inArray('middle',VAjudge)!=(-1) || $.inArray('bottom',VAjudge)!=(-1)){
			$innerBox.each(function(){
				var VA = $(this).closest('th,td').css('vertical-align');
				var innerBoxH = $(this).outerHeight();
				var VAP;
				if(VA == 'middle'){
					VAP = (parentH - innerBoxH)/2 + parentPT + PT;
				}else if(VA == 'bottom'){
					VAP = parentH - innerBoxH + parentPT + PT;
				}
				$(this)
					.height(innerBoxSetH-VAP+PT) // PTは1回引いてるので2重に引くことになっちゃうから足しておく
					.css('padding-top',VAP+'px');
			});
		
		// 入って無ければ$innerBox全体に対し実行
		}else{
			$innerBox.height(innerBoxSetH);
		}
	});
};


$.mk_styleAdjust_tableInnerBoxHeight = {
	version: 1.0,
	defaults: {
		innerBox: 'th > div, td > div'
	}
};


})(jQuery);
