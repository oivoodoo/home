var utils = require("date-utils");

module.exports.formatDate = function(datetime) {
  var date = new Date(Date.parse(datetime));
  return date.getMonthAbbr() + "  " + date.getDate();
};

module.exports.script = function(source) {
    return "<script type='text/javascript' src='/scripts/" + source + ".js'></script>";
};

module.exports.style = function(source) {
    return '<link rel="stylesheet" type="text/css" href="/stylesheets/' + source + '.css"></link>';
};

