(function ($) {
  // Make current nav item active
  $('.sl-sln_item_content a').each(function () {
    if (location.pathname.indexOf($(this).attr('href')) !== -1) {
      $(this).closest('.sl-sln_item').addClass('active');
    }
  });

  $('[href="#invite"]').on('click', function (e) {
    e.preventDefault();

    var $invite = $('#invite');

    $('html, body').animate({
      scrollTop: $invite.offset().top - 100
    }, 500, function () {
      $invite.find('input[type="email"]').focus()
    })
  });

  $('.form-platform-selector li:not(.on)').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
  });

  var $inviteForm = $('.invite-form'),
    $inviteContainer = $('.invite-container');

  $inviteForm.on('submit', function (e) {
    e.preventDefault();

    if ($inviteForm.find('button').hasClass('disabled')) {
      return;
    }

    var data = {
      platform: $inviteForm.find('li.on').data('name'),
      email: $.trim($inviteForm.find('input[type="email"]').val()),
      page: $inviteForm.data('page')
    };

    if (!data.platform || data.platform.length == 0) {
      alert('Please select a platform.');
      return;
    }

    $inviteContainer.find('.alert').addClass('hidden');

    $.ajax({
      type: 'POST',
      url: 'https://api.stoplight.io/v1/invites',
      data: data,
      dataType: 'JSON',
      beforeSend: function () {
        $inviteForm.find('input, button')
          .attr('disabled', true).filter('button').text('Working...');
      }
    }).done(function () {
      $inviteContainer.find('form').addClass('hidden');
      $inviteContainer.find('.alert-success').removeClass('hidden');
    }).fail(function (xhr) {
      var $alert = $inviteContainer.find('.alert-danger');

      if (xhr.responseJSON) {
        $alert.text(xhr.responseJSON.error);
      }

      $inviteForm.find('input, button')
        .removeAttr('disabled').filter('button').text('Invite Me');

      $alert.removeClass('hidden');
    });
  });
}(jQuery));
