$(document).ready(function () {
  const checked = {};
  $('input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (this.checked) checked[id] = name;
    else delete checked[id];
  });

  if (checked) {
    names = Object.values(checked).sort().join(', ');
    $('.amenities h4').text(names);
  } else $('.amenities h4').html('&nbsp;');
});
