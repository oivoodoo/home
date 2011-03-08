// start menu hover
$(function() {
		$('#navigation ul li').hover (
		function() {
			$(this).addClass('navhover');
			
		}, function() {
			
			 $(this).removeClass('navhover');
		}
	);
});

$(function() {
if ( $("#navigation ul li").hasClass("current") )
        $(this).addClass('navhover');
    });


// start slider

	jQuery(window).bind("load", function() {
			jQuery("div#sliderc").codaSlider()
		});
	
// start tooltip 

/*
 * Tooltip script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
 


this.tooltip = function(){	
	/* CONFIG */		
		xOffset = -35;
		yOffset = -50;		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
	/* END CONFIG */		
	$("a.tooltip").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");		
    },
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
    });	
	$("a.tooltip").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};



// starting the script on page load
$(function() {
	tooltip();
});

// prepend the span tag to the photo gallery
$(function() {
	$(".gallery a, a.productImages").prepend("<span></span>");
});

// send the email
      // let's start the jQuery while I wait.
      // step 1: onload - capture the submit event on the form.
      $(function() { // onload...do
        $('#form').submit(function() {
          // now we're going to capture *all* the fields in the
          // form and submit it via ajax.
          
          // :input is a macro that grabs all input types, select boxes
          // textarea, etc.  Then I'm using the context of the form from 
          // the initial '#contactForm' to narrow down our selector
          var inputs = [];
          $(':input', this).each(function() {
            inputs.push(this.name + '=' + escape(this.value));
          })
          
          // now if I join our inputs using '&' we'll have a query string
          jQuery.ajax({
            data: inputs.join('&'),
            url: this.action,
            timeout: 2000,
            error: function() {
              console.log("Failed to submit");
            },
            success: function(r) { 
           if (r == 1) {
			   
			   $('form').slideUp('slow');
			   $('p#please').slideUp('slow');
			$("h1").after('<p id="success" style="display:none;">Your message was sent successfully! We will contact you as soon as possible. </p>');
	$('#success').slideDown('slow');
		   }
		   else {
			   alert(r)
		   }
				   
			 
			  
            }
          }) // checkout http://jquery.com/api for more syntax and options on this method.
          
          // re-test...
          // by default - we'll always return false so it doesn't redirect the user.
          return false;
        })
      })
