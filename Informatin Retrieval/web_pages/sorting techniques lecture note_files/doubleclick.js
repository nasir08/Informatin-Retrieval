var googletag = googletag || {};

googletag.cmd = googletag.cmd || [];

(function () {
	var gads = document.createElement('script');
	gads.async = true;
	gads.type = 'text/javascript';
	var useSSL = 'https:' == document.location.protocol;
	gads.src = (useSSL ? 'https:' : 'http:') +
'//www.googletagservices.com/tag/js/gpt.js';
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(gads, node);
})();

googletag.cmd.push(function(){
	//googs having trouble figuring out container size, so one slot per size
    if (document.getElementById("doubleclick-ad-120x600")) googletag.defineSlot('/7223/cramster_web', [[120, 600]], 'doubleclick-ad-120x600').addService(googletag.pubads());
    if (document.getElementById("doubleclick-ad-160x600")) googletag.defineSlot('/7223/cramster_web', [[120, 600], [160, 600]], 'doubleclick-ad-160x600').addService(googletag.pubads());
    if (document.getElementById("doubleclick-ad-250x250")) googletag.defineSlot('/7223/cramster_web', [[250, 250]], 'doubleclick-ad-250x250').addService(googletag.pubads());
    if (document.getElementById("doubleclick-ad-300x250")) googletag.defineSlot('/7223/cramster_web', [[250, 250], [300, 250]], 'doubleclick-ad-300x250').addService(googletag.pubads());
    if (document.getElementById("doubleclick-ad-728x90")) googletag.defineSlot('/7223/cramster_web', [[728, 90]], 'doubleclick-ad-728x90').addService(googletag.pubads());
	googletag.pubads().enableSingleRequest();
	googletag.enableServices();
});