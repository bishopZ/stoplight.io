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
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.3,
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
        "color": "#ffffff",
        "opacity": 0.5,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
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
  }

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

  if (/WebKit/.test(navigator.userAgent)) {
    particlesJS('le-dots', particleConfig);
  }

  $( document ).ready(function() {
    location.queryString = {};
    location.search.substr(1).split("&").forEach(function (pair) {
        if (pair === "") return;
        var parts = pair.split("=");
        location.queryString[parts[0]] = parts[1] &&
            decodeURIComponent(parts[1].replace(/\+/g, " "));
    });

    var appendParams = '';

    if (location.queryString['r'] || localStorage['r']) {
      localStorage['r'] = (location.queryString['r'] || localStorage['r']);
      appendParams += '?r=' + (location.queryString['r'] || localStorage['r']);
    }

    if (appendParams.length) {
      appendParams += '&utm_source=';
    } else {
      appendParams += '?utm_source=';
    }

    if (location.queryString['utm_source'] || localStorage['utm_source']) {
      localStorage['utm_source'] = (location.queryString['utm_source'] || localStorage['utm_source']);
      appendParams += (location.queryString['utm_source'] || localStorage['utm_source']);
    } else {
       appendParams += 'stoplight';
    }

    if (location.queryString['utm_medium'] || localStorage['utm_medium']) {
      localStorage['utm_medium'] = (location.queryString['utm_medium'] || localStorage['utm_medium']);
      appendParams += '&utm_medium=' + (location.queryString['utm_medium'] || localStorage['utm_medium']);
    }

    $('a[href^="https://designer.stoplight.io"]').each(function(){
      var params = appendParams;

      if (!location.queryString['utm_medium'] && !localStorage['utm_medium']) {
        params += '&utm_medium=' + $(this).data('medium');
      }

      $(this).attr('href', $(this).prop('href') + params);
    });
  });
}(jQuery));
