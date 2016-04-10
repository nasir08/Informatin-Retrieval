/**
 * Editor.js
 * @fileoverview Full-fledged Cramster editor module, jQuery plugin,
 *      default settings, and custom TinyMCE settings.
 * @requires jQuery 1.4.2+
 * @requires jQuery.fn.tinymce
 * @requires AjaxUpload
 * @supported So far tested in Chrome and FF latest, IE8, IE7
 */
// ----------------------------------------
// SET ALIASES, ENCAPSULATE
// ----------------------------------------
(function ($, $$) {
    // ----------------------------------------
    // NAMESPACES
    // ----------------------------------------
    $.extend(true, $$, {
        'settings': {
            'tinymce': {},
            'defaults': { 'editor': {} }
        },
        'fn': { 'editor': {} },
        'constants': { 'editor': {} },
        'modules': {},
        'data': { 'editor': { 'apiUrls': {
            'saveDraft': '/api/1.0/json/qaboard/save-draft'
        }
        }
        }
    });
    // aliases
    var S = $$.settings,
        C = $$.constants.editor,
        F = $$.fn.editor,
        M = $$.modules,
        D = $$.data.editor;
    // ----------------------------------------
    // ON PAGE LOAD
    // ----------------------------------------
    // modify module instances
    $(document).ready(function () {
        $('.editor').each(function () {
            var $this = $(this);
            $this.bind('cramster.editor.ready', function () {
                $this.trigger('cramster.columnResized');
            });
        });
    });
    // ----------------------------------------
    // CONSTANTS
    // ----------------------------------------
    C.PLAIN_EDITOR = 'plainEditor';
    C.TINY_MCE = 'tinyMCE';
    C.WRITING_TOOLS = 'writingTools';
    C.MATH_TOOLS = 'mathTools';
    C.CHEMISTRY_TOOLS = 'chemistryTools';
    /**
     * A wrapper module to manage the simple editor and tinymce, as well as
     *      future editors. Supports toggling toolbars, attaching images,
     *      word and kp counters, custom events.
     * @constructor
     * @param {!jQuery} $editor
     * @param {!Object} options
     */
    M.Editor = function ($editor, options) {

        /**
         * @property {Object} opt Final, customized module settings.
         * @see Cramster.settings.defaults.editor
         */
        this.opt = options;
        /**
         * @property {Object.<string>} sel Selectors alias.
         * @see Cramster.settings.defaults.editor
         */
        this.sel = this.opt.sel;
        /**
         * @property {Object.<string>} cls Classes alias.
         * @see Cramster.settings.defaults.editor
         */
        this.cls = this.opt.cls;
        /**
         * @property {string} mode Editor display mode alias.
         * @see Cramster.settings.defaults.editor
         */
        this.mode = this.opt.mode;

        /** @property {jQuery} $Self Root element. */
        this.$Self = $editor;

        /** @property {jQuery} $controls Top level controls to toggle toolbars, etc. */
        this.$controls = $(this.sel.controls, this.$Self);

        /** @property {jQuery} $toolbars All toolbars. */
        this.$toolbars = undefined;

        /** @property {jQuery} $toolbars All elements that trigger toolbar toggling. */
        this.$toolbarTriggers = undefined;

        /** @property {jQuery} $content Original content element. */
        this.$content = $(this.sel.content, this.$Self);

        /** @property {jQuery} $hiddenField Holds custom MCE content. */
        this.$hiddenField = $(this.sel.hiddenField);

        /** @property {jQuery} $wordCounter Updates dynamically. */
        this.$wordCounter = $(this.sel.wordCounter);

        /** @property {jQuery} $kpCounter Updates dynamically. */
        this.$kpCounter = $(this.sel.kpCounter);

        /** @property {jQuery} $editorEnabledFlag To communicate with backend. */
        this.$editorEnabledFlag = $(this.sel.editorEnabled);

        /** @property {tinymce.Editor} tinymce Related active TinyMCE instance. */
        this.tinymce = undefined;

        /** @property {number} tinymceId Base id for the TinyMCE instance, and
        id of the content element. Useful for TinyMCE commands. */
        this.tinymceId = this.$content.attr('id');

        /** @property {number} wordCount */
        this.wordCount = undefined;

        this._initControls();
        this._initContent();
    };
    M.Editor.prototype = {
        // ----------------------------------------
        // SETUP
        // ----------------------------------------
        /**
         * Binds event handlers to control buttons.
         * @protected
         */
        _initControls: function () {
            var Self = this;
            $(Self.sel.tinymceTriggers, Self.$controls).bind('click', function (evt) {
                if (Self.mode !== C.TINY_MCE) {
                    Self.loadTinyMCE(evt, function (evt) {
                        Self._handleToolbar(evt, true);
                    });
                }
                evt.preventDefault();
                evt.stopPropagation();
            });
            Self.$toolbarTriggers = $(Self.sel.toolbarTriggers, Self.$controls)
                .bind('click', function (evt) {
                    evt.preventDefault();
                    if (!Self._isTinyMCELoaded()) {
                        return;
                    }
                    Self._handleToolbar(evt);
                });
            $(Self.sel.attachImageTrigger, Self.$controls).bind('click', function (evt) {
                $$.fn.modals.load($.extend(Self.opt.imageUploadTemplate, {
                    '$trigger': $(this),
                    ready: function (overlayApi) {
                        if (!Self._isTinyMCELoaded()) {
                            Self.loadTinyMCE(evt, function (evt) {
                                Self._handleImageAttachment(overlayApi);
                            });
                        } else {
                            Self._handleImageAttachment(overlayApi);
                        }
                    }
                }));
                evt.preventDefault();
            });
        },
        /**
         * Loads the right editor.
         * @protected
         */
        _initContent: function () {
            var Self = this;
            if (Self.mode === C.TINY_MCE) {
                Self.loadTinyMCE();
            } else {
                if ($.hasHtml(Self.$content.val())) {
                    Self._changeMode(C.TINY_MCE);
                    Self.loadTinyMCE(null, function (evt) {
                        Self.toggleDefaultToolbars();
                    });
                } else {
                    Self.loadPlainEditor();
                }
            }
            // saving
            $(Self.sel.submitTrigger).bind('click', function (evt) {
                evt.preventDefault();
                Self._moveBodyToHiddenField();
            });
            Self.$Self.trigger('cramster.editor.ready');
        },
        // ----------------------------------------
        // LOADING
        // ----------------------------------------
        /**
         * Activate TinyMCE instance on content element. The main issue with
         *      TinyMCE loading is toolbars cannot be manipulated until the
         *      editor is fully loaded.
         * @param {?jQuery.Event=} evt Triggered event with trigger.
         * @param {?Function=} cb Post loading callback.
         */
        loadTinyMCE: function (evt, cb) {
            cb = cb || $.noop;
            var Self = this;
            if (!Self._isTinyMCELoaded() && !Cramster.fn.isLocked()) {
                // load should only happen once, but should be callable from multiple places, and it loads async, so lock the function
                Cramster.fn.lock();
                Self.$content.tinymce($.extend({}, S.tinymce, {
                    setup: function (editor) {
                        Self.tinymce = editor;
                        Self.tinymce.onInit.add(function (editor) {
                            // is fully initialized
                            if (!Self.$toolbars) {
                                Self.$toolbars = $(Self.sel.toolbar, Self.$Self);
                            }
                            Self.toggleAllToolbars();
                            cb(evt);
                            Self._ready();
                            $(Self).trigger('cramster.tinymceloaded');
                        });
                    }
                }));
            } else if (window.tinyMCE) {
                if (Self.opt.fullToggling) {
                    var success = tinyMCE.execCommand('mceToggleEditor', false, Self.tinymceId);
                }
            }
            else if (Cramster.fn.isLocked()) {
                // just add callback to mce init
                // need to make a closure to pass the context for this event
                $(Self).bind('cramster.tinymceloaded', (function (cb, evt) {
                    var closure = { fn: function () { arguments.callee.prototype.cb.apply(this.evt); } };
                    closure.fn.prototype = { cb: cb, evt: evt };
                    return closure.fn;
                } (cb, evt)));
            }
            Self._changeMode(C.TINY_MCE);
        },
        /**
         * Deactivate current MCE instance.
         */
        loadPlainEditor: function () {
            var Self = this;
            if (Self.mode === C.TINY_MCE && window.tinyMCE) {
                if (Self.opt.fullToggling) {
                    var success = tinyMCE.execCommand('mceToggleEditor', false, Self.tinymceId);
                }
            } else { // is fully initialized
                Self._ready();
            }
            Self._changeMode(C.PLAIN_EDITOR);
        },
        _changeMode: function (constant) {
            var Self = this;
            Self.mode = constant;
            // update the flag to change how the backend handles the content
            if (constant === C.PLAIN_EDITOR) {
                Self.$editorEnabledFlag.removeAttr('value');
            } else {
                Self.$editorEnabledFlag.val(true);
            }
        },
        _isTinyMCELoaded: function () {
            return this.tinymce ? true : false;
        },
        /**
         * Post initialization hook for all editor modes. Triggers custom event.
         */
        _ready: function () {
            var Self = this;
            // setup word counting
            if (Self._isWordCountEnabled()) {
                Self.countWords();
                Self._bindWordCounting();
                if (Self._isKpCostByWordsEnabled()) {
                    Self._updateKpCostByWords();
                    Self.$Self.bind('cramster.editor.countWords', function (evt) {
                        Self._updateKpCostByWords();
                    });
                }
            }
            Self.$Self.trigger('cramster.editor.ready');
        },
        getActiveMCE: function () {
            var Self = this;
            if (Self.mode === C.TINY_MCE) {
                return Self.tinymce;
            }
        },
        // ----------------------------------------
        // TOGGLING
        // ----------------------------------------
        /**
         * @protected
         * @param {!jQuery.Event} evt Triggered event with trigger.
         * @param {?boolean=} init Is call part of initialization process.
         */
        _handleToolbar: function (evt, init) {
            var Self = this,
                $container = $(evt.target).closest(Self.sel.buttonContainer);
            for (var constant in Self.sel.toolbars) {
                if ($container.is(Self.sel[constant])) {
                    Self.toggleToolbar(constant, init);
                    continue;
                }
            }
        },
        /**
         * Toggles toolbars and toolbar items, depending on the selector.
         * @param {string} constant Toolbar name.
         * @param {?boolean=} init Is call part of initialization process.
         */
        toggleToolbar: function (constant, init) {
            var Self = this,
                $toolbar = $(Self.sel.toolbars[constant], Self.$Self),
                $toolbarItems = $toolbar.filter(Self.sel.toolbarItem);
            $toolbar = $toolbar.not(Self.sel.toolbarItem);
            $toolbar.toggleClass('hidden')
                .find(Self.sel.toolbarItem).toggleClass('hidden');
            if ($toolbarItems.length > 0) {
                var $compoundToolbar = $toolbarItems.closest(Self.sel.toolbar);
                $toolbarItems.toggleClass('hidden');
                var $allSeparators = $(Self.sel.toolbarItemSeparator, $compoundToolbar),
                    $allToolbarItems = $(Self.sel.toolbarItem, $compoundToolbar);
                // hide toolbar if all items in it are hidden
                if ($allToolbarItems.not('.hidden').length > 0) {
                    $compoundToolbar.add($allSeparators).toggleClass('hidden', false);
                } else {
                    $compoundToolbar.add($allSeparators).toggleClass('hidden', true);
                }
            }
            if (init !== true && Self._noToolbarsLoaded()) {
                Self.loadPlainEditor();
            }
        },
        /**
         * Toggles all toolbars and toolbar items.
         */
        toggleAllToolbars: function () {
            var Self = this;
            Self.$toolbars.toggleClass('hidden')
                .find(Self.sel.toolbarItem).toggleClass('hidden');
        },
        /**
         * Toggles all default toolbars and toolbar items. This happens when the
         * MCE is triggered not by a specific toolbar trigger.
         */
        toggleDefaultToolbars: function () {
            var Self = this;
            Self.$toolbars.filter(Self.sel.defaultToolbars).toggleClass('hidden')
                .find(Self.sel.toolbarItem).toggleClass('hidden');
            Self.$toolbarTriggers.filter(Self.sel.defaultToolbarTrigger)
                .toggleClass(Self.cls.toolbarTriggerToggle);
        },
        // ----------------------------------------
        // MISC
        // ----------------------------------------
        /**
         * @protected
         */
        _noToolbarsLoaded: function () {
            var Self = this,
                result = true;
            if (Self.$toolbars) {
                Self.$toolbars.each(function () {
                    if (!$(this).hasClass('hidden')) {
                        result = false;
                    }
                });
            }
            return result;
        },
        /**
         * @requires AjaxUpload
         */
        _handleImageAttachment: function (overlayApi) {
            var Self = this,
                editor = window.tinyMCE.activeEditor;

            new AjaxUpload(document.getElementById("cmdImageUploadSubmit"), {
                'action': "/Shared/Upload/Image",
                'autoSubmit': true,
                'responseType': "text/html",
                /**
                 * @param {string} file Basename of uploaded file.
                 * @param {string} extension
                 * @todo Progress bar, cancel button.
                 */
                onSubmit: function (file, extension) {
                    $("#cmdImageUploadSubmit").addClass("hidden");
                    $("#divImageUploadProgress, #cmdImageUploadCancel").removeClass("hidden");
                },
                /**
                 * Insert into MCE, then close modal.
                 * @param {string} file Basename of uploaded file.
                 * @param {string} response Server response.
                 * @todo Success notice in modal.
                 */
                onComplete: function (file, response) {
                    editor.focus();
                    editor.selection.setContent(
                        '<img class="mceBlock" src="' + response + '" border="0" alt="uploaded image" />'
                    );

                    //resize editor on image upload
                    $(editor.contentDocument).find("img[src=" + response + "]").load(function () {
                        editor.execCommand("mceAutoResize");
                    });

                    $("#cmdImageUploadSubmit").removeClass("hidden");
                    $("#divImageUploadProgress, #cmdImageUploadCancel").addClass("hidden");
                    overlayApi.close();
                }
            });
        },
        // ----------------------------------------
        // WORD COUNTING
        // ----------------------------------------
        /**
         * @protected
         */
        _bindWordCounting: function () {
            var Self = this;
            var keyUpHandler = function (evt) {
                if (Self._isEndOfWord(evt)) {
                    Self.countWords();
                }
            };
            Self.$content.bind('keyup', keyUpHandler);
            if (Self.tinymce) {
                Self.tinymce.onKeyUp.add(function (editor, evt) { keyUpHandler(evt); });
                // on any content change
                Self.tinymce.onChange.add(function (editor, change) {
                    if ($.matchWords($.stripHtml(change.content)).length > 0) {
                        Self.countWords();
                    }
                });
            }
            // textarea is a bit broken
            Self.$content.bind('valuechange', function (evt) {
                Self.countWords();
            });
            Self.$Self.bind('cramster.editor.save', function (evt) { Self.countWords(); });
        },
        /**
         * Counts words by stripping out html and matching the rest.
         *      Triggers custom event.
         * @requires jQuery.event.special.valuechange
         */
        countWords: function () {
            var Self = this,
                text;
            if (Self.mode == C.TINY_MCE) {
                text = Self.tinymce.getContent({ 'format': 'text' });
            } else {
                text = Self.$content.val();
            }
            Self.wordCount = $.matchWords(text).length;
            Self.$wordCounter.text(Self.wordCount);
            Self.$Self.trigger('cramster.editor.countWords');
        },
        /**
         * Checks for the end of words when user is typing.
         * @param {jQuery.event.keyup} evt
         */
        _isEndOfWord: function (evt) {
            return (evt.keyCode == $$.constants.ENTER_KEY ||
                evt.keyCode == $$.constants.TAB_KEY ||
                evt.keyCode == $$.constants.SPACE_KEY);
        },
        /**
         * @protected
         */
        _isWordCountEnabled: function () {
            return (this.$wordCounter.length > 0) ? true : false;
        },
        /**
         * @protected
         */
        _isKpCostByWordsEnabled: function () {
            return (this.$kpCounter.length > 0 && D.wordCount.serviceLevels);
        },
        /**
         * Search for the right kp cost
         * @protected
         * @requires Cramster.data.editor.wordCount.serviceLevels
         */
        _updateKpCostByWords: function () {
            var Self = this,
                serviceLevels = D.wordCount.serviceLevels;
            for (var i = 0, l = serviceLevels.length; i < l; i += 1) {
                if (serviceLevels[i].WordCount > Self.wordCount) {
                    Self.$kpCounter.text(serviceLevels[i].KarmaCost);
                    return;
                }
            }
        },
        // ----------------------------------------
        // SAVING
        // ----------------------------------------
        /**
         * @protected
         */
        _moveBodyToHiddenField: function () {
            var Self = this,
                content = '';
            if (Self.mode === C.TINY_MCE) {
                content = Self.tinymce.getContent();
            } else if (Self.mode === C.PLAIN_EDITOR) {
                content = Self.$content.val();
            }
            Self.$hiddenField.val(encodeURI(content));
            Self.$Self.trigger('cramster.editor.save');
        }
    };
    // ----------------------------------------
    // UTILITY
    // ----------------------------------------
    /**
     * @param {string} str
     */
    $.hasHtml = $.hasHtml || function (str) {
        return (/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/).test(str);
    };
    /**
     * @param {string} str
     * @return {Array.<string>} matches
     */
    $.matchWords = $.matchWords || function (str) {
        var matches = str.match(/\S+/g);
        return matches ? matches : [];
    };
    /**
     * @param {string} html
     */
    $.stripHtml = $.stripHtml || function (html) {
        return $('<div/>').html(html).text();
    };

    /**
     * @var {Object<string>} Cramster.settings.defaults.editor Editor module defaults.
     * @property {string} mode
     * @property {Object<string>} imageUploadTemplate Call options.
     * @property {boolean} fullToggling
     * @property {string} cls.toolbarTriggerToggle
     * @property {string} sel.controls
     * @property {string} sel.buttonContainer
     * @property {string} sel.tinymceTriggers
     * @property {string} sel.toolbarTriggers
     * @property {string} sel.attachImageTrigger
     * @property {string} sel.content
     * @property {string} sel.hiddenField
     * @property {string} sel.wordCounter
     * @property {string} sel.kpCounter
     * @property {string} sel.toolbar
     * @property {string} sel.toolbarItem
     * @property {string} sel.toolbarItemSeparator
     * @property {string} sel.defaultToolbarTrigger
     * @property {string} sel.defaultToolbars
     * @property {Object.<string>} Cramster.settings.defaults.editor.sel.toolbars
     */
    S.defaults.editor = {
        'mode': C.PLAIN_EDITOR,
        'fullToggling': false,
        'imageUploadTemplate': {
            'name': 'imageUpload'
        },
        'cls': { // class
            'toolbarTriggerToggle': 'small_blue_button_v2 small_blue_button_v2_toggled'
        },
        'sel': { // selector
            'controls': '.editor_controls',
            'buttonContainer': '.button_container',
            'tinymceTriggers': '[class*="_tool"] button', // TODO - write a custom hasClass selector operator
            'toolbarTriggers': '.main_controls [class*="_tool"] button',
            'attachImageTrigger': '.attach_image_button',
            'content': 'textarea',
            'hiddenField': '#editorContent',
            'wordCounter': '#editor-counters #word-counter',
            'kpCounter': '#editor-counters #kp-counter',
            'editorEnabled': '#editor-enabled-flag',
            'toolbar': 'table.mceToolbar',
            'toolbarItem': 'td:not(.mceSeparator:parent)',
            'toolbarItemSeparator': 'td:has(.mceSeparator)',
            'toolbars': {}
        }
    };
    S.defaults.editor.sel.defaultToolbarTrigger = ".writing_tools button";
    S.defaults.editor.sel[C.WRITING_TOOLS] = '.writing_tools';
    S.defaults.editor.sel[C.MATH_TOOLS] = '.math_tools';
    S.defaults.editor.sel[C.CHEMISTRY_TOOLS] = '.chemistry_tools';
    // these selectors are tied to the toolbar layout below
    S.defaults.editor.sel.defaultToolbars = '.mceToolbarRow1, .mceToolbarRow2';
    S.defaults.editor.sel.toolbars[C.WRITING_TOOLS] = '.mceToolbarRow1, .mceToolbarRow2';
    S.defaults.editor.sel.toolbars[C.MATH_TOOLS] = '.mceToolbarRow3, .mceToolbarRow4 td:lt(5)';
    S.defaults.editor.sel.toolbars[C.CHEMISTRY_TOOLS] = '.mceToolbarRow4 td:gt(3)';

    /**
     * The editor jQuery plugin and point of entry
     * Stores instance as jQuery data key-value pair
     * @return {jQuery}
     */
    $.fn.editor = function (options) {
        var instance = this.data('crEditor');
        if (instance) {
            return instance;
        }
        instance = new M.Editor(this,
            $.extend(true, {}, S.defaults.editor, options)
        );
        this.data('crEditor', instance);
        return this;
    };
    F.onSetup = function (editor) {
    };
    /**
     * Setup our instance of TinyMCE, with custom plugin and theme.
     * @link http://wiki.moxiecode.com/index.php/TinyMCE:Configuration
     * @link http://wiki.moxiecode.com/index.php/TinyMCE:Plugins
     * @link http://wiki.moxiecode.com/index.php/TinyMCE:Control_reference
     * @link http://tinymce.moxiecode.com/js/tinymce/docs/api/index.html
     * @note theme_cramster extends theme_advanced
     */
    S.tinymce = {

        // general options
        // 'script_url': '/JavaScript/TinyMCE/tiny_mce_gzip.aspx', // production
        'script_url': ($$.urls.root == 'http://dev.cramster.com/') ? // temporary deployment hack
            '/JavaScript/TinyMCE/tiny_mce_jquery_src.js' :
            '/JavaScript/TinyMCE/tiny_mce_jquery.js',
        'theme': 'cramster',
        'skin': 'o2k7',
        'skin_variant': 'silver',

        // plugins
        'plugins': 'cramster,autoresize,emotions,fullscreen,iespell,inlinepopups,paste,preview,print,safari,table',

        // theme options
        'theme_cramster_toolbar_location': 'top',
        'theme_cramster_toolbar_align': 'left',
        'theme_cramster_resizing': true,
        // Make sure to update the toolbar selectors for the editor module
        // after changing the toolbar layout below.
        // TinyMCE currently doesn't support `cut,copy,paste` and shows the
        // `clipboard_no_support` error.
        'theme_cramster_buttons1': 'fontselect,fontsizeselect,bold,italic,underline,strikethrough,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote',
        'theme_cramster_buttons2': 'pastetext,pasteword,selectall,|,undo,redo,|,hr,|,link,unlink,|,tablecontrolssimple,|,emotions,|,cleanup,removeformat,|,code,preview',
        'theme_cramster_buttons3': 'sup,sub,|,greeklettercontrols,|,charmap',
        'theme_cramster_buttons4': 'equation,diagram,newstep,|,ptable,chemdiagram',
        'theme_cramster_resizing': true,
        'theme_cramster_blockformats': 'p,div,h1,h2,h3,h4,h5,h6,blockquote,dt,dd,code,samp',
        'theme_cramster_default_foreground_color': '#ff0000',
        'theme_cramster_default_background_color': '#ffff00',
        // 'theme_cramster_statusbar_location': 'bottom',

        // output options
        'convert_newlines_to_brs': true,
        'entity_encoding': 'numeric',
        // we're doing this custom for jQuery.validation compatibility
        'add_form_submit_trigger': false,

        // url options
        'relative_urls': false, // just in case config section gets removed

        // layout options
        'width': '100%',
        'height': '220',
        'body_id': 'tiny-mce-content',

        // performance options
        'custom_undo_redo_levels': 25,

        // dud for the last comma
        toString: function () { return 'TinyMCE configuration'; }
    };


})(jQuery, Cramster);
