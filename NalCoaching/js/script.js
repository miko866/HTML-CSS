/*
/ Navigation Menu
*/
$('.menu-icon').click(function() {
    $('.main-menu').css('left','0');
    function showMenu() {
        $('.main-menu').css('clip-path', 'polygon(0 0,100% 0,100% 100%,0% 100%)');
        $('.main-icon').animate({right:'-100px'},300);
    }
    setTimeout(showMenu,100);
});

$('.close').click(function() {
    $('.main-menu').css('clip-path','polygon(0 0,0% 0, 100% 100%, 0% 100%)');
    function hideMenu() {
        $('.main-menu').css('left','-300vw');
        $('.main-menu').animate({right:'50'},300);
    }
    setTimeout(hideMenu,300);

    function originalLayout() {
        $('.main-menu').css('clip-path','polygon(0 0,100% 0, 0% 100%, 0% 100%)');
    }
    setTimeout(originalLayout,600);
});

// Hide Menu click on inside elements
var menuLinks = $('.main-menu').find('a');
$(menuLinks).click(function(e) {
    $('.main-menu').css('left', '-300vw');
});

/*
* BACK-TO-TOP
*/
$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

var amountScrolled = 500;

$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled ) {
		$('a.back-to-top').fadeIn('slow');
	} else {
		$('a.back-to-top').fadeOut('slow');
	}
});

$('a.back-to-top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 700);
	return false;
});
    

/*
* SCROLLING
*/

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

/*
* Replace all SVG images with inline SVG
*/
document.querySelectorAll('img.svg').forEach(function(img){
    var imgID = img.id;
    var imgClass = img.className;
    var imgURL = img.src;

    fetch(imgURL).then(function(response) {
        return response.text();
    }).then(function(text){

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");

        // Get the SVG tag, ignore the rest
        var svg = xmlDoc.getElementsByTagName('svg')[0];

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            svg.setAttribute('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            svg.setAttribute('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        svg.removeAttribute('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
        }

        // Replace image with new SVG
        img.parentNode.replaceChild(svg, img);

    });

});

/*
/ Only for Hover Devices elements = Phones
*/
document.addEventListener('touchstart', function addtouchclass(e){ // first time user touches the screen
document.documentElement.classList.add('can-touch') // add "can-touch" class to document root using classList API
document.removeEventListener('touchstart', addtouchclass, false) // de-register touchstart event
}, false)



    




    


