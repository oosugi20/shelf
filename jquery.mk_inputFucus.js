;/* $.mk.inputFocus
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0.2
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2011.06.12 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	
	$('SELECTOR').mk_inputFocus();
	=========================================================================
	1）フォーカス時とブラー時にそれぞれclassが付く
	2）初期表示テキストをフォーカスで削除
	3）ブラー時に何も入力がされていなければ初期表示テキストを再度表示
	4）初期表示テキスト以外のものがなにか入っていればclass付与
	
	
	## Config
	-------------------------------------------------------------------------
	$('SELECTOR').mk_inputFocus({
		defaultValue: '',
		focusClass: 'focus',
		blurClass: 'blur',
		inputTrueClass: 'inputTrue'
	});
	
	
****************************************************************************/
(function($){

$(window).load(function(){
	$('.part-articleSearch dd.keywords input, .part-articleNavi .search p.keywords input').mk_inputFocus({ defaultValue: '検索ワードを入力してください' });
	$('#home-helpindex .textbox input').mk_inputFocus({ defaultValue: '困ったときは聞いてみよう！' });
	$('li.loginId input, li.loginPass input','#loginUnit').mk_inputFocus();
});


$.fn.mk_inputFocus = function(options){
	var defaults = {
		defaultValue: '',
		focusClass: 'focus',
		blurClass: 'blur',
		inputTrueClass: 'inputTrue'
	};
	
	var o = $.extend(defaults, options);
	
	
	if(!this.size()) return this;
	
	this.addClass(o.blurClass);
	
	this.focus(function(){
		var value = $(this).val();
		if(value==o.defaultValue){
			$(this).val('').removeClass(o.inputTrueClass);
		}else{
			$(this).addClass(o.inputTrueClass);
		}
		$(this).removeClass(o.blurClass).addClass(o.focusClass);
	});
	
	this.blur(function(){
		var value = $(this).val();
		if(value==''){
			$(this).val(o.defaultValue).removeClass(o.inputTrueClass);
		}else{
			$(this).addClass(o.inputTrueClass);
		}
		$(this).removeClass(o.focusClass).addClass(o.blurClass);
	});
	
	return this.each(function(){
		var value = $(this).val();
		if(value!=o.defaultValue){
			$(this).addClass(o.inputTrueClass);
		}
	});
}

})(jQuery);


