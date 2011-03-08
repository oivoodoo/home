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

module.exports.editor = function() {
  return module.exports.jquery() + 
      '<script type="text/javascript" src="/jwysiwyg/jquery.wysiwyg.js"></script>' + 
      '<script type="text/javascript" src="/jwysiwyg/controls/wysiwyg.image.js"></script>' + 
      '<script type="text/javascript" src="/jwysiwyg/controls/wysiwyg.link.js"></script>' + 
      '<script type="text/javascript" src="/jwysiwyg/controls/wysiwyg.table.js"></script>' +
      '<link rel="stylesheet" href="/jwysiwyg/jquery.wysiwyg.css" type="text/css">' +
      '<link rel="stylesheet" href="/jwysiwyg/jquery.wysiwyg.modal.css" type="text/css">' + 
      '<link rel="stylesheet" href="/jwysiwyg/lib/jquery.simplemodal.css" type="text/css">' + 
      '<script type="text/javascript">$(function() {$("textarea.html").wysiwyg({controls: {html: {visible: true}}});});</script>';
};

module.exports.styles = function() {
  return module.exports.style('960', {media: 'screen, projection'}) + 
    module.exports.style('screen', {media: 'screen, projection'}) + 
    module.exports.style('print', {media: 'print'}) + 
    module.exports.style('project', {media: 'screen, projection'}) + 
    '<!--[if IE]>' + module.exports.style('ie') + '<![endif]-->';
};

module.exports.scripts = function() {
  return module.exports.jquery() + 
      module.exports.script('scripts') +
      module.exports.script('coda-slider.1.1.1') + 
      module.exports.script('jquery-easing-compatibility.1.2.pack') +
      module.exports.script('jquery-easing.1.2.pack');
};

module.exports.topMenu = function(actions, current) {
  var html = "<ul id='nav'>";
  for (var i = 0; i < actions.length; i++) {
    html += "<li id='" + actions[i][2] + "'><a href='" + actions[i][1] + "'" + (current == actions[i][0] ? "class='currentPage'" : "") + "'>" + actions[i][0] + "</a></li>";
  }
  html += "</ul>";
  return html;

};
