/**
 * @fileoverview Set up Cramster namespace and common modules and procedures.
 * @requires jQuery 1.4.2+
 */
if (window.Cramster === undefined) {
/** @namespace Cramster Main namespace. */
    var Cramster = {};
}

(function ($) {
    /**
     * @exports $$ as Cramster
     * @exports $ as jQuery
     */
    var $ = jQuery,
        $$ = Cramster;
    /**
     * @namespace Holds settings for UI elements and modules.
     */
    $$.settings = {
        /** @namespace jQuery plugin settings for modals. */
        modals: {},
        /** @namespace Default module settings, usually through a jQuery plugin interface. */
        defaults: {}
    };
    /**
     * Base modal style.
     * @field
     */
    $$.settings.modals.style = {
        /** jQuery.tools.overlay option to activate jQuery.tools.expose. */
        expose: '#222222',
        /** Left offset. */
        left: 'center',
        /** Top offset. */
        top: 150
    };
    /**
     * Base validation options
     * @field
     */
    $$.settings.validation = {
        errorElement: "div",
        errorPlacement: function (error, element) {
            $(element).closest(".form-row").prepend(error);
        },
        unhighlight: function (element, errorClass, validClass) {
            //need a delay because the .error hiding is happening after unhighlight is called and .form-row's with more than one field were having problems
            setTimeout(function () {
                $(element).closest(".form-row:not(.form-row:has(.error:visible))").removeClass("errored");
            }, 10);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest(".form-row").addClass("errored");
        }
    };
    /**
     * Base modal settings. Extends style.
     * @field
     */
    $$.settings.modals.base = $.extend({}, $$.settings.modals.style, {
        'close': '.close_button',
        'closeOnClick': false, // anywhere
        'closeOnEsc': true
    });
    /**
     * Locked modal settings. Modal can't be closed. Extends style.
     * @field
     */
    $$.settings.modals.locked = $.extend({}, $$.settings.modals.style, {
        'close': '.null',
        'closeOnClick': false, // anywhere
        'closeOnEsc': false
    });
    /**
     * Popup settings.
     * @field
     */
    $$.settings.modals.popup = {
        'dimensions': 'width=600,height=200',
        'facebook': {
            'url': 'http://www.facebook.com/share.php?u=',
            'dimensions': 'width=600,height=200'
        }
    };
    /**
     * BlockUI settings.
     * @field
     */
    $$.settings.blockUI = {
        loading: {
            message: '<span class="loading"></span>',

            // remove message styles - style based on class of message wrapper
            css: {
                padding: 0,
                margin: 0,
                top: '65px',
                width: 'auto',
                background: 'none',
                border: 'none'
            },

            // white blocking
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.85
            },

            // these will override the top/left position of "css" above if set to true
            centerX: true,
            centerY: false,

            // fade settings
            fadeIn: 200,
            fadeOut: 200
        }
    };
    /**
     * jQuery Tools Scrollable settings.
     * @field
     */
    $$.settings.scrollable = {
        items: ".inner_gallery",
        prev: ".prev_button",
        next: ".next_button",
        onSeek: function () {
            var $pagination = this.getRoot().find(".carousel_pagination");
            $pagination.find(".counter").text(this.getIndex() + 1);
            $pagination.find(".length").text(this.getSize());
        }
    };
    /** @namespace Info and server-side-set switches. */
    $$.globals = {
        /** @field */
        isLoggedIn: null
    };
    /** @namespace Global constants and module constants. */
    $$.constants = {
        /** @constant */
        ENTER_KEY: 13,
        /** @constant */
        TAB_KEY: 9,
        /** @constant */
        SPACE_KEY: 32
    };
    /** @namespace Common jQuery result objects. Usually top-level. */
    $$.cache = {
        /** @field */
        $overlay: undefined,
        /** @field */
        $head: undefined,
        /** @field */
        $body: undefined,
        /** @field */
        $foot: undefined
    };

    /** @namespace Custom functions that aren't jQuery plugins, has section namespaces. */
    $$.fn = $$.fn || {};
    /** @namespace Modal functions. */
    $$.fn.modals = {};
    /**
     * @namespace Simple UI elements and procedures.
     * @deprecated Use Cramster.modules and write modules instead.
     */
    $$.fn.ui = {};
    /**
     * @namespace Bookmark functions.
     * @deprecated Use the bookmarking jQuery plugin instead.
     */
    $$.fn.bookmark = {};

    /** @namespace Server-side data. */
    $$.data = $$.data || {};
    /** @namespace Server-side data globals. */
    $$.data.global = $$.data.global || {};
    /** @namespace Server-side session globals. */
    $$.data.session = $$.data.session || {};

    /** @namespace Tracking related functions. */
    $$.fn.stats = {};
    $$.data.stats = {};

    /** @namespace Error related functions. */
    $$.fn.error = {};

    /** @namespace Module classes, generally accompanied by a jQuery plugin. */
    $$.modules = $$.modules || {};

    /** @namespace Template functions, usually generated by Google Closure. */
    $$.templates = $$.templates || {};

    /** @namespace Temporary global storage. Useful for sharing references between file closures. */
    $$.temp = $$.temp || {};

    /** @namespace Page urls. */
    $$.urls = $$.urls || {};

    /** @queue for keeping track of locks */
	$$.lockQueue = [];

    /**
     * Generate section namespaces.
     * @public
     * @member Cramster
     * @param {String} name Name of namespace to create.
     * @exports $$.setupNamespace as Cramster.setupNamespace
     */
    $$.setupNamespace = function (name) {
        $$.temp[name] = $$.temp[name] || {};
        $$.cache[name] = $$.cache[name] || {};
        $$.fn[name] = $$.fn[name] || {};
        $$.urls[name] = $$.urls[name] || {};
        $$.data[name] = $$.data[name] || { apiUrls: {} };
    };

    // ----------------------------------------
    // Cramster client detection
    // ----------------------------------------
    var userAgent = navigator.userAgent.toLowerCase();
    /** @namespace Browser sniffing results. */
    $$.globals.browser = {
        /** @field */
        isChrome: (/chrome/.test(userAgent)),
        /** @field */
        isSafari: (/webkit/.test(userAgent)) && !(/chrome/.test(userAgent)),
        /** @field */
        isOpera: (/opera/.test(userAgent)),
        /** @field */
        isMozilla: (/mozilla/.test(userAgent)) && !(/(compatible|webkit)/.test(userAgent)),
        /** @field */
        isIe: (/msie/.test(userAgent)) && !(/opera/.test(userAgent)),
        /** @field */
        isLteIe8: this.isIe && parseInt($.browser.version, 10) <= 8,
        /** @field */
        isLteIe7: this.isIe && parseInt($.browser.version, 10) <= 7,
        /** @field */
        isLteIe6: this.isIe && parseInt($.browser.version, 10) <= 6
    };
    /** @namespace Rendering engine sniffing results. */
    $$.globals.renderingEngine = {
        /** @field */
        isGecko: (/gecko/.test(userAgent)) && !(/like gecko/.test(userAgent)),
        /** @field */
        isWebkit: (/webkit/.test(userAgent)),
        /** @field */
        isPresto: (/presto/.test(userAgent)),
        /** @field */
        isTrident: (/trident/.test(userAgent)) || ($$.globals.browser.isIe && parseInt($.browser.version, 10) <= 7)
    };

    // ----------------------------------------
    // Cramster modal functions
    // ----------------------------------------
    /**
    * Get a modal from compiled Modals.soy if it hasn't loaded or needs to be refreshed.
    * @requires jQuery.fn.overlay
    * @requires Cramster.templates.modals
    * @param {String} templateName Required template/function name
    * @param {Boolean} insert Option to add to document (We're getting html from a .soy, so this is for flexibility)
    * @param {Object} templateData If passed, refreshes modal with new data
    * @param {jQuery object} $trigger Allows for using the function's full features
    *                                 If passed with `clicked` data as anything but true, rebinds overlay to trigger and retriggers modal
    *                                 this is mostly a hack to dynamically bind many triggers to one modal
    * @param {Boolean} callback Function with the modal API as parameter
    * @param {Boolean} api Option to return $.fn.overlay's API
    * @param {Object} modalSettings custom modal settings
    * @returns {String|Object} html, api Optional
    * @deprecated Use Cramster.fn.modals.load instead.
    */
    $$.fn.modals.get = function (templateName, insert, templateData, $trigger, api, callback, modalSettings) {
        insert = insert || true;
        templateData = templateData || {};
        $trigger = $trigger || false;
        api = api || false;
        modalSettings = modalSettings || $$.settings.modals.base;
        var $modal, html, modalSelector, modalExists, modalApi;
        modalSelector = "#" + templateName + "Overlay";
        $modal = $(modalSelector, $$.cache.$overlay);
        modalExists = $modal.length === 1;
        if (modalExists && !insert) {
            if (!templateData) {
                return $modal.html();
            }
        } else {
            html = templateData ?
                $$.templates.modals[templateName](templateData) :
                $$.templates.modals[templateName]();
            if (insert) {
                if (!modalExists) {
                    $modal = $(html);
                    $$.cache.$overlay.append($modal);
                } else if (templateData) {
                    $modal.children().each(function (idx) {
                        var childHtml = $(html).children().get(idx);
                        $(this).replaceWith(childHtml);
                    });
                }
                if ($(".button, button.sliding_button, .toggle_buttons", $modal).length > 0) {
                    $$.fn.fixButtons({}, $modal);
                }
                if ($trigger) {
                    modalApi = $trigger.overlay($.extend({}, modalSettings, {
                        target: modalSelector,
                        api: true
                    }, $$.settings.modals[templateName] || {}));
                    if (!$trigger.data("clicked")) { // essentially re-calls the function
                        $trigger.data("clicked", true)
                            .trigger("click");
                        return;
                    } else {
                        if (typeof modalApi == "object") {
                            $$.fn.modals.rebindClose(modalApi);
                            if (callback) {
                                callback(modalApi);
                            }
                            if (api) {
                                return modalApi;
                            }
                        }
                    }
                }
            } else {
                return html;
            }
        }
    };
    /**
     * Lazy-loading templated modals. Temporary overloading of $$.fn.modals.get.
     * @param {!string} args.name
     * @param {?Object=} args.data
     * @param {!jQuery} args.$trigger
     * @param {?function(jQuery.tools.Overlay)=} args.ready
     * @param {?Object=} args.overlayOptions
     * @todo Salvage from $$.fn.modals.get, then redirect latter.
     * @returns {jQuery.tools.Overlay} Api.
     */
    $$.fn.modals.load = function (args) {
        var api = $$.fn.modals.get(args.name, true, args.data, args.$trigger, true,
            args.ready, args.overlayOptions);
        if (api) {
            api.load();
            return api;
        }
    };
    /**
    * Temporary fix until I figure out the root of this issue
    * @public
    */
    $$.fn.modals.rebindClose = function (modalApi) {
        var $modal = modalApi.getOverlay();
        $(".close_button:eq(0)", $modal).bind("click", function (evt) {
            modalApi.close();
            evt.preventDefault();
        });
    };
    /**
    * Binds button to open facebook popup
    * @public
    * @param {jQuery object} $btnFacebook button for which to bind
    */
    $$.fn.modals.facebookShare = function ($btnFacebook) {
        $btnFacebook.bind("click", function (evt) {
            evt.preventDefault();
            var url;
            if ($btnFacebook.attr("href").charAt(0) != '#') {
                url = $btnFacebook.attr("href");
            } else {
                var location = window.location.toString();
                if (location.indexOf("#", 0) > 0) {
                    location = location.substring(0, location.indexOf('#'));
                }
                url = location + $btnFacebook.attr("href");
            }
            url = $$.settings.modals.popup.facebook.url + url;
            window.open(url, 'blank', $$.settings.modals.popup.facebook.dimensions);
        });
    };
    /**
    * Binds button to open generic popup
    * @public
    * @param {jQuery object} $button button for which to bind
    */
    $$.fn.modals.genericPopup = function ($button) {
        $button.bind("click", function (evt) {
            evt.preventDefault();
            window.open($button.attr("href"), 'blank', $$.settings.modals.popup.dimensions);
        });
    };
    $$.fn.modals.popup = function ($button) {
        if (!$button.is("[data-type]$='popup'")) {
            return;
        }
        switch ($button.attr("data-type")) {
            case "popup":
                $$.fn.modals.genericPopup($button);
                break;
            case "facebook-popup":
                $$.fn.modals.facebookShare($button);
                break;
        }
    };

    // ----------------------------------------
    // Cramster widgets
    // ----------------------------------------
    /**
    * Specific implementation of faux_dropdown
    * Contains mostly view data
    * @public
    */
    $$.fn.ui.fullSubjectSelector = function ($dropdown, options) {
        options = $.extend(true, {
            positionAdjustment: { left: 0 },
            align: "left",
            template: "fauxDropdownL3",
            tabsSettings: {
                classAttr: "board_group_selector small_button_row_menu"
            },
            customOptgroup: {
                name: "Writing",
                content: {
                    head: "<tr class='writing_start flow_step'><td class='step_body'><ul class='controls two_columns equal_columns clearfix'>",
                    foot: "</ul></td></tr>"
                },
                options: [{
                    classAttr: { container: 'column_1 panel', button: 'button medium_button white_button' },
                    head: '<div class="decision_button_container center">',
                    foot: '</div><br/><h4 class="label"><strong>Need help with &hellip;</strong></h4><br/><ul class="arrow_menu column_menu text2"><li><span class="bullet">&raquo;</span>Getting started</li><li><span class="bullet">&raquo;</span>Research</li><li><span class="bullet">&raquo;</span>Outline Creation</li><li><span class="bullet">&raquo;</span>Topic</li><li><span class="bullet">&raquo;</span>Ideas</li><li><span class="bullet">&raquo;</span>Concepts</li></ul>'
                }, {
                    classAttr: { container: 'column_2 panel', button: 'button medium_button white_button' },
                    head: '<div class="decision_button_container center">',
                    foot: '</div><br/><h4 class="label"><strong>Need help with &hellip;</strong></h4><br/><ul class="arrow_menu column_menu text2"><li><span class="bullet">&raquo;</span>Proofreading</li><li><span class="bullet">&raquo;</span>Organization</li><li><span class="bullet">&raquo;</span>Grammar</li><li><span class="bullet">&raquo;</span>Spelling</li><li><span class="bullet">&raquo;</span>Structure</li><li><span class="bullet">&raquo;</span>General Feedback</li></ul>'
                }]
            }
        }, options);
        $dropdown.fauxDropdown(options);
        $$.fn.fixButtons({}, $("#" + $dropdown.attr("id") + "Enhanced .writing_start", $$.cache.$overlay));
    };
    // ----------------------------------------
    // Cramster analytics
    // ----------------------------------------
    $$.data.stats.settings = {
        trackerId: "UA-831485-1",
        domainName: "cramster.com",
        pageSegment: undefined
    };
    /**
    * Tracks event based on pageSegment custom URL
    * @public
    * @param {object} Options for account, domain and tracking URL
    */
    $$.fn.stats.track = function (opt) {
        opt = $.extend({}, $$.data.stats.settings, opt);
        if (!window._gat || opt.pageSegment === undefined) {
            return;
        }
        try {
            var pageTracker = _gat._getTracker(opt.trackerId);
            pageTracker._setDomainName(opt.domainName);
            pageTracker._trackPageview(opt.pageSegment);
        } catch (err) { }
    };
    /**
    * Track links with a delay for tracking to load
    * @public
    * @param {jQuery object} jQuery object of link or links to add tracking to
    */
    $$.fn.stats.trackLinkWithDelay = function ($links) {
        $links.each(function(){
            var $link = $(this);

            //track on click
            $link.click(function (evt) {
                //cancel exit
                evt.preventDefault();

                //track click
                $$.fn.stats.track({
                    pageSegment: $link.attr("data-track-with-delay")
                });

                //forward after delay
                setTimeout(function () {
                    document.location = $link.attr("href");
                }, 300);
            });
        });
    };
    // ----------------------------------------
    // Cramster error logging
    // ----------------------------------------
    /**
    * Logs client side errors
    * @public
    * @param {Object} error - Error object with details
    */
    $$.fn.error.log = function (error) {
        //defaults
        error = $.extend({
            type: "generic"
        }, error);

        var errorDetails = "/error/" + escape(error.type) + "/" + escape(error.details);

        //log these to splunk so we can alert on them
        //Temporarily disable
        /*
        $.post("/logging/logger.ashx", {
            l: "warn",
            d: errorDetails
        });
        */
    };
    /**
    * Auto-log JS errors
    * @public
    */
    $$.fn.error.logJsErrors = function () {
        //listen to error event
        window.onerror = function(error, url, line){
            //hide errors not from our domain
            if (url.match(/^https?:\/\/.*\.cramster\.com\//) == null) return true;

            var errorDetails = "?path=" + escape(url) + "&msg=" + escape(error) + "&line=" + line;

            $$.fn.error.log({
                type: "js",
                details: errorDetails
            });
        };
    };

    $$.fn.formatCurrency = function(price) {
        price = price.toString();
        var aMoney;
        if (price.indexOf('.') < 0) {
            return price + '.00';
        } else {
            aMoney = price.split('.');
            if (aMoney[1].length > 2) {
                aMoney[1] = aMoney[1].substring(0, 2);
            } 
            while (aMoney[1].length != 2) {
                aMoney[1] = aMoney[1] + '0';    
            }
            return aMoney.join('.');
        }
    };

    $$.fn.testEnterKey = function (evt, name1) {
        if ((evt.keyCode || evt.charCode) == 13) {
            document.getElementById(name1).click();
            return false;
        }
    };

    $$.fn.preLoadPromo = function(promoId, cb) {
        $.get(Cramster.urls.style + "Promotions/" + promoId + ".css", function(css) {
            $('<style type="text/css"></style>').html(css).appendTo("head");
        });
        $.getScript(Cramster.urls.root + "Javascript/Promotions/" + promoId + ".js", cb);
    }; 
    
    // ----------------------------------------
    // Cramster util
    // ----------------------------------------
    /**
     * Load Facebook JS SDK asynchronously
     * @link developers.facebook.com/docs/reference/javascript
     * @param opt {Object} custom params
     */
    $$.fn.loadFacebook = function(opt){
        var $script;
        opt = $.extend(true, {}, $$.fn.loadFacebook.defaults, opt);
        if (window.FB) {
            return;
        }
        window.fbAsyncInit = function(){
            FB.init(opt.fbInit);
            opt.onFbInit();
        };
        $script = $('<script>').attr({
            async: true,
            src: document.location.protocol+'//connect.facebook.net/en_US/all.js'
        });
        $('#fb-root').append($script);
    };
    /** @static defaults {Object} default params */
    $$.fn.loadFacebook.defaults = {
        fbInit: {
            appId: 211080555581829,
            status: true,
            cookie: true,
            xfbml: true
        },
        onFbInit: function(){}
    };

    $$.fn.parseQueryString = function(){
        var result = {}, queryString = location.search.substring(1),
                re = /([^&=]+)=([^&]*)/g, m;

        while (m = re.exec(queryString)) {
            if (typeof result[decodeURIComponent(m[1])] == 'undefined'){
                result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            } else {
                if (typeof result[decodeURIComponent(m[1])] == 'string'){
                    result[decodeURIComponent(m[1])] = [result[decodeURIComponent(m[1])]];
                }
                result[decodeURIComponent(m[1])].push(decodeURIComponent(m[2]))
            }
        }

        return result;
    };
  
    // ----------------------------------------
    // jQuery utility plugins (non-chainable)
    // ----------------------------------------
    /**
    * @public
    * @param {mixed}
    * @returns {int}
    */
    $.fn.cssInt = function (property) {
        var nInt = parseInt(this.css(property), 10);
        return nInt;
    };
    /**
    * @public
    * @param {bool}
    * @param {float|int}
    */
    $.fn.number = function (doFloat) {
        return doFloat !== undefined ? parseFloat(this.text()) : parseInt(this.text(), 10);
    };
    /**
    * @public
    * @param {string}
    * @return {bool}
    */
    $.fn.isFieldFilled = function (sAttribute) {
        sAttribute = sAttribute || "placeholder";
        return this.val() !== "" && (!this.attr(sAttribute) || this.val() !== this.attr(sAttribute));
    }; // requires <input>

    // ----------------------------------------
    // jQuery utility plugins (chainable)
    // ----------------------------------------
    /**
    * Shorthand for css padding
    * @public
    * @public
    */
    $.fn.cssSetAllPadding = function (top, right, bottom, left) {
        return this.css({
            paddingTop: top + "px",
            paddingRight: right + "px",
            paddingBottom: bottom + "px",
            paddingLeft: left + "px"
        });
    };
    /**
    * Copy a set of element's css to another
    * @public
    * @param {jQuery object}
    * @param {object}
    * @returns {jQuery object}
    */
    $.fn.cssCopy = function ($elm, properties) {
        for (var i = 0; i < properties.length; i++) {
            this.css(properties[i], $elm.css(properties[i]));
        }
        return this;
    };
    /**
    * Shows a pre-hidden element based on class
    * @public
    * @param {string}
    * @returns {jQuery object}
    */
    $.fn.cssShow = function (className) {
        className = className || "hidden";
        this.show().removeClass(className);
        return this;
    };
    /**
    * Adds a class to on element on hover
    * @public
    * @param {string}
    * @returns {jQuery object}
    */
    $.fn.cssHover = function (className) {
        className = className || "hover";
        this.each(function () {
            var $elm = $(this);
            $elm.bind("mouseenter", function () {
                $elm.not("." + className).addClass(className);
            }).bind("mouseleave", function () {
                $elm.filter("." + className).removeClass(className);
            });
        });
        return this;
    };
    /**
    * Disables/enables a form element and adds a class to its container
    * @public
    * @param {string}
    * @param {bool}
    * @returns {jQuery object}
    */
    $.fn.cssDisable = function (parentSelector, enable) {
        parentSelector = parentSelector || "";
        enable = enable || false;
        var $parent = this.parents(parentSelector + ":eq(0)");
        if (enable) {
            $parent.filter(".disabled").toggleClass("disabled", false);
            this.removeAttr("disabled");
        } else {
            $parent.not(".disabled").toggleClass("disabled", true);
            this.attr("disabled", true);
        }
        return this;
    };
    /**
    * @public
    * @param {string}
    * @returns {jQuery object}
    */
    $.fn.cssEnable = function (parentSelector) {
        return this.cssDisable(parentSelector, true);
    };
    $.fn.log = function (value) {
        $.log(value);
    };
    $.log = function (value) {
        if (window.console && window.console.log) {
            console.log(value);
            return value;
        }
        else {
            return false;
        }
    };
    /**
     * Removes node if empty or has whitespace
     * @returns {jQuery object}
     */
    $.fn.removeIfEmpty = function () {
        return this.filter(function(){
            return $.trim($(this).html()) === '';
        }).remove();
    };

    // ----------------------------------------
    // jQuery form plugins
    // ----------------------------------------
    /**
    * Loops through a set of fields and sets the placeholder text based on the `placeholder` attribute
    * Supports <input type="text">, <select>, <textarea>
    * 1.3.2 compatible
    * Progressively enhanced
    * @public
    * @param {string} attribute
    * @returns {jQuery object}
    * @todo Refactor, add support for form submission
    */
    $.fn.fieldPlaceholder = function (attribute) {
        // browser already has native placeholder support, doesn't need our mangling
        if (window.Modernizr && Modernizr.input.placeholder) {
            return;
        }
        attribute = attribute || "placeholder";
        this.each(function () {
            var $field = $(this);
            placeholder = $field.attr(attribute);
            if ($field.is("input:text")) {
                $field.val(placeholder)
                    .focus(function (evt) {
                        if ($field.val() === $field.attr("placeholder")) {
                            $field.val("");
                        }
                    }).blur(function (evt) {
                        if ($field.val().length === 0) {
                            $field.val($field.attr("placeholder"));
                        }
                    });
            } else if ($field.is("select")) {
                $field.prepend(
                    $("<option/>").text(placeholder)
                        .attr("selected", true).val("")
                        .val("")
                    );
            } else if ($field.is("textarea")) {
                $field.text(placeholder)
                    .focus(function (evt) {
                        if ($field.text() === $field.attr("placeholder")) {
                            $field.text("");
                        }
                    }).blur(function (evt) {
                        if ($field.text().length === 0) {
                            $field.text($field.attr("placeholder"));
                        }
                    });
            }
        });
        return this;
    };
    /**
    * @public
    * @returns {object} data
    */
    $.fn.mapForm = function (options) {
        var opt = $.extend({
        }, options);
        return $.toObject(
            this.find("input, textarea, select").map(function () {
                var $field = $(this);
                if ($field.is("input[value]:radio:not(:checked), input[value]:checkbox:not(:checked)")) {
                    return;
                }
                return $field.attr("name");
            }).get(),
            this.find("input, textarea, select").map(function () {
                var $field = $(this),
                    hasValue = ($field.val().length > 0);
                if ($field.is("input")) {
                    if ($field.is("input:text, input:password, input[type='hidden']")) {
                        return $field.val();
                    } else if ($field.is("input:radio, input:checkbox")) {
                        if ($field.is(":checked")) {
                            if (hasValue) {
                                return $field.val();
                            }
                            return true;
                        } else {
                            if (hasValue) {
                                return;
                            }
                            return false;
                        }
                    }
                } else if ($field.is("textarea")) {
                    return $field.val();
                } else if ($field.is("select")) {
                    return $("option:selected", $field).val();
                }
            }).get()
        );
    };
    $.fn.mapOptions = function () {
        return this.map(function () {
            var $option, data;
            $option = $(this);
            data = {
                value: $option.attr("value"),
                selected: $option.is(":selected"),
                text: $option.text()
            };
            return data;
        });
    };
    /**
    * Takes standard html <select><optgroup><option/></optgroup></select>
    * and creates a new interface, while preserving the functionality of the dropdown
    * Supports 2-levels <optgroup> and 3-levels <optgroup data-root-group="x">
    * 1.3.2 compatible
    * @public
    * @param {object} options
    * @requires Cramster.templates.elements
    * @requires jQuery.fn.cssHover
    * @requires jQuery.fn.initTabbedPanes
    * @returns {jQuery object}
    * @see Cramster.fn.ui.fullSubjectSelector
    * @todo Refactor data gathering using jQuery.map
    */
    $.fn.fauxDropdown = function (options) {
        // params
        var opt = $.extend(true, {
            positionAdjustment: { top: 0, left: 0 },
            align: "left",
            template: "fauxDropdownL2",
            perRow: 5, // optional
            boxSettings: {
                classAttr: ""
            }
            // tabsSettings
            // customOptGroup
        }, options),
        // plugin globals
                $dropdown = $(this), // original select
                $newBoxArrow = $("<span class='aside_right tiny_icon'>&nbsp;</span>"),
                $newBox = $("<div class='faux_dropdown_box textbox text1 aside_container " + opt.boxSettings.classAttr + "' />"), // new <select> field
                $newBoxValue = $("<span class='dropdown_box_value'></span>").text($dropdown.find(".placeholder").text()),
                $newMenu,
                $selected = $dropdown.find("option:selected");
        $newBox.append($newBoxValue).append($newBoxArrow);
        // saved state
        if ($selected.length > 0) {
            $newBoxValue.text($selected.text());
        }
        // show new box
        $dropdown.after($newBox);
        $dropdown.not(".invisible").toggleClass("invisible", true);
        // #Temp check
        if ($("option", $dropdown).length <= 2) {
            return;
        }
        // get template for new <select> menu
        /**
        * Scoped procedures for template loading and hydration
        * @inner
        */
        (function () {
            var templateData, optgroupMapper,
                    position, $positionContext, $options;
            /**
            * Callback to get template data from <optgroup>
            * Uses some recursion tricks to simulate nested <optgroup>
            * Also supports custom singular <optgroup> content
            * @inner
            */
            optgroupMapper = function () {
                var $optgroup, data;
                $optgroup = $(this);
                data = {};
                if (opt.template === "fauxDropdownL2") {
                    data.label = $optgroup.attr("label");
                    data.options = $optgroup.children("option").mapOptions().get();
                } else if (opt.template === "fauxDropdownL3") {
                    if ($optgroup.filter("[data-root-mapped]").length === 0) {
                        data.label = $optgroup.attr("data-root-group");
                        data.classAttr = data.label.toLowerCase() + "_boards";
                        // now that we've mapped root-group data, set marker and map this set of optgroups
                        data.optgroups = $optgroup.siblings("[data-root-group='" + data.label + "']").andSelf()
                                .attr("data-root-mapped", true).map(optgroupMapper);
                    } else if (!$optgroup.data("mapped")) { // #bugfix for remapping
                        $optgroup.data("mapped", true);
                        data.label = $optgroup.attr("label");
                        data.options = $optgroup.children("option").mapOptions().get();
                    } else {
                        data = null;
                    }
                    // add-in for custom optgroup
                    if (opt.customOptgroup !== undefined && data !== null &&
                            opt.customOptgroup.name == data.label && data.optgroups.length === 1
                        ) {
                        data.hasCustomContent = true;
                        data.optgroups[0].content = opt.customOptgroup.content;
                        $.each(data.optgroups[0].options, function (idx, val) {
                            data.optgroups[0].options[idx] = $.extend({}, opt.customOptgroup.options[idx], val);
                        });
                    }
                }
                return data;
            };
            templateData = {
                contents: $dropdown.children("optgroup").map(optgroupMapper).get(),
                id: $dropdown.attr("id") + "Enhanced",
                perRow: opt.perRow,
                selectedValue: $selected.val()
            };
            if (opt.template === "fauxDropdownL3") {
                templateData.tabs = opt.tabsSettings || {};
            }
            $newMenu = $($$.templates.elements[opt.template](templateData));
            // draw, update, and hide new menu
            $$.cache.$overlay.append($newMenu);
            if (opt.template === "fauxDropdownL2") {
                $newMenu.createEqualColumns(true);
            } else if (opt.template === "fauxDropdownL3") {
                // initialize tabs
                $("ul [data-pane='" + $(".faux_dropdown_menu:has(.option.selected)", $newMenu).attr("id") + "']", $newMenu)
                        .toggleClass("current", true);
                $("ul:has([data-pane])", $newMenu)
                        .bind("change.tabs", function () {
                            $(".faux_dropdown_menu:visible", $newMenu).createEqualColumns(true);
                        }).initTabbedPanes($newMenu);
            }
            $newMenu.toggleClass("hidden", true);
            // set position
            $positionContext = $newBox.is(".contained") === true ? $newBox.parent() : $newBox;
            $positionContext.cssHover("faux_dropdown_box_hover");
            position = {
                top: ($positionContext.offset().top + $positionContext.outerHeight()) + opt.positionAdjustment.top + "px",
                left: undefined
            };
            switch (opt.align) {
                case "left":
                    position.left = $positionContext.offset().left +
                            opt.positionAdjustment.left;
                    break; case "right":
                    position.left = ($positionContext.offset().left +
                            $positionContext.outerWidth()) + opt.positionAdjustment.left;
                    break; case "center":
                    position.left = ($positionContext.offset().left +
                        ($positionContext.outerWidth() - $newMenu.outerWidth()) / 2) + opt.positionAdjustment.left;
                    break;
            }
            position.left += "px";
            $newMenu.css(position);
            // mirror true <select> functionality
            $(".option", $newMenu).each(function () {
                var $option = $(this);
                $("a", $option).bind("click", function (evt) {
                    // plumbing
                    evt.preventDefault();
                    $dropdown.trigger("change", [
                            $("input[name='option'][type='hidden']", $option).val(),
                            $("input[name='optgroup'][type='hidden']", $option).val()
                        ]);
                    $newBox.trigger("click");
                    // usability
                    $(".option.selected", $newMenu).toggleClass("selected", false);
                    $option.toggleClass("selected", true);
                });
            });
        })();
        if (opt.align === "right") {
            $newMenu.css("marginLeft", -$newMenu.width() + "px");
        }
        // link with original <select>
        $dropdown.bind("change", function (evt, index, group_index) {
            group_index = group_index || false;
            var optionSelector = "option:eq(" + index + ")";
            if (group_index !== undefined) {
                group_index = group_index.split("-");
                optionSelector = ((opt.template === "fauxDropdownL3") ?
                        "optgroup[data-root-group='" + group_index[0] + "']:eq(" + group_index[1] + ") " :
                        "optgroup:eq(" + group_index[0] + ") "
                        ) + optionSelector;
            }
            $newBoxValue.text($(optionSelector, $dropdown).attr("selected", true).text());
        });
        // link with new <select>
        $newBox.add($newBoxValue).add($newBoxArrow).bind("click", function (evt) {
            $newMenu.toggleClass("hidden");
            return false;
        });
        // close by clicking outside
        $("body").bind("click", function (evt) {
            if ($newMenu.hasClass("hidden")) {
                return;
            }
            var $target = $(evt.target);
            if ($target.parents(".page_overlay").length === 0 && $target.is(":not(.faux_dropdown_box)")) {
                $newMenu.toggleClass("hidden", true);
            }
        });
        // init
        $(".option.selected", $newMenu).click();

        return this;
    };

    /**
    * Takes standard html <input type="radio">
    * and creates a new interface, while preserving the functionality of the radio fieldset
    * 1.3.2 compatible
    * @public
    * @deprecated Use $.fn.initFauxOptions instead
    * @returns {jQuery object}
    */
    $.fn.enhanceRadioMenu = function () {
        var $menu, $radios;
        $menu = $(this);
        $radios = $(":radio", $menu);
        if ($radios.length > 0) {
            //debugger;
            $radios.filter(":checked").parents("li").toggleClass("current", true);
        }
        $(".tab_button", $menu).bind("click", function (evt) {
            var $button = $(this);
            $("li", $menu).toggleClass("current", false);
            $radios.removeAttr("checked");
            $button.parents("li:eq(0)").toggleClass("current", true)
                    .end().siblings("input:radio").attr("checked", "checked");
        });
    };

    // ----------------------------------------
    // jQuery ui plugins
    // ----------------------------------------
    /**
    * Sets the progress area of the generic progress bar and
    * updates the classes so it can work with pill-shaped bars
    * 1.3.2 compatible
    * @public
    * @returns {jQuery object}
    */
    $.fn.initProgressBar = function () {
        var progress = parseInt($(".number", this).text(), 10);
        switch (true) {
            case progress > 0 && progress < 100:
                this.addClass("some_progress");
                break;
            case progress <= 0:
                progress = 0;
                this.addClass("no_progress");
                break;
            case progress >= 100:
                progress = 100;
                this.addClass("full_progress");
                break;
        }
        progress /= 100;
        progress *= $(".sliding_door_interior", this).cssInt("width");
        $(".progress_bar_fill", this).css("width", progress + "px");
        return this;
    };
    /**
    * Mimicking ideal native core browser support of tabs
    * Offers option of returning basic, loosely-coupled API
    * 1.3.2 compatible
    * @public
    * @returns {jQuery object | object}
    */
    $.fn.initTabbedPanes = function ($paneContext, api) {
        $paneContext = $paneContext || $$.cache.$body;
        api = api || false;
        var $tabs, $panes, getSelectedPane, updatePanes, setHandlers;
        $tabs = this;
        $panes = $("[id*='Pane']", $paneContext);
        /**
        * @private
        */
        getSelectedPane = function () {
            return $("#" + $(".current", $tabs).attr("data-pane"), $paneContext);
        };
        /**
        * @private
        */
        getSelectedTab = function (evt) {
            return $(evt.target).parents("[data-pane]:eq(0)");
        };
        /**
        * @private
        */
        updatePanes = function () {
            $panes.hide();
            getSelectedPane().show();
        };
        /**
        * Event bubbles up to tabs container
        * @private
        */
        setHandlers = function () {
            $tabs.bind("click.tabs", function (evt) {
                var $tab = getSelectedTab(evt);
                if ($tab.length === 0) {
                    return;
                }
                $tab.trigger("change.tabs");
                if ($tab.is("a")) {
                    evt.preventDefault();
                }
            });
            $tabs.bind("change.tabs", function (evt) {
                // debugger;
                $tabs.find("[data-pane]").toggleClass("current", false);
                $(evt.target).toggleClass("current", true);
                updatePanes();
            });
        };
        /**
        * @private
        */
        refreshView = function () {
            if ($tabs.find(".current[data-pane]").length === 0) {
                $tabs.find("[data-pane]:eq(0)").toggleClass("current", true);
            }
            $tabs.find(".current[data-pane]").trigger("change.tabs");
        };
        if (api !== false) {
            return {
                'getSelectedPane': getSelectedPane,
                'getSelectedTab': getSelectedTab,
                'updatePanes': updatePanes,
                'setHandlers': setHandlers,
                'refreshView': refreshView
            };
        } else {
            setHandlers();
            refreshView();
            return this;
        }
    };
    // ----------------------------------------
    // jQuery equal-columned grid plugins
    // ----------------------------------------
    /**
    * Low-level function to take a group of elements and set them all equally tall
    * @public
    * @param {object} options
    * @returns {jQuery object}
    */
    $.fn.cssEqualHeight = function (options) {
        var opt = $.extend({
            minHeight: false,
            maxHeight: false,
            updateHeight: false
        }, options || {}),
            theHeight, height, $columns, $theColumn;
        $columns = $(this);
        // onReady event has passed
        theHeight = (opt.minHeight !== false) ? parseInt(opt.minHeight, 10) : 0;
        $columns.each(function () {
            var $column = $(this);
            if (opt.updateHeight) {
                $column.css({
                    "height": "auto",
                    "minHeight": 0
                });
                // debugger;
            }
            height = $column.outerHeight();
            theHeight = Math.max(height, theHeight);
            if (theHeight === height) {
                $theColumn = $column;
            }
        });
        theHeight = (opt.maxHeight !== false) ? parseInt(opt.maxHeight, 10) : theHeight;
        $columns.each(function () {
            var $column = $(this);
            // set in relation to individual padding
            height = theHeight -
                    (parseInt($column.css("paddingTop"), 10) +
                        parseInt($column.css("paddingBottom"), 10));
            // note: border-widths are excluded, they don't show in IE
            if (height > 0 && $theColumn !== $column) {
                $column.css("minHeight", height + "px");
            }
        });
        return this;
    };
    /**
    * Update wrapping .equal_column grids
    * Use this only when absolutely necessary. Better to activate and trigger events that bubble up the DOM.
    * @public
    * @returns {jQuery object}
    */
    $.fn.cssUpdateEqualHeight = function () {
        this.filter(".equal_columns")
                .parents(".equal_columns").each(function () {
                    $(this).children(">div, >[class*='column_'], >td>[class*='column_'], >*>.column_line")
                        .cssEqualHeight({ updateHeight: true });
                }).end()
                .children(">div, >[class*='column_'], >td>[class*='column_'], >*>.column_line")
                    .cssEqualHeight({ updateHeight: true });
        return this;
    };
    /**
    * High level function to activate .equal_columns
    * Binds a handler to catch `columnResized` events bubbling up the DOM
    * @public
    * @param {bool} find
    * @returns {jQuery object}
    */
    $.fn.createEqualColumns = function (find) {
        find = find || false;
        var $elems = (find !== false) ? this.find(".equal_columns") : this;
        if (find && $elems.length === 0) {
            return this;
        }
        var $foldLine = $(".page_fold_line");
        $elems.each(function () {
            var $columns, $elm;
            $columns = $(this).find(">div, >[class*='column_'], >td>[class*='column_'], >*>.column_line");
            $columns.cssEqualHeight();
            $columns.each(function () {
                $(this).bind("columnResized", function () {
                    $columns.css({
                        "height": "auto",
                        "minHeight": 0
                    }).cssEqualHeight({ updateHeight: true });
                    // #HACK
                    $foldLine.css({
                        "zoom": 1,
                        "marginBottom": 0
                    }).hide().show();
                });
            });
        });
        return this;
    };
    // ----------------------------------------
    // jQuery text plugins
    // ----------------------------------------
    /**
    * Animates a number element's content
    * Supports large increments
    * Supports jQuery.easing
    * 1.3.2 compatible
    * @public
    * @returns {jQuery object}
    * @todo Refine jQuery.easing support
    */
    $.fn.animateNumber = function (options) {
        var opt = $.extend({
            change: 0,
            direction: 1,
            unitDuration: 50, // ms
            changeBuffer: 1 / 3,
            duration: 500,
            intervalDuration: 25,
            easing: null,
            complete: function () { }
        }, options);
        var $counter, start, current, goal, intervals, increment, timer, i, t, d;
        $counter = this;
        start = current = parseInt($counter.text(), 10);
        goal = current + opt.direction * opt.change;
        if (typeof opt.unitDuration === "number") {
            opt.duration = parseInt(Math.pow(opt.change, opt.changeBuffer) * opt.unitDuration, 10);
        }
        intervals = opt.duration / opt.intervalDuration;
        increment = goal / intervals;
        i = 0;
        timer = setInterval(function () {
            t = i * opt.intervalDuration;
            d = typeof opt.easing === "string" ?
                    Math.abs($.easing[opt.easing](t / opt.duration, t, 0, increment, opt.duration)) :
                    increment;
            i++;
            if (opt.direction === 1 && current < goal) {
                current += d;
                current = Math.min(current, goal);
                $counter.text(parseInt(current, 10));
            } else if (opt.direction === -1 && current > goal) {
                current -= d;
                current = Math.max(current, goal);
                $counter.text(parseInt(current, 10));
            } else if (i >= intervals) {
                clearInterval(timer);
                opt.complete();
                return;
            }
        }, opt.intervalDuration);
        return this;
    };
    /**
    * Plugin for changing text urls into html links
    * @param {plain object}
    * @returns {jQuery object}
    */
    $.fn.autoLink = function (options) {
        var opt = $.extend({}, {
            classAttr: 'base-link-text'
        }, options),
            html = this.html();
        html = html.replace(/(http:\/\/[^\s]+)/ig,
            '<a class="' + opt.classAttr + '" href="$1">$1</a>');
        this.html(html);
        return this;
    };
    // ----------------------------------------
    // jQuery event plugins
    // ----------------------------------------
    /**
    * jQuery plugin set for monitoring dom properties
    * comes with its own sample custom event {@link jQuery.event.special.valuechange}
    * @public
    * @param {string} id FieldName to watch
    * @param {function} fn Callback function
    * @author james padolsey
    * @returns {jQuery object} this
    */
    $.fn.watch = function (id, fn) {
        this.each(function () {
            var self = this;
            var oldVal = self[id];
            $(self).data(
                    'watch_timer',
                    setInterval(function () {
                        if (self[id] !== oldVal) {
                            fn.call(self, id, oldVal, self[id]);
                            oldVal = self[id];
                        }
                    }, 100)
                );
        });
        return self;
    };
    $.fn.unwatch = function (id) {
        return this.each(function () {
            clearInterval($(this).data('watch_timer'));
        });
    };
    $.event.special.valuechange = {
        setup: function () {
            var $this = $(this);
            $this.watch(($this.is("input, textarea") ? "value" : "textContent"), function (propName, oldVal, newVal) {
                $.event.handle.call(this, { type: "valuechange" });
            });
        },
        teardown: function () {
            var $this = $(this);
            $this.unwatch($this.is("input, textarea") ? "value" : "textContent");
        }
    };

    // ----------------------------------------
    // jQuery utility functions
    // ----------------------------------------
    /**
    * @public
    */
    $.camelCaseToUnderscore = function (str) {
        return str.replace(/[A-Z]/g,
                    function ($1) {
                        return "_" + $1.toLowerCase();
                    }
                );
    };
    /**
    * @public
    */
    $.capitalize = function (str) {
        return str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    };
    /**
    * @public
    * @todo Checking
    */
    $.boundNumber = function (n, min, max, toroidal) {
        if (toroidal) {
            if (n < min) {
                return max;
            } else if (n > max) {
                return min;
            } else {
                return n;
            }
        } else {
            return Math.max(min, Math.min(max, n));
        }
    };
    /**
    * @public
    * @link http://phpjs.org
    * FROZEN
    */
    $.formatThousands = function (number, decimals, decPoint, thousandsSep) {
        var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };
    /**
    * Implementation of $.formatThousands for JSON objects
    * @public
    * @param arr {array} Collection of objects
    * FROZEN
    */
    $.massFormatThousands = function (arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
            for (var k in arr[i]) {
                if (!isFinite(arr[i][k])) {
                    continue;
                }
                arr[i][k] = $.formatThousands(arr[i][k]);
            }
        }
        return arr;
    };
    $.toObject = function (keys, values) {
        var result = {};
        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = values[i];
        }
        return result;
    };

    // ----------------------------------------
    // Selected jQuery 1.4 fillers for jQuery 1.3
    // ----------------------------------------
    /**
    * @public
    */
    if ($.isEmptyObject === undefined) {
        $.isEmptyObject = function (obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        };
    }
    if ($.fn.unwrap === undefined) {
        $.fn.unwrap = function () {
            this.parent(":not(html,head,body)").not(document)
                    .each(function () {
                        $(this).replaceWith(this.childNodes);
                    });
            return this;
        };
    }
    if ($.fn.delegate === undefined) {
        $.fn.delegate = function (selector, types, data, fn) {
            return this.live(types, data, fn, selector);
        };
        $.fn.undelegate = function (selector, types, fn) {
            if (arguments.length === 0) {
                return this.unbind("live");
            } else {
                return this.die(types, null, fn, selector);
            }
        };
    }
    // ----------------------------------------
    // jQuery core extensions
    // ----------------------------------------
    /**
    * Easing equations forked from http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
    * only the practical ones
    * x: t/d, t: current time, b: beginning value, c: change in value, d: duration
    */
    $.easing.jswing = $.easing.swing;
    $.extend($.easing, {
        def: "easeOutQuad",
        swing: function (x, t, b, c, d) {
            return $.easing[$.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    });
    /**
    * Background position animation
    * @author Alexander Farkas
    * @version 1.21
    */
    (function () {
        if (!document.defaultView || !document.defaultView.getComputedStyle) { // IE6-IE8
            var oldCurCSS = jQuery.curCSS;
            jQuery.curCSS = function (elem, name, force) {
                if (name === 'background-position') {
                    name = 'backgroundPosition';
                }
                if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
                    return oldCurCSS.apply(this, arguments);
                }
                var style = elem.style;
                if (!force && style && style[name]) {
                    return style[name];
                }
                return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
            };
        }
        var oldAnim = $.fn.animate;
        $.fn.animate = function (prop) {
            if ('background-position' in prop) {
                prop.backgroundPosition = prop['background-position'];
                delete prop['background-position'];
            }
            if ('backgroundPosition' in prop) {
                prop.backgroundPosition = '(' + prop.backgroundPosition;
            }
            return oldAnim.apply(this, arguments);
        };
        function toArray(strg) {
            strg = strg.replace(/left|top/g, '0px');
            strg = strg.replace(/right|bottom/g, '100%');
            strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
            var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
            return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
        }
        $.fx.step.backgroundPosition = function (fx) {
            if (!fx.bgPosReady) {
                var start = $.curCSS(fx.elem, 'backgroundPosition');
                if (!start) {//FF2 no inline-style fallback
                    start = '0px 0px';
                }
                start = toArray(start);
                fx.start = [start[0], start[2]];
                var end = toArray(fx.options.curAnim.backgroundPosition);
                fx.end = [end[0], end[2]];
                fx.unit = [end[1], end[3]];
                fx.bgPosReady = true;
            }
            //return;
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
            fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];
        };
    })();
    /**
    * Fix jQuery.fn.is() so that class attributes can contain garbage whitespace
    * @returns {bool}
    */
    $.fn.oldIs = $.fn.is;
    $.fn.is = function (selector) {
        if (this.oldIs('[class]')) {
            this.attr('class', this.attr('class').replace(/\s{2,}/g, ' '));
        }
        return this.oldIs(selector);
    };

    // ----------------------------------------
    // lock
    // ----------------------------------------
    /**
    * Generic locking mechanism for functions to identify that the function has a lock
    * @public
    */
	$$.fn.lock = function() {
		var signature = arguments.callee.caller.toString();
		for (i=0;i<Cramster.lockQueue.length;i++) {
			if (Cramster.lockQueue[i] === signature) {
				return;
			}
		}
		Cramster.lockQueue.push(signature);
    };
    
	$$.fn.isLocked = function() {
		var signature = arguments.callee.caller.toString();
		for (i=0;i<Cramster.lockQueue.length;i++) {
			if (Cramster.lockQueue[i] === signature) {
				return true;
			}
		}
		return false;
    };
    
	$$.fn.unlock = function() {
		var signature = arguments.callee.caller.toString();
		for (i=0;i<Cramster.lockQueue.length;i++) {
			if (Cramster.lockQueue[i] === signature) {
				Cramster.lockQueue.splice(i, 1);
				return;
			}
		}
    };
    
    // ----------------------------------------
    // namespace
    // ----------------------------------------
    /**
    * Dynamically create a namespace/object without blowing away pre-existing ones
    * @public
    */
    $$.fn.namespace=function() {
        var A=arguments,E=null,C,B,D;
        for(C=0;C<A.length;C=C+1) {
            D=(""+A[C]).split(".");
            E=Cramster;
            for( B=(D[0]=="Cramster")?1:0;B<D.length;B=B+1) {
                E[D[B]]=E[D[B]]||{};
                E=E[D[B]];
            }
        }
        return E;
    };


    // ----------------------------------------
    // Bookmarks
    // ----------------------------------------
    /**
    * Bind a bookmarks on the page to submit data via ajax
    * @public
    */
    $$.fn.bookmark.bindBookmark = function () {
        var $bookmark, $bookmarkType, $objectId;
        // does not bind bookmarks which are marked as disabled
        $bookmark = $(this).not(":.disabled");
        if ($bookmark.length === 0) {
            return;
        }
        // pulls data from custom attributes
        $bookmarkType = $bookmark.attr("data-bookmark-type");
        $objectId = $bookmark.attr("data-bookmark-id");
        // binding for each bookmark
        $bookmark.bind("click", function (evt) {
            $$.fn.bookmark.createBookmark($bookmark, $objectId, $bookmarkType);
        });
    };
    /**
    * Calls bookmarkservice to create the bookmark
    * @private
    */
    $$.fn.bookmark.createBookmark = function ($bookmark, fileId, type) {
        // generate data
        if (fileId !== undefined) {
            var apiData = {
                fileId: fileId,
                type: type
            };
            // json call
            $.getJSON("/api/1.0/json/user/BookmarkCreate", apiData, function (json) {
                // change text
                $(".bookmark_text", $bookmark).text("Bookmarked!");
                // unbind so user doesnt attempt to make multiple calls
                $bookmark.unbind();
            });
        }
    };
    // ----------------------------------------
    // On every page load
    // ----------------------------------------
    $(document).ready(function () {
        // ----------------------------------------
        // Compatibility
        // ----------------------------------------
        var $body = $("body");
        $body.not(".cramster_1").toggleClass("cramster_1",
                !$body.hasClass("cramster_2")
            ).end()
            .not(".compact_page").toggleClass("compact_page",
                ($("#divHeader .navigation").length === 0)
            )
            .attr("id", "the_page");
        // ----------------------------------------
        // Rendering-Engine-Specific CSS
        // ----------------------------------------
        $.each($.extend({}, $$.globals.renderingEngine, $$.globals.browser), function (idx, val) {
            if (val === true) {
                $("body").addClass($.camelCaseToUnderscore(idx));
            }
        });
        // ----------------------------------------
        // Cramster 2
        // ----------------------------------------
        if ($("body.cramster_2").length > 0) {
            $(".progress_bar").each(function () {
                $(this).initProgressBar();
            });
            $(".email_button").each(function () {
                $(this).bind("click", function (evt) {
                    evt.preventDefault();
                    addthis_open(this, 'email', document.title, document.title);
                });
            });
            $("a[data-type$='popup']").each(function () {
                $$.fn.modals.popup($(this));
            });
        }
        // ----------------------------------------
        // Track links with delay
        // ----------------------------------------
        $$.fn.stats.trackLinkWithDelay($("a[data-track-with-delay]"));
        // ----------------------------------------
        // Grid
        // ----------------------------------------
        $(".equal_columns").createEqualColumns();
        // ----------------------------------------
        // Helpers
        // ----------------------------------------
        $('.ui-remove-if-empty').removeIfEmpty();
        $(document).bind('listview.questions.added', function(evt){
            $('.ui-remove-if-empty').removeIfEmpty();
        });
        // ----------------------------------------
        // Placeholdered Fields
        // ----------------------------------------
        $("input[placeholder]").filter(function () {
            return !$(this).isFieldFilled();
        }).fieldPlaceholder();
        $("textarea[placeholder]").fieldPlaceholder();
        $("select[placeholder]").fieldPlaceholder();
        // ----------------------------------------
        // Selector Contexts - only work with .cramster_2
        // ----------------------------------------
        $$.cache.$overlay = $(".cramster_2 .page_overlay");
        $$.cache.$head = $(".cramster_2 .page_head, #divHeader");
        $$.cache.$body = $(".cramster_2 .page_body, .cramster_1 .container");
        $$.cache.$foot = $(".page_foot_container");
        // ----------------------------------------
        // #TEMP - Placeholder Form Fix
        // ----------------------------------------
        $(":submit", $$.cache.$body).each(function () {
            var $context = $(this).parents("form:eq(0)"),
                    $fields = $("[placeholder][value]", $context);
            $(this).click(function () {
                $fields.each(function () {
                    var $field = $(this);
                    if (!$field.isFieldFilled()) {
                        $field.val("");
                    }
                });
            });
        });
        // ----------------------------------------
        // #TEMP - Bookmarks
        // ----------------------------------------
        $("a.bookmark_button").each($$.fn.bookmark.bindBookmark);
        $("#txtSearch").bind("keypress", function (e) {
            var $this = $(this);

            //capture enter key to redirect search
            if (e.keyCode && e.keyCode == 13) {
                //TODO: when we upgrade to jQuery 1.4.3 we won't have to access data attributes with attr anymore, just data
                var url = $this.attr("data-search-url") + encodeURI($(this).val());
                window.location.href = url;
                e.preventDefault();
            }
        });
        // ----------------------------------------
        // On-error Logging
        // ----------------------------------------
        $$.fn.error.logJsErrors();
        // ----------------------------------------
        // Navigation Dropdown Menu (for 'more!' tab)
        // ----------------------------------------
        if ($("#divHeader .navigation").length > 0) {
            $("#divHeader .navigation .secondary_menu_container")
                .bind("mouseenter mouseleave", function (evt) {
                    var $trigger = $(this),
                        $menu = $(".secondary_menu", $trigger),
                        $tab = $(">a", $trigger),
                        browser = $$.globals.browser,
                        fnToggle = (evt.type === "mouseenter") ? "show" : "hide",
                        fnClass = (evt.type === "mouseenter") ? "addClass" : "removeClass";
                    if (browser.isLteIe7) {
                        var $container = $("body"),
                            $floatingMenu = $(">.floating_secondary_menu:hidden", $container);
                        if ($floatingMenu.length === 0) { // do menu fix
                            $container.append($menu)
                                .find(">.secondary_menu").css($trigger.offset())
                                    .css("marginTop", $trigger.outerHeight())
                                    .addClass("floating_secondary_menu")
                                    .bind("mouseleave", function () {
                                        $(this).hide();
                                        $tab[fnClass]("active");
                                    }).show();
                            $tab.addClass("active");
                        } else {
                            $floatingMenu[fnToggle]();
                            $tab[fnClass]("active");
                        }
                    } else {
                        $menu[fnToggle]();
                        $tab[fnClass]("active");
                    }
                });
        }
    });

})();
