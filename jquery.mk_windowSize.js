;/* mk_bg
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	varsion     : 1.0.0
	requier     : jquery.js, jquery.exfixed.js
	author      : http://www.makinokobo.com - oosugi
	last update : 2011.04.15 - oosugi
	
	/////////////////////////////////////////////////////////////////////////
	
	ウインドウサイズを監視し、
	
	1)
	背景画像よりもウインドウサイズの幅が大きい際に
	背景画像用のimgをprependする
	
	2)
	コンテンツサイズよりもウインドウサイズの幅が狭くなったときに
	#headerLogo と #sub の位置を調整する。
	
****************************************************************************/
(function($){


$(function(){

var $html = $('html');
var $body = $('body');
var bgImgSrc = $body.css('background-image').replace(/^url\(|\)$|\"|\'/g,'');
var $bgImg = $('<img/>', { 'src': bgImgSrc, 'id': 'mk_bgImg2' });
$body.append($bgImg.css({'display':'none'}));

var contentsW = 864;
var $fixedDiv = $('#headerLogo, #sub');

var mk_bgChange = function(bgImgW){
	var windowW = $(window).width();
	if( windowW >= bgImgW && $('#mk_bgImg').size()==0 ){
		if( $body.css('background-image')!='none' ){
			$body.prepend('<img src="'+bgImgSrc+'" id="mk_bgImg" />');
			$body.css({ 'background-image': 'none' });
			$html.css({ 'background-image': 'none' });
			$('img#mk_bgImg, p#headerLogo, #sub').exFixed();
			//if(navigator.userAgent.indexOf("MSIE 8") != -1){
			//}else{
			if(navigator.userAgent.indexOf("MSIE 6") != -1){
				DD_belatedPNG.fix(DD_belatedPNG_target);
			}
		}
	}
	else if( windowW <= bgImgW && $('#mk_bgImg').size()!=0){
		$('#mk_bgImg').remove();
		$body.css({ 'background-image': 'url('+bgImgSrc+')' });
		$html.css({ 'background-image': 'url('+bgImgSrc+')' });
	}
	
	if( windowW <= contentsW ){
		$fixedDiv.css({
			'left': 0,
			'margin-left': 0
		});
	}
	else if( windowW > contentsW ){
		$fixedDiv.css({
			'left': '50%',
			'margin-left': '-432px'
		});
	}
};


$(window).load(function(){
	mk_bgChange($bgImg.width());
});

$(window).resize(function(){
	mk_bgChange($bgImg.width());
});


});



})(jQuery);
