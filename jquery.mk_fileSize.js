;/* $.mk_fileSize
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.0
	@requires    : jquery.js, mk_fileSize.php
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.11.06 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	ファイルサイズ表示プラグイン
	
****************************************************************************/

(function($){

$(function(){
	$('a[href$=pdf]').mk_fileSize({
		user: 'tribeck',
		pass: 'orix'
	});
});


$.fn.mk_fileSize = function(config){
	
	config = $.extend({},$.mk_fileSize.defaults,config);
	
	var root = window.location.protocol + '//' + window.location.hostname;
	if(config.user && config.pass){
		root = window.location.protocol + '//' + config.user + ':' + config.pass + '@' + window.location.hostname;
	}
	
	var thisPath = window.location.pathname;
	var dirArray = thisPath.split('/');
	
	this.each(function(){
		var $a = $(this);
		var thisHref = $(this).attr('href');
		
		/*
		// IE の場合hrefにhttp〜が含まれるから消す
		if(navigator.userAgent.indexOf("MSIE") != -1){
			thisHref = thisHref.replace(root, '');
		}
		*/
		
		// パスをhttpから始まる絶対パスに揃える
		// ==============================================================
		var thatHref = '';
		
		// 外部リンクの場合
		if(thisHref.match(/^http/)){
			thatHref = thisHref;
		}
		
		// /から始まる絶対パスの場合
		else if(thisHref.match(/^\//)){
			thatHref = root + thisHref;
		}
		
		// 相対パスの場合
		else{
			if(thisHref.match(/\.\.\//)){
				var num = 0;
				var numTarget = thisHref;
				while (thisHref.match(/\.\.\//)){
					num++;
					thisHref = thisHref.replace(/\.\.\//,'');
				}
				for(i=0; i<dirArray.length-num-1; i++){
					thatHref += dirArray[i]+'/';
				}
				thatHref = root + thatHref;
			}else{
				thatHref = root + thisPath.substr(0,thisPath.lastIndexOf('/')+1);
			}
		}
		
		var url = config.phpPath + '?path=' + thatHref + '&callback=?';
		
		$.getJSON(url, function(json){
			var length = json['Content-Length'];
			if(length){
				var units = [
					[1024 * 1024 * 1024, 'GB'],
					[1024 * 1024, 'MB'],
					[1024, 'KB'],
					[1, 'bytes']
				];
				for(var i = 0; i < units.length; i++){
					
					var unitSize = units[i][0];
					var unitText = units[i][1];
					
					if (length >= unitSize) {
						length = length / unitSize;
						length = Math.ceil(length * 10) / 10;
						var lengthUnits = unitText;
						break;
					}
				}
				$a.after('<span class="mk_fileSize">['+length+lengthUnits+']</span>');
			}
		});
	});
	
	
	return this;
};


$.mk_fileSize = {
	version: '1.0',
	
	defaults: {
		phpPath: 'http://www.makinokobo.net/mk_fileHeader.php',
		user: false,
		pass: false
	}
};


})(jQuery);