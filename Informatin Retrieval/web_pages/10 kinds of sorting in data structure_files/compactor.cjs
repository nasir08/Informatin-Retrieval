var Base64 = {

	// private property
	_keyStr :"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this._keyStr.charAt(enc1)
					+ this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
					+ this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for ( var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12)
						| ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
};

function decode_redirect(str) {
	if(str!=null) {
		var u = Base64.decode(str);
		u = u.trim();
		if(u.indexOf("http")==0 || u.indexOf("/")==0)
		 	location.href=u;
		else
			location.href="http://www.answers.com";
		return false;
	}
}

var startOnClick = decode_redirect;

var Header = (function(){
	// Private
	function tool_hover(){
		$('#header .tool').hover
		(
			function(){
				$(this).addClass('tool_hover');
			},
			function(){
				$(this).removeClass('tool_hover');
			}
		);
	}
	
	function init_menu(id, type) {
		var menuTrigger = jQuery(id);
		if(menuTrigger.length > 0) {
			menuTrigger.each(function() {
				jQuery(this).next().menu({
					select: function(event, ui) {
						var context = ui.item.context;
						if(jQuery(context).is("a") && "#" != context.href) {
							window.location.href = context.href;
						}
						jQuery(this).hide();
					},
					input: jQuery(this)
				}).hide();
			}).click(function(event) {
				var menu = jQuery(this).next();
				if (menu.is(":visible")) {
					menu.hide();
					return false;
				}
				switch (type) {
				case "dropDownOrUp":
					menu.menu("deactivate").show().css({top:0, left:0}).position({
						my: "left top",
						at: "left bottom",
						collision: "flip",
						of: this
					});
					break;
				case "rightAlignedFlatTop":
					menu.menu("deactivate").show().css({top:0, left:0}).position({
						my: "right top",
						at: "right bottom",
						collision: "none",
						of: this
					}).removeClass("ui-corner-all").addClass("ui-corner-bottom");
					break;
				default:
					menu.menu("deactivate").show().css({top:0, left:0}).position({
						my: "left top",
						at: "left bottom",
						collision: "none",
						of: this
					});
				}
				jQuery(document).one("click", function() {
					menu.hide();
				});
				return false;
			});
		}
	}
	
	function configure_search(){
		if(!readCookie('active_tab')) {
			$('.answer_form').hide();
		}
		else {
			if(readCookie('active_tab') == 'answer') {
				$('.ask_form').hide();
				$('.answer_form').show();
			}
			else {
				$('.answer_form').hide();
			}
		}
		
		$radios = $('input:radio[name=corpus]');
		
		corpus = 'all';
		if(readCookie('activeRadio')) {
			corpus = readCookie('activeRadio');
			set_corpus(corpus);
			$radios.filter('[value='+corpus+']').attr('checked', true);
		}
		
		if($radios.is(':checked') === false) {
			$radios.filter('[value=all]').attr('checked', true);
		}
		
		$(".corpus").each(function() {
			$(this).bind('click', function() {
				if (location.hostname.match("answers.com")){
					var domain = 'answers.com';
				}
				createCookie('activeRadio', $(this).val(), 0, domain);
				set_corpus($(this).val());
			});
		});
		$(".search_submit").click(function(e) {
			search_submit(e);
		});
		$(".search_input").keypress(function(e) {
			if(e.which == 13) { // enter key pressed
				search_submit(e);
			}
		});
		
		$(".unanswered_search_submit").click(function(e) {
			unanswered_search_submit(e);
		});
		
		$(".search_input_unanswered").keypress(function(e) {
			if(e.which == 13) { // enter key pressed
				unanswered_search_submit(e);
			}
		});
	}
	
	function set_corpus(type) {
		switch(type) {
		case 'all':
			$('#header_title').html('Enter question or phrase...');
			break;
		case 'wa':
			$('#header_title').html('Enter a question here...');
			break;
		case 'ra':
			$('#header_title').html('Enter word or phrase...');
			break;
		}
		$('#header_title').css('visibility','visible');

	}
	
	function change_header_tab(type) {
		createCookie('active_tab', type);
		
		if(type == 'ask') {
			$('.ask_form').show();
			$('.answer_form').hide();
			$('#head_ask').focus();
		}
		else {
			$('.answer_form').show();
			$('.ask_form').hide();
			$('#head_search').focus();
		}
	}
	
	return {
		//Public
		init:function(){
			init_menu("#languageMenuTrigger");
			configure_search();
			tool_hover();
		},
		change_header_tab:function(type){
			change_header_tab(type);
		}
	};
})();

$(document).ready(function() {	
	Header.init();
});


function search_submit(event) {
	event.preventDefault();
	var searchInput = jQuery(".search_input");
	var searchText = jQuery.trim(searchInput.val());
	if("" != searchText) {
		$("#lookup1").submit();
	}
}

function unanswered_search_submit(event) {
	event.preventDefault();
	var searchInput = $('#head_search');
	var searchText = jQuery.trim(searchInput.val());
	if("" != searchText) {
		$('#search_form_unanswered').attr('action', '/Q/Special:Search&search='+encodeURIComponent(encodeURIComponent(searchText))+'&limitn=new');
		$('#search_form_unanswered').submit();
	}
} 


var recatFilesLoaded = false;
var RecategorizeCats = function(question)
{
	if(!recatFilesLoaded)
	{
		jQuery('<link id="categories_css" rel="stylesheet" type="text/css" href="'+jwgData.config.wgStaticFilesServer+'/templates/styles/categories.css" />').appendTo("head");	
		jQuery.ajax({url: jwgData.config.wgStaticFilesServer + '/skins/screen/DEFAULT/scripts/-TUV.js',dataType: 'script',success: function()
			{
				recatFilesLoaded = true;
				fitTitle = function() {
					fitStringToWidth('truncateme', 20);
				}
				RecategorizeCats(question);
			}
		});	
		
	}
};

if (location.href.indexOf("newqAdded=1") >0){
	isNewQuestion = true ;
	RecategorizeCats(jwgData.waQuestionUrl);
}




if (window.location.protocol=='http:') {
	var Tynt=Tynt||[];Tynt.push('cC57C855yr35rSadbi-bpO');
}


// ADDTHIS SOCIAL NETWORKING
var addthis_share = 
{
	templates: {
		twitter: "{{title}} {{url}} (via @AnswersDotCom)"
	},
	url: jQuery('link[rel=canonical]').attr('href')
};
var addthis_config =
{
	username:"answers",
	ui_cobrand:"Answers.com",
	ui_header_background:"f3f6de",
	ui_header_color:"555555",
	ui_offset_top:-2,
	ui_offset_left:-250,
	data_track_clickback:true,
	data_use_flash:false//,
	//ui_click: true
};
function displayAddThis() {
	if (window.addthis)	{
	   window.addthis.ost = 0;
	   window.addthis.init();
	   // Listen to various events
	   addthis.addEventListener('addthis.menu.open', AddThisTracking);
	  // addthis.addEventListener('addthis.menu.close', AddThisTracking);
	   addthis.addEventListener('addthis.menu.share', AddThisTracking);
	}
}
function AddThisTracking(evt) {
	var pageType = "";
	switch (jwgData.pageType) {
		case "question":
			if(jwgData.articleData.hasAnswer) {
				pageType = "_AQ";
			} else {
				pageType = "_UQ";
			}
			break;
		case "Category questions page":	
			pageType = "_cat";
			break;
		case "Home Page":
			pageType = "_HP";
			break;
	}
	// Alert a message when the user shares somewhere
    switch (evt.type) {
        case "addthis.menu.open":
            if(evt.data.pane == "compact"){
            	track('addthisShare'+ pageType);
            }
            break;
        case "addthis.menu.share":
        	track('addthisShare_' + evt.data.service + pageType);
            break;
        case "addthis.menu.close":
        	//not needed now but might need it in the future.
        	break;
    }
}

