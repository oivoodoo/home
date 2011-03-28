module.exports.topMenu = function(actions, current) {
  var html = "<ul>";
  for (var i = 0; i < actions.length; i++) {
    html += "<li class='" + (current == actions[i][0] ? "current" : "") + "'><a href='/admin/" + actions[i][1] + "'>" + actions[i][0] + "</a></li>";
  }
  html += "</ul>";
  return html;
}
