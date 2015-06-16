$(document).ready(function() {

  $(".feature-typer").typed({
      strings: [
        "<span style='color: #8e44ad;'>document</span>",
        "<span style='color: #f39c12;'>debug</span>",
        "<span style='color: #4EB509;'>validate</span>",
        "<span style='color: #c0392b;'>test</span>",
        "<span style='color: #1abc9c;'>mock</span>",
        "<span style='color: #3880F0;'>collaborate on</span>"
      ],
      typeSpeed: 125,
      loop: true,
      backDelay: 2500,
      backSpeed: 75
  });

  $('.sl-platform-selector li:not(.on)').on('click', function(e) {
    $(this).addClass('on').siblings().removeClass('on');
  });

  $('.sl-invite-form').on('submit', function(e) {
    e.preventDefault();

    if ($('.sl-invite-form').find('button').hasClass('disabled')) {
      return;
    }

    var data = {
      platform: $(this).find('li.on').data('name'),
      email: $.trim($(this).find('input[type="email"]').val())
    }
    if (data.platform && data.platform.length == 0) {
      alert('Please select a platform.');
      return;
    }
    if (data.email && data.email.length == 0) {
      alert('Please input a valid email address.');
      return;
    }
    //
    $.ajax({
      type: 'POST',
      // url: 'https://api.stoplight.io/invites',
      url: 'http://localhost:4002/invites',
      data: JSON.stringify(data),
      dataType: 'JSON',
      beforeSend: function() {
        $('.sl-invite-form').find('input,button').addClass('disabled');
        $('.sl-invite-form button').text('Working...');
      },
      success: function(data, status, xhr) {
        $('.home').addClass('finished');
      },
      error: function(xhr, errorType, error) {
        $('.sl-invite-form').find('input,button').removeClass('disabled');
        $('.sl-invite-form button').text('Invite Me');
        if (xhr.responseJSON) {
          alert(xhr.responseJSON.error);
        } else {
          alert('There was an error. Please email hi@stoplight.io and we\'ll sort it out!');
        }
      }
    });
  });

});