loadAsyncSrc("http://s7.addthis.com/js/250/addthis_widget.js?domready=1", displayAddThis);


function recommendQuestion(questionTitle) {
	RecommendQuestionAjaxResponse = AquaAjaxResponse.prototype.inherit("RecommendQuestionAjaxResponse", {
		status200: function(data) {
			jQuery("#questionInfoStatsPopularity").html(data.popularity);
			jQuery("#statusMessage").html(data.thankYou).show();
			var recommendQuestionLink = jQuery('#recommendQuestionLink');
			superPopup.create(recommendQuestionLink, "recommendQuestionPopup", data.html, true);
			var popupDiv = jQuery('#recommendQuestionPopup');
			superPopup.showIt(popupDiv, recommendQuestionLink, 20, 400);
			recommendQuestionLink.replaceWith("<span class='recommendedQuestionSpan' style='color:red'>Recommended</span>");
			addthis.toolbox("#toolbox");
			jQuery("#toolbox").click(function(){
				jQuery(this).closest(".popupDiv").remove();
			});
			jQuery("#toolbox .addthis_button_facebook").click(function() {
				track('facebookButtonPopup');
			});
			jQuery("#toolbox .addthis_button_email").click(function() {
				track('emailButtonPopup');
			});
			jQuery("#toolbox .addthis_button_twitter").click(function() {
				track('twitterButtonPopup');
			});
		},
		statusERROR: function(data) {
			trackError(data.message);
			jQuery("#editError").html(data.message);
			openDialog("#editError", "modal");
		}
	});

	var data = {title: questionTitle};
	var url = jwgData.config.wgServer + '/ajax/recommendQuestion.php';
	var ajaxResponse = new RecommendQuestionAjaxResponse();
	var resp = ajaxResponse.postJson(url, data);
}

function recommendUser(userName, title) {
	document.location = "/Q/User:" + userName + "&action=recommenduser&returnto=" + title;
}

// thh facebook functions are in the js\facebook module, becuase they are needed for more palces in the page, such the follow category pop up.

function googlePlusOneCallback(obj) {
	var pageType = "AQ";
	if(obj.state === 'on') {
		track('GooglePlus1_' + pageType);
	}
	_gaq.push(['_trackEvent', 'GooglePlus1_' + pageType, obj.state]);
}

jQuery(document).ready(function($) {
	var cache = jQuery.ajaxSettings.cache;
	jQuery.ajaxSettings.cache = true;
    jQuery.getScript("https://apis.google.com/js/plusone.js");
	jQuery.ajaxSettings.cache = cache;
});


function deleteRelatedLink(evt, type) {
	var lid = (type == "link") ? "XRemoveRelatedLinks" : "XRemoveRelatedQs";
	track(lid);
	submitDeleteRelatedLink(jQuery(evt.target).siblings('a:not([href^=#])'));
}

function submitDeleteRelatedLink(sibLink) {
	if("undefined" == typeof EditRelatedLinksAjaxResponse){
		EditRelatedLinksAjaxResponse = AquaAjaxResponse.prototype.inherit("EditRelatedLinksAjaxResponse", {
			sibLink: null
			, linksTypeId: null
			, status200: function(data) {
				jQuery("#WikiAnswers").data("etag", data.etag);
				var removeMessage = (this.linksTypeId == "relatedWikiLinks") ? 'Question was removed' : 'Link was removed';
					this.sibLink.parent("li").html(removeMessage).addClass("grayText");
			}
			, statusERROR: function(data) {
				trackError(data.message);
				alert("Error: " + data.message);
			}
		});
	}

	var allSibLinks = sibLink.parents("ul").find("a:not([href^=#])");
	var linksTypeId = sibLink.parents("div").attr("id");
	var relatedQuestionsJSON = {};
	var externalLinksJSON = {};
	var otherRelatedLinks = (linksTypeId == "relatedWebLinks") ? "relatedWikiLinks" : "relatedWebLinks";
	var allOtherLinks = jQuery("#" + otherRelatedLinks).find("li a:not([href^=#])");

	if(linksTypeId == "relatedWikiLinks"){
		relatedQuestionsJSON = getJSONRelatedLinks(linksTypeId, allSibLinks, sibLink);
		externalLinksJSON = getJSONRelatedLinks(otherRelatedLinks, allOtherLinks);
	} else if(linksTypeId == "relatedWebLinks") {
		relatedQuestionsJSON = getJSONRelatedLinks(otherRelatedLinks, allOtherLinks);
		externalLinksJSON = getJSONRelatedLinks(linksTypeId, allSibLinks, sibLink);
	}

	var data = {title: jQuery("#WikiAnswers").data("title")
				, etag: jQuery("#WikiAnswers").data("etag")
				, relatedQuestionsJSON: relatedQuestionsJSON
				, externalLinksJSON: externalLinksJSON
				};
	var url = jwgData.config.wgServer + '/ajax/editRelatedLinks.php';
	var ajaxResponse = new EditRelatedLinksAjaxResponse();
	ajaxResponse.sibLink = sibLink;
	ajaxResponse.linksTypeId = linksTypeId;
	var resp = ajaxResponse.postJson(url, data);
	return false;
}

function setRelatedWebLinksButtons() {
	jQuery(".question_related_userlinks").find(".waRelatedLinksDelete").click(function(evt) { 
		return deleteRelatedLink(evt, "link"); 
	});
}

function setRelatedWikiLinksButtons() {
	
	jQuery("#relatedWikiLinks").find(".waRelatedLinksDelete").click(function(evt) { 
		return deleteRelatedLink(evt, "question"); 
	});
}

function getJSONRelatedLinks(linkType, jObj, excludeLink) {
	linksJSON = jObj.map(function(index, obj) {
		var a = jQuery(obj);
		if(typeof excludeLink == "undefined" || (typeof excludeLink == "object" && a.attr("href") != excludeLink.attr("href"))){
			if("relatedWikiLinks" == linkType) {
				return {"title_text": a.text()};
			} else {
				return {"link_url": a.attr("href"), "link_title": a.text()};
			}
		}
	}).get();
	return linksJSON;
}

jQuery(window).load(function() {
	setRelatedWebLinksButtons();
	setRelatedWikiLinksButtons();
});




function showHideMore(el){
	$(el).parent().next().show();
	$(el).hide();
}

