/* $.fn.tab2
****************************************************************************

////////////////////////////////////////////////////////////////////////////

@require   : jquery.js
@version   : 0
@lastupdate: 2011.07.16
@autor     : oosugi@skillpartners.co.jp

////////////////////////////////////////////////////////////////////////////


タブごとにfadeInのスピードを変えれるプラグイン。
間違って作ったから取り敢えずストック。
デバッグはあんまりしてない。


****************************************************************************/

;(function($){

$(window).load(function(){
	$('.ui_tab2').mk_tab2();
});


$.fn.mk_tab2 = function(options){
	
	//default options
	var defaults = {
		nav: 'ul.nav',
		items: 'ul.items',
		startSpeed: 300,
		currentClass: 'current',
		speed: [300, 600, 900]
	};
	var o = $.extend(defaults, options);
	
	this.each(function(){
		
		var $this  = $(this),
		    $nav   = $this.find(o.nav + ' li a'),
		    $items = $this.find(o.items),
		    $item  = $items.find('li');
		
		$item.eq(0).css({ 'z-index': 10 }).fadeIn(o.startSpeed);
		$nav.eq(0).addClass(o.currentClass);
		
		$nav.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			
			var $a      = $(this),
			    href    = $a.attr('href'),
			    $crItem = $nav.filter('.'+o.currentClass),
			    crHref  = $crItem.attr('href'),
			    $target = $item.filter(href),
			    speed   = speed = o.speed[$item.index($target)];
			
			$target.css({ 'z-index': 1 }).show();
			$(crHref).fadeOut(speed, function(){
				$target.css({ 'z-index': 10 });
				$nav.removeClass(o.currentClass);
				$a.addClass(o.currentClass);
			});
		});
		
		
	});
	
	return this;
};



})(jQuery);
