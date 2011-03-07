/**
 * Autoload plugin
 * 
 * Depends on jWYSIWYG, autoload
 */
(function($) {
if (undefined === $.wysiwyg) {
	throw "wysiwyg.autoload.js depends on $.wysiwyg";
}

if (undefined === $.autoload) {
	throw "wysiwyg.autoload.js depends on $.autoload";
}

/*
 * Wysiwyg namespace: public properties and methods
 */
var autoload = {
	name: "autoload",
	version: "",
	defaults: {
		baseFile:		"jquery.wysiwyg.js",
		cssPath:		"",
		controlPath:	"controls/",
		i18nPath:		"i18n/"
	},

	css: function(names) {
		$.autoload.css(names, this.defaults);
	},

	control: function(names, successCallback) {
		$.autoload.js(names, {"baseFile": this.defaults.baseFile, "jsPath": this.defaults.controlPath, "successCallback": successCallback});
	},

	lang: function(names, successCallback) {
		$.autoload.js(names, {"baseFile": this.defaults.baseFile, "jsPath": this.defaults.i18nPath, "successCallback": successCallback});
	}
};

$.wysiwyg.plugin.register(autoload);

})(jQuery);