var fivemin = (function(){
	var module = $('.video_fivemin_related');
	var video_links = module.find('.video a');
	
	function adjust_heights(){
		var height = 0;
		video_links.each(function(){
			if($(this).height() > height){
				height = $(this).height();
			}
		});
		video_links.height(height);
	}
	return {
		init:function(){
			adjust_heights();
		}
	};
})();

fivemin.init();

var LOGIN_POPUP_WIDTH = 250;
var LOGIN_POPUP_HEIGHT = 660;
var wholePopupHtml = "";

/* for browsers which allow popup resizing */
var SHORTER_POPUP_HEIGHT = 434;
var MEDIUM_POPUP_HEIGHT = 540;
var TALLER_POPUP_HEIGHT = 687;
var MINOR_DETAILS_WIDTH = 550;
var loginAjaxResponse, registerAjaxResponse, lostPasswordAjaxResponse;
var regExpToRemoveOnLogin = /[&?](firstAnswer=1|updated=1|waNoAnsSet=1|status=[^&]*)/g;
var winRef = null;
var preventReload = false;

loginObject = {
	init : function () {
		this.openDialog = null;
		this.successfulLoginCallback = null;
		this.registerRedirectAddress = '/Q/Special:ActivateUser&welcomePageOnly=1&returnto=' + window.location.href.replace(/[&?]aqua=1/, '');
		this.registerRedirectHash = null;
		this.registerRedirectRegExpToRemove = null;
		this.loginOrRegisterFromLHS = false;
		this.lhsDialog = null;
	},
	attemptLogin : function (username, password, remember, lhs) {
		this.loginOrRegisterFromLHS = lhs;
		if (!username && !password) {
			this.showErrorInPopup("Please fill in your username and password.");
			return;
		}
		if (!username) {
			this.showErrorInPopup("Please fill in your username.");
			return;
		}
		if (!password) {
			this.showErrorInPopup("Please fill in your password.");
			return;
		}
		var url = jwgData.config.wgLoginLoc + '/ajax/login.php';
		var data = {
			media: 'aqua',
			authUser: username,
			authPw: password,
			authRemember: remember
		};
		
		loginAjaxResponse = new LoginAjaxResponse;
		if (lhs) {
			data.jsonpCallbackSuccess = "loginAjaxResponse.status200";
			data.jsonpCallbackError = "loginAjaxResponse.statusERROR";
			data.jsonCallback = "x";
			loginAjaxResponse.getJsonp(url, data);
		} else {
			loginAjaxResponse.getJson(url, data);
		}
	},
	attemptRegister : function (username, password, retypePassword, emailAddress, getNewsletter, acceptPolicy, lhs) {
		this.loginOrRegisterFromLHS = lhs;
		if (!username) {
			this.showErrorInPopup("Please choose a username");
			return;
		}
		if (!password) {
			this.showErrorInPopup("You must provide a password to create a new account.");
			return;
		}
		if (password != retypePassword) {
			this.showErrorInPopup("The passwords you entered do not match.");
			return;
		}
		if (!emailAddress) {
			this.showErrorInPopup("Please enter an email address.");
			return;
		}
		if (!acceptPolicy) {
			this.showErrorInPopup("Please check that you agree to the community guidelines, terms of use and privacy policy for this site and confirm that you are at least 13 years of age.");
			return;
		}
		var url = jwgData.config.wgLoginLoc + '/ajax/register.php';
		var data = {
			media: 'aqua',
			username: username,
			password: password,
			email: emailAddress,
			wpGetNewsletter: getNewsletter
		}
		registerAjaxResponse = new RegisterAjaxResponse;
		if (lhs) {
			data.jsonpCallbackSuccess = "registerAjaxResponse.status200";
			data.jsonpCallbackError = "registerAjaxResponse.statusERROR";
			data.jsonCallback = "x";
			registerAjaxResponse.getJsonp(url, data);
		} else {
			registerAjaxResponse.getJson(url, data);
		}
	},
	submitLostPassword : function (emailOrUsername, lhs) {
		var url = jwgData.config.wgLoginLoc + '/ajax/mailPassword.php';
		var data = {
			media: 'aqua',
			emailOrUsername : emailOrUsername,
			shouldBeAPI : true
		}
		lostPasswordAjaxResponse = new LostPasswordAjaxResponse;
		if (lhs) {
			data.jsonpCallbackSuccess = "lostPasswordAjaxResponse.status200";
			data.jsonpCallbackError = "lostPasswordAjaxResponse.statusERROR";
			data.jsonCallback = "x";
			lostPasswordAjaxResponse.getJsonp(url, data);
		} else {
			lostPasswordAjaxResponse.getJson(url, data);
		}
	},
	loginModeInit : function ()
	{
		jQuery.ajax({url:'/solo/ajax/login', async:false, success:function(html) {
				jQuery("#loginPod .dsContent #wholePopup").append(html);
			}
		});	
		
		wholePopupHtml = jQuery("#wholePopup").clone().wrap('<div></div>').parent().html();
		
		if(!this.openDialog) {
			dialogSelector = '#loginPopupSignInMode';
			newPopupTitle = "Answers.com Sign in";
			this.closeCurrentAndOpenDialog(dialogSelector, false, true);
		}
	},
	switchLoginMode : function (showSignInMode, modal, lhs) {
		var dialogSelector = "";
		var newPopupTitle = "";
		if (showSignInMode == 'join') {
			if (modal) {
				closeDialog('#loginPopupSignInMode');
			} else {
				jQuery('#loginPopupSignInMode').hide();
			}
			dialogSelector = '#loginPopupJoinMode';
			newPopupTitle = "Answers.com Create account";
		} else if (showSignInMode == 'lost') {
			dialogSelector = '#loginPopupLostPassword';
			newPopupTitle = "Answers.com Lost password";
		} else if (showSignInMode == 'minorDetails') {
			dialogSelector = '#minorDetails';
			newPopupTitle = "Answers.com Create account";
		} else if (showSignInMode == 'pleaseSignIn') {
			dialogSelector = '#loginPopupSignInMode';
			var originalTitle = jQuery(dialogSelector).find('.title').html();
			jQuery(dialogSelector).bind("dialogclose", function (event, ui) {
				jQuery('#loginPopupSignInMode').find('.title').html(originalTitle);
			});
			jQuery(dialogSelector).find('.title').html("Psst! Please sign in to edit a question...");
			newPopupTitle = "Answers.com Sign in";
		} else if (showSignInMode) {
			dialogSelector = '#loginPopupSignInMode';
			newPopupTitle = "Answers.com Sign in";
		} else {
			dialogSelector = '#loginPopup';
		}
		if (newPopupTitle && !modal && !lhs) {
			jQuery(document).attr('title',newPopupTitle);
		}
		this.closeCurrentAndOpenDialog(dialogSelector, modal, lhs);
	},
	closeCurrent : function () {
		if (this.loginOrRegisterFromLHS) {
			winRef = {closed: true};
			checkClosed();
		} else {
			this.clearErrorInPopup();
			closeDialog(this.openDialog);
		}
	},
	closeCurrentAndOpenDialog : function (dialogSelector, modal, lhs) {
		var usernameValueWas = "";
		var passwordValueWas = "";
		if (this.openDialog) {
			var usernameField = jQuery(this.openDialog).find("#username");
			if (usernameField.length != 0) {
				usernameValueWas = usernameField.val();
			}
			var passwordField = jQuery(this.openDialog).find("#password");
			if (passwordField.length != 0) {
				passwordValueWas = passwordField.val();
			}
			this.clearErrorInPopup();
			if (modal) {
				closeDialog(this.openDialog);
			} else {
				jQuery(this.openDialog).hide();
			}
		}
		if (modal) {
			openDialog(dialogSelector,'wideModal');
			
			jQuery(".ui-icon-closethick").bind("click", function(){
				setDialogToLHS();
				track('LoginPopupX');
			});
		} else if (lhs) {
			if (lhsOrModal == "lhs") {
				this.lhsDialog = dialogSelector;
			}
			jQuery(dialogSelector).show();
			jQuery(dialogSelector).css("background-color", "#039");
		} else {
			jQuery(dialogSelector).show();
			if (dialogSelector == "#minorDetails") {
				window.resizeTo(MINOR_DETAILS_WIDTH, MEDIUM_POPUP_HEIGHT);
				jQuery("body").css("background-color", "#fff");
			} else if (dialogSelector == "#loginPopupJoinMode") {
				window.resizeTo(LOGIN_POPUP_WIDTH, TALLER_POPUP_HEIGHT);
				jQuery("body").css("background-color", "#039");
			} else {
				window.resizeTo(LOGIN_POPUP_WIDTH, SHORTER_POPUP_HEIGHT);
				jQuery("body").css("background-color", "#039");
			}
		}
		this.openDialog = dialogSelector;
		jQuery(this.openDialog).find("#username").val(usernameValueWas);
		jQuery(this.openDialog).find("#password").val(passwordValueWas);
	},
	clickedA : function () {
		this.showErrorInPopup("Complete form below.");
	},
	showErrorInPopup : function (message, popupSelector) {
		//trackError(message);
		if (!popupSelector) {
			popupSelector = this.openDialog;
		}
		var errorSection = jQuery(popupSelector).find('.errorSection');
		if (errorSection.length > 0) {
			errorSection.html(message);
			errorSection.css({display: 'block'});
		}
	},
	clearErrorInPopup : function (popupSelector) {
		if (!popupSelector) {
			popupSelector = this.openDialog;
		}
		errorSection = jQuery(popupSelector).find('.errorSection').html('')
																	.css({display: 'none'});
	}
}

