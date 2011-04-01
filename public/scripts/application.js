$(function() {
  
  function load_home_page() { 
    $('#projects #demos').Horinaja({
      capture:'demos',
      delai:0.3,
      duree:4,
      pagination:true
    });
    
    $('#projects #demos li').css('display', 'block');
    
    $.getJSON('http://search.twitter.com/search.json?callback=?&q=oivoodoo&rpp=5', function(data){
      var html = "";
      for(var i = 0; i < data.results.length; i++) {
        var tweet = data.results[i];
        html += "<div class='tweet' style='display:none'><a class='contact' href='http://twitter.com/oivoodoo/'>@oivoodoo</a>&nbsp;<span>" + tweet.text + '</span></div>';
      }
      $('#container #twitter').find('.loading').remove();
      $('#container #twitter').append(html);
      $('#container #twitter .tweet').slideDown(300);
    });
    
    $.getJSON('http://oivoodoo.tumblr.com/api/read/json?callback=?', function(data){
      var html = "";
      var MAX = 5;
      for(var i = 0; (i < MAX) && data.posts.length > i; i++) {
        var post = data.posts[i];
        if (!!post['regular-title']) {
          html += "<div class='post' style='display:none'><a href='" + post.url + "'>" + post['regular-title'] + "</a><p class='tags'>";
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
      $('#container #tumblr').find('.loading').remove();
      $('#container #tumblr').append(html);
      $('#container #tumblr .post').slideDown(300);
    });  
  }
  
  $('#menu .l1').click(function() {
    $('#container').html('').append("<img class='loading' src='/images/loading.gif'/>");
    $.get('/', function(data) {
      $('#container').html(data);
      load_home_page();
    });
    return false;
  });
  
  $('#menu .l3').click(function() {
    $('#container').html('').append("<img class='loading' src='/images/loading.gif'/>");
    $.get('/projects', function(data) {
      $('#container').html(data);
    });
    return false;
  });
  
  $('#menu .l4, .contact_button').live('click', function() {
    $('#container').html('').append("<img class='loading' src='/images/loading.gif'/>");
    $.get('/contacts', function(data) {
      $('#container').html(data);
    });
    return false;
  });
  
  $('#send_button').live('click', function() {
    var name = $('#contact_name');
    var email = $('#contact_email');
    var message = $('#contact_message');
    $.post('/contacts', "contact[name]='" + escape(name.val()) + "'&contact[email]='" + email.val() + "'&contact[message]='" + escape(message.val()) + "'", function(data){
      $('#container').prepend("<h2 class='notification' style='color:red;'>" + data + "</h2>");
      window.setTimeout(function() { $('.notification').slideUp(300).remove(); }, 3000);
    });
    return false;
  });
  
  load_home_page();
});
