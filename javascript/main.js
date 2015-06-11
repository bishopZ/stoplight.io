Zepto(function($){

  $('.platform-selector li:not(.on)').on('click', function(e) {
    $(this).addClass('on').siblings().removeClass('on');
    $('.sl-invite-form').addClass('step2');
  });

  $('.sl-invite-form').on('submit', function(e) {
    e.preventDefault();

    if ($('.sl-invite-form').find('button').hasClass('disabled')) {
      return;
    }

    var data = {
      invite: {
        platform: $(this).find('li.on').data('name'),
        email: $.trim($(this).find('input[type="email"]').val())
      }
    }
    if (data.invite.platform.length == 0) {
      alert('Please select a platform.');
      return;
    }
    if (data.invite.email.length == 0) {
      alert('Please input a valid email address.');
      return;
    }
    // 
    $.ajax({
      type: 'POST',
      url: 'https://stoplightapiproduction-20042.onmodulus.net/invites',
      // url: 'http://localhost:3005/invites',
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
        alert('There was an error. Please email hi@stoplight.io and we\'ll sort it out!');
      }
    });
  });

});