loginObject.init();

function dologin(usernameSelector, passwordSelector, rememberSelector, formSelector, lhs) {
	if (formSelector) {
		username = jQuery(formSelector).find(usernameSelector).val();
		password = jQuery(formSelector).find(passwordSelector).val();
		remember = jQuery(formSelector).find(rememberSelector + ":checked").length;
	} else {
		username = jQuery(usernameSelector).val();
		password = jQuery(passwordSelector).val();
		remember = jQuery(rememberSelector + ":checked").length;
	}
	loginObject.attemptLogin(username, password, remember, lhs);
}

function doregister(formSelector, lhs) {
	var username = jQuery(formSelector).find("#username").val();
	var password = jQuery(formSelector).find("#password").val();
	var retypePassword = jQuery(formSelector).find("#wpRetype").val();
	var emailAddress = jQuery(formSelector).find("#wpEmail").val();
	var getNewsletter = jQuery(formSelector).find("#wpGetNewsletter:checked").length;
	var acceptPolicy = jQuery(formSelector).find("#wpAcceptPolicy:checked").length;
	loginObject.attemptRegister(username, password, retypePassword, emailAddress, getNewsletter, acceptPolicy, lhs);
}

function showLoginTooltip(whichSelector) {
	openDialog(jQuery(whichSelector), 'veryNarrowModal');
}

function submitLostPassword(inputSelector, formSelector, lhs) {
	if (formSelector) {
		data = jQuery(formSelector).find(inputSelector).val();
	} else {
		data = jQuery(inputSelector).val();
	}
	loginObject.submitLostPassword(data, lhs);
}

function switchLoginMode(showSignInMode, modal, lhs) {
	loginObject.switchLoginMode(showSignInMode, modal, lhs);
}

function loginModeInit() {
	loginObject.loginModeInit();
}

function lostPasswordForConnect() {
	openDialog('#loginPopupLostPassword', 'wideModal');
}

function removeHash(str) {
	var hashIndex = str.indexOf('#');
	if (hashIndex != -1) {
		str = str.substr(0, hashIndex);
	}
	return str;
}

function checkClosed() {
	if ((winRef!=null)&&(winRef.closed)) {
		if (readCookie("giving_wikiUserName") !== null) {
			if (readCookie("registerRedirect") !== null) {
				trackCustomMetrics({c16: loginObject.registerTriggerType + '|' + jwgData.lpos})
				delCookie("registerRedirect");
				if (loginObject.registerRedirectHash) {
					window.location.href = removeHash(loginObject.registerRedirectAddress) + "&returnHash=" + loginObject.registerRedirectHash;
				} else {
					window.location.href = loginObject.registerRedirectAddress;
				}
			} else if ("function" == typeof loginObject.successfulLoginCallback) {
				loginObject.successfulLoginCallback();
			} else {
				window.location.reload();
			}
		}
		winRef = null;
	} else {
		window.setTimeout(checkClosed,200);
	}
}

LoginAjaxResponse = AjaxResponse.prototype.inherit("LoginAjaxResponse");

LoginAjaxResponse.prototype.status200 = function(data) {
	loginObject.closeCurrent();
	if(!preventReload){
		window.location.reload();
	}
};

LoginAjaxResponse.prototype.statusERROR = function (data) {
	loginObject.showErrorInPopup(data.message);
};

RegisterAjaxResponse = AjaxResponse.prototype.inherit("RegisterAjaxResponse");

RegisterAjaxResponse.prototype.status200 = function(data) {
	var domain = (location.hostname.match("answers.com")) ? "answers.com" : "";
	createCookie('registerRedirect', 1, 1, domain);
	loginObject.closeCurrent();
};

RegisterAjaxResponse.prototype.statusERROR = function (data) {
	loginObject.showErrorInPopup(data.message);
};

LostPasswordAjaxResponse = AjaxResponse.prototype.inherit("LostPasswordAjaxResponse");

LostPasswordAjaxResponse.prototype.status200 = function(data) {
	if (typeof inLoginPopup == 'undefined') {
		closeDialog("#loginPopupLostPassword");
		setDialogToLHS();
		loginObject.showErrorInPopup("Ok. Password sent!");
	} else {
		switchLoginMode("login");
		loginObject.showErrorInPopup("Ok. Password sent!");
	}
};
LostPasswordAjaxResponse.prototype.statusERROR = function(data) {
	loginObject.showErrorInPopup("You must enter either your username or your email address to receive a new password by email.", '#loginPopupLostPassword');
};

function setDialogToLHS() {
	if (loginObject.lhsDialog) {
		loginObject.openDialog = loginObject.lhsDialog;
	}
	loginObject.successfulLoginCallback = null;
	loginObject.registerRedirectAddress = '/Q/Special:ActivateUser&welcomePageOnly=1&returnto=' + window.location.href.replace(/[&?]aqua=1/, '');
	loginObject.registerRedirectHash = null;
	loginObject.registerRedirectRegExpToRemove = null;
	jQuery(".ui-icon-closethick").unbind("click", setDialogToLHS);
}

