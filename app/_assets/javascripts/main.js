(function($) {
  var particleConfig = {
    "particles": {
      "number": {
        "value": 60,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.2,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.05,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 100,
        "color": "#fff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 100,
          "line_linked": {
            "opacity": 1
          }
        }
      }
    },
    "retina_detect": true
  };

  if (/WebKit/.test(navigator.userAgent) && $('#le-dots').length) {
    particlesJS('le-dots', particleConfig);
  }

  var $navbar = $('.navbar'),
      navbarHeight = $navbar.outerHeight();

  $('.animated-scroll').on('click', function(e) {
    var hash = this.hash,
        $el = $(hash);

    if (!$el.length && hash !== '#top') {
      return;
    }

    e.preventDefault(e);

    $('html, body').animate({
      scrollTop: hash === '#top' ? 0 : $el.offset().top - navbarHeight
    }, 500, function() {
      if (hash !== '#top') {
        window.location.hash = hash;
      }
    });
  });

  $navbar.affix({
    offset: {top: 20}
  });

  $('.section-menu a').on('click', function (e) {
    e.preventDefault(e);
    $(this).tab('show');
    $('#platform-dropdown').html($(this).text() + ' <span class="caret"></span>');
  });

  (function() {
    location.queryString = {};
    location.search.substr(1).split("&").forEach(function(pair) {
      if (pair === "") return;
      var parts = pair.split("=");
      location.queryString[parts[0]] = parts[1] &&
        decodeURIComponent(parts[1].replace(/\+/g, " "));
    });

    var appendParams = '';

    // user referrals
    if (localStorage['r']) {
      appendParams += '?r=' + localStorage['r'];
    } else if (location.queryString['r']) {
      localStorage['r'] = location.queryString['r'];
      appendParams += '?r=' + location.queryString['r'];
    }

    if (appendParams.length) {
      appendParams += '&utm_source=';
    } else {
      appendParams += '?utm_source=';
    }

    // utm source
    if (localStorage['utm_source']) {
      appendParams += localStorage['utm_source'];
    } else if (location.queryString['utm_source']) {
      localStorage['utm_source'] = location.queryString['utm_source'];
      appendParams += location.queryString['utm_source'];
    } else if (document.referrer.length) {
      var url = new URL(document.referrer);
      var hostname = url.hostname;
      var hostnameArray = hostname.split('.');
      if (hostnameArray.length > 2) {
        hostname = hostnameArray.splice(1, hostnameArray.length).join('.');
      }

      localStorage['utm_source'] = hostname;
      appendParams += hostname;
    } else {
      appendParams += 'stoplight';
    }

    // utm medium
    if (!localStorage['utm_medium'] && location.queryString['utm_medium']) {
      localStorage['utm_medium'] = location.queryString['utm_medium'];
    }

    $('a[href^="https://app.stoplight.io"]').each(function() {
      var params = appendParams;

      if (localStorage['utm_medium']) {
        params += '&utm_medium=' + localStorage['utm_medium'];
      } else if ($(this).data('medium')) {
        params += '&utm_medium=' + $(this).data('medium');
      }

      $(this).attr('href', $(this).prop('href') + params);
    });
  }());
}(jQuery));
