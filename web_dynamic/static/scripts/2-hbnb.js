$(document).ready(function () {
  const checked = {};
  $('input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (this.checked) checked[id] = name;
    else delete checked[id];
    if (Object.values(checked).length === 0) $('.amenities h4').html('&nbsp;');
    else $('.amenities h4').text(Object.values(checked).sort().join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