jQuery(function(){
	setDialogToLHS();
	jQuery(".loginPopupClass").find("button").button();
});

if (typeof inLoginPopup != 'undefined') {
	windowOnload(function () {
		if (window.location.href.match(/joinMode/i) != null) {
			loginObject.switchLoginMode('join');
		} else {
			window.resizeTo(LOGIN_POPUP_WIDTH, SHORTER_POPUP_HEIGHT);
			loginObject.switchLoginMode('#loginPopupSignInMode');
		}
		jQuery("html").css("overflow", "auto");
	});
}

newWindow = null;

function showLoginPopupConditional(loginCallback, uri, custom_metrics) {
	if (loginCallback && !jwgData.isLoggedIn) {
		showLoginPopup(custom_metrics, function() {
			if (loginCallback == 'redirect') {
				window.location.href = uri;
			} else if(loginCallback.charAt(0) == "#") {
				window.location.href = window.location.href.replace(/#.*$/, '') + loginHash;
				window.location.reload();
			}
			if (typeof registerHash != 'undefined') {
				loginObject.registerRedirectHash = registerHash;
			} else {
				loginObject.registerRedirectHash = null;
			}
		});
		jQuery("#username").focus();
		return false;
	}
	return true;
}

function showLoginPopup(custom_metrics, successfulLoginCallback, registerHash, joinMode) {
	track('showLoginPopupDirectly/PAGE');
	
	var left = Math.round((screen.availWidth - LOGIN_POPUP_WIDTH) / 2);
	var top = Math.round((screen.availHeight - LOGIN_POPUP_HEIGHT) / 2);
	if (left < 0) {
		left = 0;
	}
	if (top < 0) {
		top = 0;
	}
	if (typeof winRef != 'undefined' && winRef) {
		winRef.close();
	}
	
	if (joinMode) {
		switchLoginMode('join', false, true);
	}
	else {
		switchLoginMode('login', false, true);
	}
	
	openDialog("#wholePopup", "veryNarrowModal");
	jQuery(".ui-icon-closethick").bind("click", closeLoginModal);
	lhsOrModal = "modal";

	window.setTimeout(checkClosed,200);
	
	loginObject.registerTriggerType = custom_metrics;
	if (successfulLoginCallback) {
		loginObject.successfulLoginCallback = successfulLoginCallback;
	} else {
		loginObject.successfulLoginCallback = null;
	}
	if (typeof registerHash != 'undefined') {
		loginObject.registerRedirectHash = registerHash;
	} else {
		loginObject.registerRedirectHash = null;
	}
}

function closeLoginModal() {
	jQuery(".ui-dialog-content").remove();
	jQuery("#loginPod .dsContent").html(wholePopupHtml);
	jQuery(".loginPopupClass").find("button").button();
	setDialogToLHS();
	lhsOrModal = "lhs";
}

var loginpopup = new function(){
    this.appID = '168416999909992';
	this.popupwidth=640;
	this.popupheight=390;
	this.signupShown=0;
	this.facebookUserData = {};
	this.iswa = 0;
    
    this.init = function(){    	
    	if(window.location.hash.length && location.href.indexOf("watofbcon=1") == -1)
    		loginpopup.callFacebook();  
    	if(location.href.indexOf("signupShown=1") >0 )
    		loginpopup.showSignUpDiv(jQuery("#signupbtn")); 
    	if(location.href.indexOf("iswa=1") >0)
    		loginpopup.iswa = 1;
    	if(loginpopup.iswa && location.href.indexOf("afterfb=1") == -1)
    		loginpopup.signInOnFacebook();
    	if(loginpopup.iswa && location.href.indexOf("&error=access_denied") > 0)
    		window.close();
    	if(!loginpopup.iswa && location.href.indexOf("afterfb=1") == -1){
    		jQuery("#ajax-loader").hide();
    		jQuery("#loginpopup").show();
    	}
    	if(location.href.indexOf("watofbcon=1") >0 ){
	    	jQuery("#ajax-loader").hide();
	    	loginpopup.showAccountsConnectForm();
	    	jQuery(".ui-dialog-titlebar-close").click(function(){
	    		window.close();
	    	});
    	}
    	
    },
    
    this.disconnectAccounts = function(){
    	var url = '/loginpopup';
		var loggedInUserName = loginpopup.readCookie("giving_wikiUserName");	
		var data = {media: 'screen',user_disconnect:loggedInUserName};
		jQuery.ajax({url: url, data:data, success: loginpopup.checkDisConnectResponse});
		
    };
    
    this.checkDisConnectResponse = function(response){
    	location.href = location.href;
    };
    
    this.checkConnectResponse = function(response){
		if (typeof response == "string" && response.charAt(0) == '{') {
			response = jQuery.parseJSON(response);
		}
		var msg = (response && typeof response.message!="undefined")?response.message:response;
		if(response && typeof response.status!="undefined" && response.status==200){
			loginpopup.closePopupAndReloadOpener(response);
		} else {
			jQuery("#gigyaConnect").css({"height":"auto"});
			jQuery("#gigyaConnect .errorSection").html(msg).show();
		}
    };

    this.ConnectIntoExternal = function (formSelector){ 
    	var username = jQuery(formSelector).find("#username").val();
    	var password = jQuery(formSelector).find("#password").val();
		if (!username) {
			jQuery("#gigyaConnect").css({"height":"auto"});
			jQuery("#gigyaConnect .errorSection").html("Please choose a username.").show();
			return;
		}
		if (!password) {
			jQuery("#gigyaConnect").css({"height":"auto"});
			jQuery("#gigyaConnect .errorSection").html("Please enter a password.").show();
			return;
		}
    	var url = jwgData.config.wgLoginLoc + '/loginpopup';			
		var data = {};
		data.fbdata = loginpopup.facebookUserData;
		data.internal_username = username;
		data.internal_password = password;
		data.media = 'screen';
		var loggedInUserName = loginpopup.readCookie("giving_wikiUserName");	
		if(loggedInUserName){
			data.loggedin_username = loggedInUserName;
			data.connectIntoExternal = 1;
		}else{
			data.connectNotLoggedIn=1;         
		}      
		jQuery.ajax({url: url, data:data, type: 'POST', success: loginpopup.checkConnectResponse});
    };

    this.ConnectWAIntoFB = function (){ 
    	loginpopup.openLoginDialog(loginpopup.reloadpage,null,1,null,1);
    };
    
    this.ConnectFBIntoWA = function (){ 
    	loginpopup.openLoginDialog(loginpopup.reloadpage,null,1,1);	
    };
    	    
    this.doregister = function(formSelector) {
    	this.username = jQuery(formSelector).find("#username").val();
    	this.password = jQuery(formSelector).find("#password").val();
    	this.retypePassword = jQuery(formSelector).find("#wpRetype").val();
    	this.emailAddress = jQuery(formSelector).find("#wpEmail").val();
    	this.getNewsletter = jQuery(formSelector).find("#wpGetNewsletter:checked").length;
    	this.acceptPolicy = jQuery(formSelector).find("#wpAcceptPolicy:checked").length;
    	
		var url = jwgData.config.wgLoginLoc + '/ajax/register.php';
		var data = {media: 'screen',username: this.username,password: this.password,email: this.emailAddress,wpGetNewsletter: this.getNewsletter};
		jQuery.ajax({url: url, data:data, success: loginpopup.checkResponse});
			
    };
    
	this.showAccountsConnectForm = function () {
		openDialog('#gigyaConnect', 'modal');
	};
	
	this.submitLostPassword = function (inputSelector) {
		var url = jwgData.config.wgLoginLoc + '/ajax/mailPassword.php';
		var emailOrUsername = jQuery(inputSelector).val();
		var data = {media: 'aqua',emailOrUsername : emailOrUsername,shouldBeAPI : true};
		jQuery.ajax({url: url, data:data, success: loginpopup.lostPasswordResponse});
	};
	
	this.lostPasswordForConnect = function () {
		openDialog('#loginPopupLostPassword', 'wideModal');
	};
	
	this.lostPasswordResponse = function(response) {
		if(response && typeof response.status!="undefined" && response.status==200){
			closeDialog("#loginPopupLostPassword");
			loginpopup.showErrorInPopup("Ok. Password sent!", '#gigyaConnect');
		}else{
			loginpopup.showErrorInPopup("You must enter either your username or your email address to receive a new password by email.", '#loginPopupLostPassword');
		}
	};
	
	this.showErrorInPopup = function (message, popupSelector) {
		var errorSection = jQuery(popupSelector).find('.errorSection');
		if (errorSection.length > 0) {
			errorSection.html(message).show();
		}
	};
    
	this.signInToWAAsWAUser = function (usernameSelector, passwordSelector, rememberSelector) {
		
		this.username = jQuery(usernameSelector).val();
		this.password = jQuery(passwordSelector).val();
		this.remember = jQuery(rememberSelector + ":checked").length;
		var url = jwgData.config.wgLoginLoc + '/ajax/login.php';
		var data = {media: 'screen',authUser: this.username,authPw: this.password,authRemember: this.remember};
		jQuery.ajax({url: url, data:data, success: loginpopup.checkResponse});
	};
	
	this.signInToWAAsFacebookUser = function () {
		var url = jwgData.config.wgLoginLoc + '/loginpopup';
		var data = {};
		data.fbdata = loginpopup.user;
		data.media="screen";
		var fbtowacon = loginpopup.getUrlParameter("fbtowacon");
		var loggedInUserName = loginpopup.readCookie("giving_wikiUserName");		
		if(fbtowacon && loggedInUserName){
			data.loggedin_username=loggedInUserName;
			data.connectIntoInternal=1;
		}
		jQuery.ajax({url: url, data:data, type: 'POST', success: loginpopup.checkResponse});
	};
			
	this.checkResponse = function (response) {
		if (typeof response == "string" && response.charAt(0) == '{') {
			response = jQuery.parseJSON(response);
		}
		var msg = (response && typeof response.message!="undefined")?response.message:response;
		if(response && typeof response.status!="undefined" && response.status==200){	
			loginpopup.closePopupAndReloadOpener(response);
		} else {
			if(response && typeof response.id!="undefined")//is facebook connect
				loginpopup.showMinorDetailsDiv(msg,response);
			loginpopup.showMessage(msg);
		}
		
	};
	
	this.closePopupAndReloadOpener = function(response) {
		var forwardUrl = loginpopup.getForwardUrl();
		if(forwardUrl != null) {
			var qsSeparator = (forwardUrl.indexOf('?') != -1) ? '' : '?';
			window.location.href = forwardUrl + qsSeparator + loginpopup.getResponseQS(response);
		} else {
			jQuery("#ajax-loader").hide();
			var url = loginpopup.getUrlParameter("url");
			if(url){
				var domain = url.replace(/\.answers\.com\/.*/,".answers.com");;
				window.location.href = domain+ "/loginpopup?reloadParent=1";
			}
		}
	};
	
	this.getUrlParameter = function(name) {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    if(vars && vars[name])
	    	return unescape(vars[name]);
	    else
	    	return null;
	};
	
	this.showMinorDetailsDiv = function (msg,response){
		this.facebookUserData.id = response.id;
		this.facebookUserData.first_name = response.first_name;
		this.facebookUserData.last_name = response.last_name;
		this.facebookUserData.name = response.name;
		this.facebookUserData.link = response.link;
		this.facebookUserData.picture = response.picture;
		this.facebookUserData.email = response.email;
		jQuery("#ajax-loader").hide();
		jQuery("#minorDetailsTopPart, #minorDetails").show();
		jQuery(".loginPopupClass").find("button").button();
		jQuery("#minorDetails .errorSection").html(msg).show();
		jQuery("#fbUsername").val(response.first_name+' '+response.last_name);
		jQuery("#fbEmail").val(response.email);
		
	};
	
	this.showMessage = function(msg){
		jQuery("#errormessage").html(msg).show();
	};

	this.signInOnFacebook = function (){
		var path = 'https://www.facebook.com/dialog/oauth?';
		var url = location.href;
		if(this.signupShown && location.href.indexOf("signupShown=1") == -1 )
			url += "&signupShown="+this.signupShown;
		url += "&afterfb=1";
		url = encodeURIComponent(url);
		var queryParams = ['display=popup','client_id=' + this.appID,'redirect_uri=' + url,'response_type=token','scope=email,user_location,user_birthday,publish_stream'];
		var query = queryParams.join('&');
		var url = path + query;
		location.href= url;
	};
	
	this.getForwardUrl = function(){
		var qs = window.location.search.substring(1).split('&');
		for(var i in qs) {
			if(qs[i].indexOf('forwardUrl') === 0) {
				var paramSplit = qs[i].split('=');
				var forwardUrl = paramSplit[1];
				return decodeURIComponent(forwardUrl);
			}
		}
		return null;
	};
	
	this.getResponseQS = function(response) {
		var qs = '';
		for(var i in response) {
			qs += '&' + i + '=' + encodeURIComponent(response[i]);
		}
		return qs;
	}
	
	this.openLoginDialog = function(callback, forwardUrl,iswa,fbtowacon,watofbcon){
		var left = Math.round((screen.availWidth/2) - (this.popupwidth/2));
		var top = Math.round((screen.availHeight/3) - (this.popupheight/2));
		var url = encodeURIComponent(location.href);
		var forwardUrlQS = '';
		if(typeof forwardUrl != 'undefined' && forwardUrl) {
			forwardUrlQS = '&forwardUrl=' + encodeURIComponent(forwardUrl);
		}
		this.callback = callback;
		var newWindowUrl = jwgData.config.wgLoginLoc + '/loginpopup?';
		if(typeof iswa!="undefined" && iswa){
			this.iswa = 1;
			newWindowUrl +="iswa=1";
		}
		if(typeof fbtowacon!="undefined" && fbtowacon){
			newWindowUrl +="&fbtowacon=1";
		}
		if(typeof watofbcon!="undefined" && watofbcon){
			newWindowUrl +="&watofbcon=1";
		}
		newWindowUrl +="&url="+url+forwardUrlQS;
		
		newWindow = window.open(newWindowUrl,'Login','left='+left+',top='+top+',width='+this.popupwidth+',height='+this.popupheight+',titlebar=0,menubar=0,scrollbars=0,toolbar=0,resizable=0,location=0,directories=0,status=0,menubar=no,scrollbars=no,toolbar=no,resizable=no,location=no,directories=no,status=no,titlebar=no');
		if(newWindow) newWindow.focus();

	};
	
	this.getheight = function(){
		return this.popupheight;
	};		
	
	this.getwidth = function(){
		return this.popupwidth;
	};	
	
	this.runcallback = function (username){
		this.callback(username);
	};
	
	this.reloadpage = function(username) {
		location.href=location.href;
	};
	
	this.signInOnFacebookDone = function(user) {
		this.user = user;
	    this.signInToWAAsFacebookUser();
	};
	
	this.callFacebook = function(){
		accessToken = window.location.hash.substring(1);
		var path = "https://graph.facebook.com/me?";
		var allRequestFields = "fields=id,name,first_name,last_name,link,bio,username,about,birthday,location,work,education,interested_in,gender,relationship_status,religion,political,website,timezone,locale,languages,verified,updated_time,email,picture,activities,books,games,interests,movies,music,television";
		var queryParams = [allRequestFields, accessToken, 'callback=loginpopup.signInOnFacebookDone'];
		var query = queryParams.join('&');
		var url = path + query;					

		var script = document.createElement('script');
		script.src = url;
		document.body.appendChild(script); 
	};
			
	this.showSignUpDiv = function(elm){
		jQuery('#signupdiv').show();
		var w = loginpopup.getwidth();
		var h = loginpopup.getheight()+410;
		if(jQuery.browser.mozilla) w -=2;
		window.resizeTo(w,h);
		jQuery(elm).hide();
		this.signupShown=1;
	};
	
	this.doMinorDetailsJoin = function (formSelector) {
		this.facebookUserData.name = jQuery(formSelector).find("#fbUsername").val();
		this.facebookUserData.email = jQuery(formSelector).find("#fbEmail").val();
		this.facebookUserData.getNewsletter = jQuery(formSelector).find("#wpGetNewsletter:checked").length;
		this.facebookUserData.acceptPolicy = jQuery(formSelector).find("#wpAcceptPolicy:checked").length;
		loginpopup.minorDetailsJoinNow();
	};
	
	this.minorDetailsJoinNow = function () {
		if (!this.facebookUserData.name) {
			jQuery("#minorDetails .errorSection").html("<?php echo $chooseUserName;?>");
			return;
		}
		if (!this.facebookUserData.email) {
			jQuery("#minorDetails .errorSection").html("Please enter an email address.");
			return;
		}
		if (!this.facebookUserData.acceptPolicy) {
			jQuery("#minorDetails .errorSection").html("Please check that you agree to the community guidelines, terms of use and privacy policy for this site and confirm that you are at least 13 years of age.");
			return;
		}
		var url = jwgData.config.wgLoginLoc + '/loginpopup';
		var data = {};
		data.fbdata = loginpopup.facebookUserData;
		jQuery.ajax({url: url, data:data, type: 'POST', success: loginpopup.checkResponse});
	};

	this.showLoginTooltip = function (whichSelector) {
		openDialog(jQuery(whichSelector), 'veryNarrowModal');
	};
	
	this.readCookie = function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	};
};

