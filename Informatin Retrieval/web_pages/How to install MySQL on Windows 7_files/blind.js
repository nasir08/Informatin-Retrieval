$(window).bind("load", function() {

	$("div#mygaltop").slideView({toolTip: true, ttOpacity: 0.6});	

	$("div#mygalone").slideView(); //if left blank performs the default kind of animation (easeInOutExpo, 750)

	$("div#mygaltwo").slideView({

		easeFunc: "easeInOutBounce",

		easeTime: 2500,

		toolTip: true

	}); 

	$("div#mygalthree").slideView({

		easeFunc: "easeInOutSine",

		easeTime: 500,

		uiBefore: true,

		ttOpacity: 0.5,

		toolTip: true

	});

});



$(function(){

$.syntax({root: 'http://www.gcmingati.net/wordpress/wp-content/themes/giancarlo-mingati/js/jquery-syntax/'});

});