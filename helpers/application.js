var utils = require("date-utils");
var sys = require ('sys');

module.exports.formatDate = function(datetime) {
  var date = new Date(Date.parse(datetime));
  return date.getMonthAbbr() + "  " + date.getDate();
};