loginModeInit();

$('.auth_link').live('click', function(event) {
	preventReload = true;
	return showLoginPopupConditional($(this).attr('callback') || 'redirect', $(this).attr('href'), $(this).attr('custom_metrics')) ;
});


function dologout() {
	if ("undefined" == typeof LogoutAjaxResponse) {
		LogoutAjaxResponse = AquaAjaxResponse.prototype.inherit("LogoutAjaxResponse", {
			status200: function(data) {
				window.location.reload();
			},
			statusERROR: function(data) {
				trackError(data.message);
				alert("Error: " + data.message);
			}
		});
	}
	var url = '/ajax/logout.php';
	var ajaxResponse = new LogoutAjaxResponse;
	var resp = ajaxResponse.postJson(url);
}

function submitProtectQuestion(on, lpos){
	lid = ((on) ? "" : "Un") +"Protect";
	track(lid+"/"+lpos);

	if("undefined" == typeof ProtectQuestionAjaxResponse){
		ProtectQuestionAjaxResponse = AquaAjaxResponse.prototype.inherit("ProtectQuestionAjaxResponse", {
			status200: function(data) {
				window.location.reload();
			}
			, status409002: function(data) {
				trackError("409002 " + data.message);
				window.location.reload(true);
			}
			, statusERROR: function(data) {
				trackError(data.message);
				alert("Error: " + data.message);
			}
		});
	}
	var data = {jsonly: 1
				, title: jQuery("#WikiAnswers").data("title")
				, etag: jQuery("#WikiAnswers").data("etag")
				, toProtect: (on) ? 1 : 0};
	var url = jwgData.config.wgServer + '/ajax/protectQuestion.php';
	var ajaxResponse = new ProtectQuestionAjaxResponse();
	var resp = ajaxResponse.postJson(url, data);
}

