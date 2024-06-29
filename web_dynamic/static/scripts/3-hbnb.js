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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      for (const place of data) {
        $('.places').append('<article></article>');
        $('article').last().append('<div class="title_box"></div>');
        $('.title_box').last().append(`<h2>${place.name}</h2>`);
        $('.title_box').last().append(`<div class="price_by_night">$${place.price_by_night}</div>`);
        $('article').last().append('<div class="information"></div>');
        $('.information').last().append('<div class="max_guest"></div>');
        if (place.max_guest !== 1) {
          $('.max_guest').last().text(`${place.max_guest} Guests`);
        } else {
          $('.max_guest').last().text(`${place.max_guest} Guest`);
        }
        $('.information').last().append('<div class="number_rooms"></div>');
        if (place.number_rooms !== 1) {
          $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
        } else {
          $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
        }
        $('.information').last().append('<div class="number_bathrooms"></div>');
        if (place.number_bathrooms !== 1) {
          $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
        } else {
          $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathroom`);
        }
        $('article').last().append('<div class="user"></div>');
        const article = $('article').last();
        $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, function (user) {
          article.find('.user').append(`<b>Owner:</b> ${user.first_name} ${user.last_name}`);
        });
        $('article').last().append('<div class="description"></div>');
        $('.description').last().append(place.description);
      }
    }
  });
});
