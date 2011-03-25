$(function() {
  $('#projects #demos').Horinaja({
    capture:'demos',
    delai:0.3,
    duree:4,
    pagination:true
  });
  
  $.getJSON('http://search.twitter.com/search.json?callback=?&q=oivoodoo&rpp=5', function(data){
    var html = "";
    for(var i = 0; i < data.results.length; i++) {
      var tweet = data.results[i];
      html += "<div class='tweet'><a class='contact' href='http://twitter.com/oivoodoo/'>@oivoodoo</a>:<span>" + tweet.text + '</span></div>';
    }
    $('#twitter').html(html);
  });
  
  $.getJSON('http://oivoodoo.tumblr.com/api/read/json?callback=?', function(data){
    var html = "";
    var MAX = 5;
    for(var i = 0; (i < MAX) && data.posts.length > i; i++) {
      var post = data.posts[i];
      if (!!post['regular-title']) {
        html += "<div class='post'><a href='" + post.url + "'>" + post['regular-title'] + "</a><p class='tags'>";
        if (!!post.tags) {
          for(var j = 0; j < post.tags.length; j++) {
            html += "<a class='contact' href='http://oivoodoo.tumblr.com/tagged/" + post.tags[j] + "/chrono'>" + post.tags[j] + "</a>";
          }
        }
        html += "</div>";
      } else {
        MAX += 1;
      }
    }
    $('#tumblr').html(html);
  });
});