function confirmPermanentlyDelete(lpos) {
	track("AdminPermDelete", lpos);
	openDialog("#permanentlyDeleteConfirm", "confirmModal", {"okFunction": submitPermanentlyDelete, "cancelTracking": "permanentlyDeleteCancel"});
	return false;
}

function submitPermanentlyDelete() {
	track("permanentlyDeleteOK");
	if("undefined" == typeof DeleteQuestionAjaxResponse){
		DeleteQuestionAjaxResponse = AquaAjaxResponse.prototype.inherit("DeleteQuestionAjaxResponse", {
			status200: function(data) {
				jQuery("#permanentlyDeleteConfirm").dialog("close");
				initializeDialog("<div id='permanentlyDeleted'>" + data.message + "</div>", "modal", {buttons: {"OK": function() { window.location.href = '/'; }}});
				jQuery("#permanentlyDeleted").dialog("open");
				jQuery(".ui-dialog-titlebar-close").click(function() { window.location.href = '/'; });
			}
			, statusERROR: function(data) {
				trackError(data.message);
				alert("Error: " + data.message);
			}
		});
	}
	var data = {jsonly: 1
			, title: jQuery("#WikiAnswers").data("title")
			, etag: jQuery("#WikiAnswers").data("etag")
			}
	var url = jwgData.config.wgServer + '/ajax/deleteQuestion.php';
	var ajaxResponse = new DeleteQuestionAjaxResponse();
	var resp = ajaxResponse.postJson(url, data);
}

function submitUnlockQuestion(lposPrefix) {
	track('unlockQuestion', lposPrefix);
	if ("undefined" == typeof UnlockQuestion) {
		UnlockQuestion = AquaAjaxResponse.prototype.inherit("UnlockQuestion", {
			url: url = jwgData.config.wgServer + '/ajax/preserveQuestion.php',
			id: null,
			post: function(data) {
				data.action = "unlockModal";
				return this.postJson(this.url, data);
			},
			statusMODAL: function(data) {
				this.id = "unlockModal";
				if(jQuery('#' + this.id).length) {
					jQuery('#' + this.id).html(data.html);
				} else {
					jQuery('<div id="' + this.id + '"></div>').html(data.html).appendTo("body");
				}
				openDialog("#" + this.id, "modal");
			},
			unlock: function(lposPrefix) {
				this.close();
				submitPreserveQuestion(lposPrefix, false);
			},
			close: function() {
				closeDialog("#" + this.id);
			}
		});
	}
	unlockQuestion = new UnlockQuestion();
	unlockQuestion.post({lposPrefix:lposPrefix});
	return false;
}

