;/* $.mk_location
****************************************************************************
	
	-----------------------------------------------------------------------
	varsion     : 1.1.1
	author      : http://www.makinokobo.com - oosugi
	last update : 2010.11.28 - oosugi
	Copyright   : Copyright (c) 2010 Skill Partners Inc. All Rights Reserved.
	-----------------------------------------------------------------------
	
	$('SELECTOR').mk_current();
	=========================================================================
	
	
	Config
	-------------------------------------------------------------------------
	
****************************************************************************/
mk_location_url = window.location.pathname;
mk_location_root = window.location.protocol+'//'+window.location.hostname;
mk_location_cat_array = mk_location_url.split('/');
mk_location_this_dir = mk_location_url.substr(0,mk_location_url.lastIndexOf('/')+1);

(function($){

$.fn.mk_current = function(config){
	config = $.extend({
		className: 'current'
	},config);
	
	mk_current_className = config.className;
	
	var $a = this.find('a[href!=#]');
	
	$a.each(function(){
		var thisHref = $(this).attr('href');
		
		if(navigator.userAgent.indexOf("MSIE") != -1){
			thisHref = thisHref.replace(window.location.protocol+'\/\/'+window.location.hostname, '');
		};
		
		var targetHref;
		if(thisHref.match(/^\/|^http/)){
			targetHref = thisHref.replace(mk_location_root,'');
		}else{
			if(thisHref.match(/\.\.\//)){
				var num = 0;
				var numTarget = thisHref;
				while (thisHref.match(/\.\.\//)){
					num++;
					thisHref = thisHref.replace(/\.\.\//,'');
				}
				
				var thatHref = '';
				for(i=0; i<mk_location_cat_array.length-num-1; i++){
					thatHref += mk_location_cat_array[i]+'/';
				}
				
				targetHref = thatHref+thisHref;
			}else{
				targetHref = mk_location_this_dir+thisHref;
			}
		}
		
		if(mk_location_url==targetHref){
			$(this).addClass(mk_current_className);
		}
	});
	
	var $hasCurrent = this.filter(':has(.'+mk_current_className+')');
	$hasCurrent.addClass(mk_current_className);
	
	if($hasCurrent.size()==0){
		$a.each(function(){
			var thisHref = $(this).attr('href');
			var targetHref;
			
			if(thisHref.match(/^\/|^http/)){
				targetHref = thisHref.replace(mk_location_root,'');
			}else{
				if(thisHref.match(/\.\.\//)){
					var num = 0;
					var numTarget = thisHref;
					while (thisHref.match(/\.\.\//)){
						num++;
						thisHref = thisHref.replace(/\.\.\//,'');
					}
					
					var thatHref = '';
					for(i=0; i<mk_location_cat_array.length-num-1; i++){
						thatHref += mk_location_cat_array[i]+'/';
					}
					
					targetHref = thatHref+thisHref;
				}else{
					targetHref = mk_location_this_dir+thisHref;
				}
			}
			
			targetHref = targetHref.replace(/index\.html|index\.htm|index\.php/,'');
			if(!targetHref.match(/\/$/)){
				targetHref += '/';
			}
			if(mk_location_url.match(targetHref)){
				$(this).addClass(mk_current_className);
			}
		});
		this.filter(':has(.'+mk_current_className+')').addClass(mk_current_className);
	}
	
	return this;
}

})(jQuery);
