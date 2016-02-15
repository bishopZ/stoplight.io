(function($) {
  var $navbar = $('.navbar'),
      navbarHeight = $navbar.outerHeight();

  $('.animated-scroll').on('click', function(e) {
    var hash = this.hash,
        $el = $(hash);

    if (!$el.length) {
      return
    }

    e.preventDefault();

    $('html, body').animate({
      scrollTop: $el.offset().top - navbarHeight
    }, 500, function() {
      window.location.hash = hash;
    });

  });

  $navbar.affix({
    offset: {top: 20}
  });
}(jQuery));
