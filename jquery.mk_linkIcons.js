;/* $.mk_linkIcons
****************************************************************************
	
	/////////////////////////////////////////////////////////////////////////
	
	@varsion     : 1.1.1
	@requires    : jquery.js, jquery.regex.js, jquery.mk_styleAdjust_icon.js
	@author      : http://www.makinokobo.com - oosugi
	@last update : 2010.11.04 - oosugi
	@Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	
	/////////////////////////////////////////////////////////////////////////
	
	リンク先のタイプに合わせたアイコンを表示するプラグイン
	セッティングは必須。
	
****************************************************************************/

(function($){

$(function(){
	
	// アイコンをつけたいエリアのセレクタを設定
	$('#contents')
	
		.mk_linkIcons({
			
			// 追加するすべてのアイコンに付けるクラス名を設定
			iconClass: 'mk_linkIcons', //（※1）
			
			// アイコンを格納しているディレクトリを設定
			directory: '/grp/images/common/',
			
			// 各アイコンのセッティング（必須）
			settings: [
				
				{ // ブランクアイコンの設定
					type    : 'blank', // アイコンのタイプを命名（※2）
					fileName: 'ico_blank.gif', // アイコン画像名を設定
					alt     : '新しいウィンドウで開きます。', // アイコンのalt属性を設定
					selector: 'a[target=_blank]:regex(css:display,^inline$):regex(href,\/$|\.html.*$|\.htm.*$|\.php.*$|\.jpg$|\.jpeg$|\.png$|\.gif$)', // アイコンの選別用セレクタを設定
					not     : 'a:has(img)' // 除外するセレクタを設定
				}
				
				/* クラス名と吐き出されるソースについて
				-------------------------------------------------------
				 * すべてのアイコンには（※1）で設定したクラスが付く。
				 * さらに各アイコンタイプ毎に「（※1）-（※2）」のクラスも付与される。
				 * アイコンは対象となったa要素の後ろに別のa要素として吐き出される。
				 *
				 * 例）上記ブランクアイコンの場合
				 * <a target="_blank" href="{href}">対象となるa要素</a>
				 * <a class="mk_linkIcons mk_linkIcons-blank" target="_blank" href="{href}">
				 *   <img/>
				 * </a>
				-------------------------------------------------------
				*/
				
				// 以下は必要に応じて使用する。
				
				,{ // PDFアイコンの設定
					type    : 'pdf',
					fileName: 'ico_pdf.gif',
					alt     : 'PDF文書を開きます。',
					selector: 'a[href$=pdf]',
					not     : 'a:has(img)'
				}
				
				,{ // 印刷アイコンの設定
					type    : 'print',
					fileName: 'ico_print.gif',
					alt     : '印刷する',
					selector: '.print a[href=#]',
					not     : 'a:has(img)'
				}
				
				/*
				,{ // エクセルアイコンの設定
					type    : 'excel',
					fileName: 'ico_excel.gif',
					alt     : 'Excel文書を開きます。',
					selector: 'a[href$=xls][href$=xlsx]',
					not     : 'a:has(img)'
				}
				*/
				/*
				,{ // ワードアイコンの設定
					type    : 'word',
					fileName: 'ico_word.gif',
					alt     : 'Word文書を開きます。',
					selector: 'a[href$=doc][href$=docx]',
					not     : 'a:has(img)'
				}
				*/
			]
			
		});
});


$.fn.mk_linkIcons = function(config){
	
	config = $.extend({},$.mk_linkIcons.defaults,config);
	
	var $container = this;
	
	$.each(config.settings,function(i,setting){
		setting = $.extend({},/*$.mk_linkIcons.defaults.settings[i],*/setting);
		
		var $these = $container.find(setting.selector).not(setting.not);
		
		$these.each(function(){
			var $this = $(this);
			var href = $this.attr('href');
			
			var $a = $('<a/>',{
				'class': config.iconClass+' '+config.iconClass+'-'+setting.type,
				'href': href,
				'target': '_blank'
			});
			var $img = $('<img/>',{
				'src': config.directory+setting.fileName,
				'alt': setting.alt
			});
			
			if(navigator.userAgent.indexOf("MSIE 7") != -1){
				$a.attr('style','zoom:1;');
			}
			
			$this.after($a.append($img));
		});
		
		$these.next().find('img').mk_styleAdjust_icon({ marginRight: 0 });
	});
	
	return this;
};


$.mk_linkIcons = {
	version: '1.1.1',
	
	defaults: {
		iconClass: 'mk_linkIcons',
		directory: '/images/common/',
		settings: []
	}
};


})(jQuery);