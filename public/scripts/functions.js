//manage search box text
$(document).ready(function(){	
	$("#content").focus(function(){
		if($(this).attr("value") == "Enter search here...") $(this).attr("value", "");
	});
	$("#content").blur(function(){
		if($(this).attr("value") == "") $(this).attr("value", "Enter search here...");
	});
});

$(document).ready(function(){	
	$("#local").focus(function(){
		if($(this).attr("value") == "City, State or Zip") $(this).attr("value", "");
	});
	$("#local").blur(function(){
		if($(this).attr("value") == "") $(this).attr("value", "City, State or Zip");
	});
});

