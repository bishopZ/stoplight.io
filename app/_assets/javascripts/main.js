console.log('FOO');

(function ($) {
  // Make current nav item active
  $('.sl-sln_item_content a').each(function () {
    if (location.pathname.indexOf($(this).attr('href')) !== -1) {
      $(this).closest('.sl-sln_item').addClass('active')
    }
  });

  $('[href="#invite"]').on('click', function (e) {
    e.preventDefault()

    var $invite = $('#invite')

    $('html, body').animate({
      scrollTop: $invite.offset().top - 100
    }, 500, function () {
      $invite.find('input[type="email"]').focus()
    })
  });

  $('.form-platform-selector li:not(.on)').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
  });

  $('.invite-form').on('submit', function (e) {
    e.preventDefault();

    if ($('.invite-form').find('button').hasClass('disabled')) {
      return;
    }

    var data = {
      platform: $(this).find('li.on').data('name'),
      email: $.trim($(this).find('input[type="email"]').val()),
      page: $(this).data('page')
    }

    if (data.platform && data.platform.length == 0) {
      alert('Please select a platform.');
      return;
    }

    if (data.email && data.email.length == 0) {
      alert('Please input a valid email address.');
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'https://api.stoplight.io/invites',
      data: JSON.stringify(data),
      dataType: 'JSON',
      beforeSend: function () {
        $('.invite-form').find('input,button').addClass('disabled');
        $('.invite-form button').text('Working...');
      },
      success: function (data, status, xhr) {
        $('.home').addClass('finished');
      },
      error: function (xhr, errorType, error) {
        $('.invite-form').find('input,button').removeClass('disabled');
        $('.invite-form button').text('Invite Me');
        if (xhr.responseJSON) {
          alert(xhr.responseJSON.error);
        } else {
          alert('There was an error. Please email hi@stoplight.io and we\'ll sort it out!');
        }
      }
    });
  });
}(jQuery));
