var utils = require("date-utils");

module.exports.formatDate = function(datetime) {
  var date = new Date(Date.parse(datetime));
  return date.getMonthAbbr() + "  " + date.getDate();
};

module.exports.script = function(source) {
    return "<script type='text/javascript' src='/scripts/" + source + ".js'></script>";
};

module.exports.style = function(source, options) {
    var tags = '';
    if (!!options) {
      for(var key in options) {
        tags += key + '="' + options[key] + '"';
      }
    }
    return '<link rel="stylesheet" type="text/css" href="/stylesheets/' + source + '.css"' + tags + '></link>';
};

module.exports.jquery = function() {
  return "<script type='text/javascript' src='http://code.jquery.com/jquery-1.4.2.min.js'></script>";
};

module.exports.styles = function(assets) {
  return exports.style(assets.css);
};

module.exports.scripts = function(assets) {
  return exports.script(assets.js);
};

