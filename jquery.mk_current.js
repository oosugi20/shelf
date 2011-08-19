/*!
 * mk_current.js
 *
 *
 */


(function($){


$(function(){
	$('.localnavi').mk_current();
});


var pathname = location.pathname,
    root     = location.protocol + '//' + location.hostname,
    uri      = (function(){
    	var path = root + pathname + location.search;
    	if (path.indexOf('?') != -1) {
    		return path.replace(/index\..*\?/, '?');
    	}
    	else {
    		return path.replace(/index\..*/, '');
    	}
    })(),
    dir      = uri.substr(0, uri.lastIndexOf('/')+1);


$.mk_current = {
	//yuga.jsから拝借 + ちょっと手入れた
	Uri: function(path){
		var self = this;
		this.originalPath = path;
		//絶対パスを取得
		this.absolutePath = (function(){
			var e = document.createElement('span');
			e.innerHTML = '<a href="' + path + '" />';
			return e.firstChild.href;
		})();
		//絶対パスを分解
		var fields = {'schema' : 2, 'username' : 5, 'password' : 6, 'host' : 7, 'path' : 9, 'query' : 10, 'fragment' : 11};
		var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);
		for (var field in fields) {
			this[field] = r[fields[field]];
		}
		this.querys = {};
		if(this.query){
			$.each(self.query.split('&'), function(){
				var a = this.split('=');
				if (a.length == 2) self.querys[a[0]] = a[1];
			});
		}
		
		//スラ切りのパスとindex.htmlが付いたパス両方するために追加
		this.checkPath = (function(){
			if (self.absolutePath.indexOf('?') != -1) {
				return self.absolutePath.replace(/index\..*\?/, '?');
			}
			else {
				return self.absolutePath.replace(/index\..*/, '');
			}
		})();
	}
};


$.fn.mk_current = function(options){
	//default options
	var defaults = {
		currentClass: 'js-current',
		hasCurrentClass: 'js-hasCurrent'
	};
	
	var o = $.extend(defaults, options);
	
	this.each(function(){
		var $this = $(this);
		var $a = $this.find('a[href!=#]');
		
		//ローカルナビに表示されない下層ページ表示中に
		//そのカテゴリをカレント表示するため、
		//一回絶対パスとaのhrefを比べた後に、current付けたか付けてないかの判別フラッグ
		var flag = false;
		
		
		$a.each(function(){
			var href = new $.mk_current.Uri($(this).attr('href'));
			if (href.checkPath == uri) {
				$(this).addClass(o.currentClass);
				flag = true;
			}
		});
		
		
		//絶対パスで比較してcurrentつかなかった場合カテゴリをcurrent
		if (!flag) {
			$a.each(function(){
				var href = new $.mk_current.Uri($(this).attr('href'));
				var thisDir = href.checkPath.substr(0, href.checkPath.lastIndexOf('/')+1);
				if (thisDir == dir) {
					$(this).addClass(o.currentClass);
					flag = true;
				}
			});
		}
		
		//入れ子のナビの表示制御用にcurrentを持つliにclass付与
		$this.find('li:has(.'+o.currentClass+')').addClass(o.hasCurrentClass);
	});
	
	return this;
};


})(jQuery);
