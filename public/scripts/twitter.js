function twitterCallback(twitters) {
  var statusHTML = [];
  for (var i=0; i<twitters.length; i++){
    var username = twitters[i].user.screen_name;
	var logo = twitters[i].user_profile_image;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
statusHTML.push('<li>'+status+'<a href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">&nbsp;<span class="data">'+relative_time(twitters[i].created_at)+'</span>'+'</a><div class="divisor"></div></li>');
	document.getElementById('twitter_update_list').innerHTML = statusHTML.join(''); 
  }
   
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);
  
  
  if (delta < 60) {
    return '2 secondi fa';
  } else if(delta < 120) {
    return 'poco fa';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minuti fa';
  } else if(delta < (120*60)) {
    return "quasi un'ora fa";
  } else if(delta < (24*60*60)) {
    return "circa " + (parseInt(delta / 3600)).toString() + ' ore fa';
  } else if(delta < (48*60*60)) {
    return '1 giorno fa';
  } else {
    return (parseInt(delta / 86400)).toString() + ' giorni fa';
  }
}