function submitPreserveQuestion(lposPrefix, on) {
	if ("undefined" == typeof on) {
		on = true;
	}
	track("Admin" + (on ? "P" : "Unp") + "reserve", lposPrefix);

	if("undefined" == typeof RubixPreserveQuestionAjaxResponse){
		RubixPreserveQuestionAjaxResponse = AquaAjaxResponse.prototype.inherit("PreserveQuestionAjaxResponse", {
			status200: function(data) {
				jQuery("#WikiAnswers").data("etag", data.etag);
				jQuery("#protected").removeClass("protected");
				jQuery("#preserved").toggleClass("preserved");
				this.togglePreserveLink(data.isPreserved);
				// update the LHS
				var url = jwgData.config.wgServer+"/solo/user/controlpanel?question_title="+jwgData.waQuestionUrl;
				var new_content = jQuery.get(url, function(new_data) {jQuery('.user_controlpanel').html(new_data);});
			}
			, togglePreserveLink: function(isPreserved) {
				if(isPreserved) {
					jQuery("#preserveQuestion").hide();
					jQuery("#unpreserveQuestion, #preservedContainer").show();
					jQuery("#questionImproveLinkContainer, #answerImproveLinkContainer").find("span").hide();
					// jQuery("#improveAnswerBtn, #discussQuestionBtn, .addthis_toolbox, #canYouAnswerText, #noAnswerButtonBar").addClass("hide");
				} else {
					jQuery("#preserveQuestion").show();
					jQuery("#unpreserveQuestion, #preservedContainer").hide();
					jQuery("#questionImproveLinkContainer, #answerImproveLinkContainer").find("span").show();
					// jQuery("#improveAnswerBtn, #discussQuestionBtn, .addthis_toolbox, #canYouAnswerText, #noAnswerButtonBar").removeClass("hide");
				}
				
			}
			, status409024: function(data) {
				trackError("409024 " + data.message);
				window.location.reload(true);
			}
			, statusERROR: function(data) {
				trackError(data.message);
				alert("Error: " + data.message);
			}
		});
	}
	var data = {
		jsonly: 1
		, action: (on ? "preserve" : "unlock")
		, title: jQuery("#WikiAnswers").data("title")
		, etag: jQuery("#WikiAnswers").data("etag")
	};
	var url = jwgData.config.wgServer + '/ajax/preserveQuestion.php';
	var ajaxResponse = new RubixPreserveQuestionAjaxResponse();
	ajaxResponse.postJson(url, data);
	return false;
}

var DisplayAds = {
	showAdmeldAds: function(){	
		    var no_right_bar = $('body').hasClass('slim');
		    $('.admeldBoxAd').each(function(index) {
		    	if(!no_right_bar || $(this).is(':visible'))
		    	{
			    	var iframeHtml = '<iframe id="ifrm_'+index+'" width="'+$(this).attr('ad_width')+'" target="_self"  height="'+$(this).attr('ad_height')+'" frameborder="0" scrolling="no"  marginwidth="0" marginheight="0"></iframe>';
			    	$(this).append(iframeHtml);
			    	var admeldSrc = DisplayAds.getAdmeldSrc($(this).attr('ads_category'),$(this).attr('ad_width')+"x"+$(this).attr('ad_height'),$(this).attr('placement'),$(this).attr('admeld_site'));	
			        $("base").attr('target', "_self");	
			        $(this).find("iframe").attr('src', admeldSrc);
			        $(this).parent().children().show();
			        $("base").attr('target', "_top");
		    	}
		    });

	},
	getAdmeldSrc: function(taxonomy,size,location,admeld_site) {
		taxonomy = (taxonomy).replace("\/","-"); 
		var admeldSrc = "javascript:'<script>var admeld_publisher  = 90;"+
	    "var admeld_site = \""+admeld_site+"\";" + 
	    "var admeld_size = \""+size+"\";" + 
	    "var admeld_placement = \""+location+"_"+taxonomy+"\";" +
	    "</sc"+"ript>" +
	    "<scr"+"ipt src=\"http://js.admeld.com/meld120.js\" target=\"_self\" ></scr" + "ipt>'";
		if(jQuery.browser.msie || jQuery.browser.mozilla)
			admeldSrc = jwgData.config.wgServer + "/Q/Special:Servlet&op=admeld&admeld_site="+admeld_site+"&admeld_size="+size+"&admeld_placement="+location+"_"+taxonomy;
	    return admeldSrc;    
	}
};

jQuery(document).ready(function() {
	DisplayAds.showAdmeldAds();
});

function toggleLHMCategoriesList(clickedEl) 
{
	jQuery(clickedEl).parent().toggleClass('expanded');
	jQuery('.categoryMenu').find('li').toggle();
	
}

if (jwgData.metrics.comscoreC4Url) 
{	
	windowOnload(function(){
		var csJsHost = (("https:" == window.location.protocol) ? "https://sb." : "http://b.");
		loadAsyncSrc(csJsHost + "scorecardresearch.com/beacon.js", function(){
			COMSCORE.beacon({
				c1:2,
				c2:6035968,
				c3:"",
				c4: jwgData.metrics.comscoreC4Url,
				c5:"",
				c6:"",
				c15:""
			});
		});
	});
}

function loadQuantcast(qc_cat) {
	_qoptions = {tags:qc_cat};
	_qacct="p-72V4-XKpaKDrE";
	quantserve();	
}

if (jwgData.metrics.quantcastCat) 
{	
	windowOnload(function(){
		loadAsyncSrc("http://edge.quantserve.com/quant.js", loadQuantcast, jwgData.metrics.quantcastCat);
	});
}

function callTacoda(){
	if ("ra" != jwgData.metrics.tacodaType && "wa" != jwgData.metrics.tacodaType) {
		return;
	}
	var ref = "";
	if (document.referrer) {
		ref = "&tacref=" + encodeURIComponent(document.referrer);
	}
	var query;
	if (typeof jwgData != "undefined") {
		query = getHash("q");
	} 
	if (typeof query == "undefined") {
		var jQueryPageTitle = jQuery("#pageTitle");
		if (jQueryPageTitle.length != 0) {
			query = jQuery("#pageTitle").html();
		} else {
			query = "";
		}
	}
	query = "&query=" + encodeURIComponent(query);
	jQuery("body").append('<iframe id="tacoda" width=1 height=1 frameborder=0 src="' + jwgData.config.wgServer + '/resources/tac.html?site=' + jwgData.metrics.tacodaType + query + ref + '"></iframe>');
}

if (jwgData.metrics.tacodaType) 
{	
	windowOnload(function(){
		setTimeout(callTacoda, 2000);
	});
}