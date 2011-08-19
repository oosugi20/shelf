/*!
 * $.fn.mk_easyGoogleMap
 *
 * Copyright (c) 2011 Skill Partners Inc. All Rights Reserved.
 *
 * http://www.geocoding.jp/ で、緯度経度を測って、オプションで渡すと、
 * 指定のdivの中身を マーカー付きの Google Map にする。
 *
 * @require: jquery.js, http://maps.google.com/maps/api/js?sensor=false
 * @create: 2011-08-19 [oosugi@skillpartners.co.jp]
 * @modify: not yet
 */

(function($){ // start jquery

$.fn.mk_easyGoogleMap = function(options){
	//Google Map をはめ込むエレメントがなかったら離脱
	if (!this.length) {
		return;
	}
	
	//default options
	var defaults = {
		lat: null,
		lng: null,
		width: null,
		height: null,
		zoom: 15
	};
	var o = $.extend(defaults, options);
	
	//$this
	var $this = $(this);
	
	// Google Map を表示するには幅と高さのサイズ指定が必須なので、
	//   1. optionsで渡した値
	//   2. $(this)のサイズ
	//   3. 固定値
	// の優先順で幅と高さをセットする。
	// GoogleMapにするdiv要素内に、JSオフ時用の静的画像を入れておけばそのサイズ（2）になる。
	var w = o.width || $this.width() || 600;
	var h = o.height || $this.height() || 480;
	
	//set css width / height for Google Map
	$this.css({
		'width': w,
		'height': h
	});
	
	//set Google Map
	var latlng = new google.maps.LatLng(o.lat, o.lng);
	
	var mapOpt = {
		zoom: o.zoom,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map($this.get(0), mapOpt);
	
	var marker = new google.maps.Marker({
		position: latlng,
		map: map
	});
	
	return this;
};

})(jQuery); // end jquery


/*
 * Release Notes:
 *
 * 2011-08-19 [oosugi@skillpartners.co.jp]
 *   # create
 */